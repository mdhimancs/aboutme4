import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Server-Level Content Security Policy mirroring index.html with frame-ancestors support
const CSP_HEADER_VALUE = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://apis.google.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://images.unsplash.com https://img.youtube.com https://*.google-analytics.com https://*.googletagmanager.com https://lh3.googleusercontent.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firestore.googleapis.com https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com https://accounts.google.com",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://*.firebaseapp.com https://accounts.google.com",
  "frame-ancestors 'self' https://ai.studio https://*.google.com https://*.run.app https://*.googleusercontent.com"
].join("; ");

// Server-side IP Rate Limiting State (5-minute rolling window)
const emailRateLimitMap = new Map<string, number[]>();
const EMAIL_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const EMAIL_MAX_REQUESTS_PER_WINDOW = 3;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Origin obscurity: Disable framework signature
  app.disable('x-powered-by');

  // 1. Mandatory HTTP Security Headers (Section 2 & 7.A of 4_webSecurity.md)
  app.use((req, res, next) => {
    // Defend against MIME-type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Clickjacking defense (modern browsers prioritize CSP frame-ancestors)
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    
    // Strict referrer privacy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Restrict unnecessary browser sensors and device APIs
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
    // Enforce TLS/HTTPS protocol integrity
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    // Server-level Content Security Policy
    res.setHeader('Content-Security-Policy', CSP_HEADER_VALUE);
    
    next();
  });

  app.use(express.json());

  // Traffic Logger Middleware (Operational Intelligence PoC)
  app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const method = req.method;
    const url = req.url;
    const userAgent = req.headers['user-agent'];

    console.log(`[TRAFFIC] ${timestamp} | ${ip} | ${method} ${url} | ${userAgent}`);
    next();
  });

  // API Route for sending emails with rate limiting
  app.post("/api/send-email", async (req, res) => {
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const clientIp = Array.isArray(rawIp) ? rawIp[0] : (typeof rawIp === 'string' ? rawIp.split(',')[0].trim() : '127.0.0.1');

    // Check rolling window IP rate limit
    const now = Date.now();
    const timestamps = emailRateLimitMap.get(clientIp) || [];
    const validTimestamps = timestamps.filter(t => now - t < EMAIL_LIMIT_WINDOW_MS);

    if (validTimestamps.length >= EMAIL_MAX_REQUESTS_PER_WINDOW) {
      const oldest = validTimestamps[0];
      const waitSeconds = Math.ceil((EMAIL_LIMIT_WINDOW_MS - (now - oldest)) / 1000);
      res.setHeader('Retry-After', waitSeconds.toString());
      return res.status(429).json({
        error: `Transmission rate limit reached. Please wait ${Math.ceil(waitSeconds / 60)} minute(s) before sending another inquiry.`
      });
    }

    const { name, email, subject, message, cc } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!resend) {
      console.error("RESEND_API_KEY is not configured");
      return res.status(500).json({ error: "Email service not configured. Please add RESEND_API_KEY to environment variables." });
    }

    try {
      const { data, error } = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['munish.world@gmail.com'], // The user's email from portfolioData
        cc: cc ? [cc] : undefined,
        replyTo: email,
        subject: `[Portfolio Inquiry] ${subject}`,
        html: `
          <h3>New Message from Portfolio</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="white-space: pre-wrap; padding: 10px; background: #f4f4f4; border-radius: 5px;">${message}</div>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        return res.status(400).json({ error });
      }

      // Record successful transmission timestamp for rate limiting
      validTimestamps.push(now);
      emailRateLimitMap.set(clientIp, validTimestamps);

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
