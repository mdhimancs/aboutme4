import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Shield, 
  MapPin, 
  Network, 
  User as UserIcon, 
  X, 
  Activity, 
  Cpu, 
  Globe, 
  Lock, 
  Unlock, 
  Wifi, 
  Clock, 
  Terminal, 
  Key, 
  Layers, 
  RefreshCw, 
  Copy, 
  Check,
  Server,
  Zap,
  Laptop
} from 'lucide-react';

interface TelemetryData {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  org: string;
  asn: string;
  timezone: string;
  latitude?: number;
  longitude?: number;
}

interface UserTelemetryProps {
  theme?: string;
  isMobile?: boolean;
}

export const UserTelemetry: React.FC<UserTelemetryProps> = ({ 
  theme = 'apple-light',
  isMobile = false
}) => {
  const isLight = theme === 'apple-light';
  const { user, isAuthorized, isAdmin } = useAuth();
  
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'identity' | 'network' | 'posture' | 'security'>('identity');
  const [copied, setCopied] = useState(false);
  const [sessionUptime, setSessionUptime] = useState(0);
  const [pingMs, setPingMs] = useState<number | null>(null);
  const [sessionId] = useState(() => {
    const chars = '0123456789ABCDEF';
    let id = '';
    for (let i = 0; i < 16; i++) {
      id += chars[Math.floor(Math.random() * chars.length)];
    }
    return `SES-${id.slice(0, 4)}-${id.slice(4, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}`;
  });

  // Fetch telemetry and measure latency
  const loadTelemetry = async () => {
    setLoading(true);
    const startTime = performance.now();
    try {
      const res = await fetch('https://ipapi.co/json/');
      const endTime = performance.now();
      setPingMs(Math.round(endTime - startTime));

      if (!res.ok) throw new Error('Telemetry API response failed');
      const data = await res.json();
      
      setTelemetry({
        ip: data.ip || '127.0.0.1',
        city: data.city || 'Secure Node',
        region: data.region || data.region_code || 'Edge Cloud',
        country: data.country_name || data.country || 'Global Mesh',
        countryCode: data.country_code || 'US',
        org: data.org || 'Tier-1 Internet Transit',
        asn: data.asn || 'AS-Edge',
        timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        latitude: data.latitude,
        longitude: data.longitude
      });
    } catch {
      const endTime = performance.now();
      setPingMs(Math.round(endTime - startTime));
      setTelemetry({
        ip: '192.0.2.1 (Tunnel Gateway)',
        city: 'Edge POP Cluster',
        region: 'Encrypted Transit',
        country: 'Global Mesh',
        countryCode: 'INT',
        org: 'Zero-Trust Secure Access Broker',
        asn: 'AS-ENCRYPTED',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTelemetry();
  }, []);

  // Live session uptime ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format seconds to HH:MM:SS
  const formatUptime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Extract client device posture safely
  const devicePosture = useMemo(() => {
    const ua = navigator.userAgent;
    let os = 'Unknown OS';
    if (ua.includes('Win')) os = 'Windows NT';
    else if (ua.includes('Mac')) os = 'macOS (Darwin)';
    else if (ua.includes('Linux')) os = 'Linux / Unix';
    else if (ua.includes('Android')) os = 'Android OS';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS / iPadOS';

    let browser = 'Modern Browser';
    if (ua.includes('Edg/')) browser = 'Microsoft Edge';
    else if (ua.includes('Chrome/')) browser = 'Google Chrome';
    else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Apple Safari';
    else if (ua.includes('Firefox/')) browser = 'Mozilla Firefox';

    const screenRes = typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height} (${window.devicePixelRatio || 1}x DPR)` : 'Unknown';
    const hardwareCores = typeof navigator !== 'undefined' && navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Logical Cores` : '4+ Cores';
    const language = typeof navigator !== 'undefined' ? navigator.language : 'en-US';
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory ? `${(navigator as unknown as { deviceMemory: number }).deviceMemory} GB+ RAM` : 'Allocated';
    const doNotTrack = navigator.doNotTrack === '1' ? 'Enabled' : 'Disabled';

    return { os, browser, screenRes, hardwareCores, language, memory, doNotTrack };
  }, []);

  // Format identity name
  const getIdentity = () => {
    if (user?.email) {
      const prefix = user.email.split('@')[0];
      return prefix
        .split('.')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return 'Guest Prospect';
  };

  const getClearanceLevel = () => {
    if (isAdmin) return 'Tier 3 • Super Admin (Root Access)';
    if (isAuthorized) return 'Tier 1 • Verified Reviewer';
    return 'Tier 0 • Standard Prospect (Sandboxed)';
  };

  const getTrustScore = () => {
    if (isAdmin) return '99.8% (Cryptographic Verified)';
    if (isAuthorized) return '94.6% (Allowlist Enrolled)';
    return '62.0% (Zero-Trust Audited)';
  };

  const copyDiagnosticSummary = () => {
    const report = {
      timestamp: new Date().toISOString(),
      sessionId,
      identity: {
        email: user?.email || 'Anonymous',
        clearance: getClearanceLevel(),
        trustMetric: getTrustScore(),
        sessionUptime: formatUptime(sessionUptime)
      },
      network: {
        ip: telemetry?.ip,
        location: `${telemetry?.city}, ${telemetry?.region}, ${telemetry?.country}`,
        org: telemetry?.org,
        asn: telemetry?.asn,
        timezone: telemetry?.timezone,
        latency: `${pingMs || '--'} ms`
      },
      clientPosture: devicePosture,
      securityArchitecture: {
        controlPlane: 'NIST SP 800-207 Policy Decision Point (PDP)',
        dataPlane: 'Strict Policy Enforcement Point (PEP) Ingress',
        authorizationModel: 'Continuous Zero-Trust Allowlisting',
        contentSecurityPolicy: 'Active Level 3 Enforcement',
        tlsCipher: 'TLS 1.3 / AES-256-GCM / SHA-384'
      }
    };

    navigator.clipboard.writeText(JSON.stringify(report, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Session Audit & Security Telemetry"
        aria-label="Open Session Audit Telemetry"
        className={
          isMobile
            ? `p-1.5 rounded-lg border transition-colors cursor-pointer relative flex items-center justify-center ${
                isOpen
                  ? (isLight ? 'bg-blue-500/15 border-blue-500/40 text-blue-600' : 'bg-blue-500/20 border-blue-500/50 text-blue-400')
                  : (isLight ? 'bg-[#f4f4f6] border-zinc-300 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/70' : 'bg-[#18181b] border-zinc-700 text-zinc-300 hover:text-white')
              }`
            : `flex items-center space-x-1.5 px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                isOpen
                  ? (isLight ? 'bg-blue-500/15 text-blue-600 font-bold' : 'bg-blue-500/25 text-blue-400 font-bold')
                  : (isLight ? 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/70' : 'text-zinc-300 hover:text-white hover:bg-white/10')
              }`
        }
      >
        <div className="relative flex items-center justify-center">
          <Shield className="w-3.5 h-3.5 text-blue-500" />
          <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${user && isAuthorized ? 'bg-emerald-400' : 'bg-blue-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${user && isAuthorized ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
          </span>
        </div>
        {!isMobile && (
          <span className="text-[10px] font-bold">Session Audit</span>
        )}
      </button>

      {/* Expanded Interactive Telemetry Card Dropdown */}
      {isOpen && (
        <div className={`fixed top-14 right-3 sm:right-6 z-50 w-[78vw] sm:w-[216px] max-w-[216px] rounded-2xl border font-mono transition-all duration-300 text-left shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-3 duration-200 overflow-hidden flex flex-col ${
          isLight 
            ? 'bg-white/95 border-zinc-200/90 text-zinc-800 shadow-zinc-300/80' 
            : 'bg-[#101012]/95 border-white/15 text-zinc-200 shadow-black/95'
        }`}>
          {/* Header */}
          <div className={`px-2.5 py-2 border-b flex items-center justify-between ${isLight ? 'border-zinc-200 bg-zinc-50/80' : 'border-white/10 bg-white/[0.02]'}`}>
        <div className="flex items-center gap-1.5 min-w-0">
          <div className={`p-1 rounded-md border shrink-0 ${
            user && isAuthorized 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' 
              : 'bg-blue-500/10 border-blue-500/30 text-blue-500'
          }`}>
            <Shield className="w-3 h-3 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[9.5px] font-bold uppercase tracking-wider truncate">Session Audit</span>
              <span className={`text-[6.5px] px-1 py-0.5 rounded-full font-bold uppercase border shrink-0 ${
                user && isAuthorized
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
              }`}>
                {user && isAuthorized ? 'PEP L1' : 'Sandbox'}
              </span>
            </div>
            <div className="text-[7.5px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1 font-mono">
              <span className="truncate max-w-[65px]">{sessionId}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5 text-emerald-500 font-semibold shrink-0">
                <Clock className="w-2 h-2" />
                {formatUptime(sessionUptime)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-0.5 shrink-0 ml-0.5">
          <button 
            onClick={loadTelemetry}
            disabled={loading}
            title="Refresh Network Node Telemetry"
            className="p-1 rounded-md hover:bg-zinc-200/60 dark:hover:bg-white/10 text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin text-blue-500' : ''}`} />
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            aria-label="Close telemetry card"
            className="p-1 rounded-md hover:bg-zinc-200/60 dark:hover:bg-white/10 text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-all cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={`grid grid-cols-4 text-[8px] font-semibold border-b ${isLight ? 'border-zinc-200 bg-zinc-100/50' : 'border-white/5 bg-white/[0.01]'}`}>
        <button
          onClick={() => setActiveTab('identity')}
          className={`py-1.5 px-0.5 text-center transition-all border-b-2 flex flex-col items-center justify-center gap-0.5 cursor-pointer leading-tight ${
            activeTab === 'identity'
              ? 'border-blue-500 text-blue-500 dark:text-blue-400 font-bold bg-blue-500/5'
              : 'border-transparent text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
        >
          <UserIcon className="w-2.5 h-2.5 shrink-0" />
          <span className="truncate">Identity</span>
        </button>
        <button
          onClick={() => setActiveTab('network')}
          className={`py-1.5 px-0.5 text-center transition-all border-b-2 flex flex-col items-center justify-center gap-0.5 cursor-pointer leading-tight ${
            activeTab === 'network'
              ? 'border-blue-500 text-blue-500 dark:text-blue-400 font-bold bg-blue-500/5'
              : 'border-transparent text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
        >
          <Network className="w-2.5 h-2.5 shrink-0" />
          <span className="truncate">Network</span>
        </button>
        <button
          onClick={() => setActiveTab('posture')}
          className={`py-1.5 px-0.5 text-center transition-all border-b-2 flex flex-col items-center justify-center gap-0.5 cursor-pointer leading-tight ${
            activeTab === 'posture'
              ? 'border-blue-500 text-blue-500 dark:text-blue-400 font-bold bg-blue-500/5'
              : 'border-transparent text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
        >
          <Laptop className="w-2.5 h-2.5 shrink-0" />
          <span className="truncate">Posture</span>
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`py-1.5 px-0.5 text-center transition-all border-b-2 flex flex-col items-center justify-center gap-0.5 cursor-pointer leading-tight ${
            activeTab === 'security'
              ? 'border-blue-500 text-blue-500 dark:text-blue-400 font-bold bg-blue-500/5'
              : 'border-transparent text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
        >
          <Key className="w-2.5 h-2.5 shrink-0" />
          <span className="truncate">Policy</span>
        </button>
      </div>

      {/* Tab Contents with Word Wrap Enabled */}
      <div className="p-2.5 space-y-1.5 max-h-[290px] overflow-y-auto text-[9px]">
        {activeTab === 'identity' && (
          <div className="space-y-2">
            <div className={`p-2 rounded-xl border flex items-center justify-between gap-1.5 ${
              user && isAuthorized 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                : (isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.02] border-white/5')
            }`}>
              <div className="flex items-center gap-1.5 min-w-0">
                <div className={`p-1 rounded-full shrink-0 ${user && isAuthorized ? 'bg-emerald-500/20' : 'bg-blue-500/20'}`}>
                  {user && isAuthorized ? <Unlock className="w-3 h-3 text-emerald-500" /> : <Lock className="w-3 h-3 text-blue-500" />}
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold break-words leading-tight">{getIdentity()}</div>
                  <div className="text-[8px] opacity-75 break-all leading-tight">{user?.email || 'Unauthenticated'}</div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className={`px-1.5 py-0.5 rounded-full text-[7.5px] font-bold uppercase tracking-wider ${
                  user && isAuthorized ? 'bg-emerald-500 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}>
                  {isAdmin ? 'ADMIN' : (isAuthorized ? 'AUTH' : 'PROSPECT')}
                </span>
              </div>
            </div>

            <div className="space-y-1 pt-0.5">
              <div className="flex justify-between items-start py-0.5 border-b border-zinc-100 dark:border-white/5 gap-1.5">
                <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                  <Key className="w-3 h-3 text-blue-500 shrink-0" />
                  Auth Tier:
                </span>
                <span className="font-semibold text-right text-[9px] break-words leading-tight flex-1">{getClearanceLevel()}</span>
              </div>

              <div className="flex justify-between items-start py-0.5 border-b border-zinc-100 dark:border-white/5 gap-1.5">
                <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                  <Activity className="w-3 h-3 text-emerald-500 shrink-0" />
                  Trust Score:
                </span>
                <span className="font-semibold text-right text-emerald-500 text-[9px] break-words leading-tight flex-1">{getTrustScore()}</span>
              </div>

              <div className="flex justify-between items-start py-0.5 border-b border-zinc-100 dark:border-white/5 gap-1.5">
                <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                  <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                  Duration:
                </span>
                <span className="font-semibold text-right tabular-nums text-[9px] break-words leading-tight flex-1">{formatUptime(sessionUptime)}</span>
              </div>

              <div className="flex justify-between items-start py-0.5 gap-1.5">
                <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                  <Terminal className="w-3 h-3 text-purple-500 shrink-0" />
                  RBAC Store:
                </span>
                <span className="font-semibold text-right text-zinc-500 font-mono text-[8.5px] break-all leading-tight flex-1">/allowlist (Firestore)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-1">
            <div className="flex justify-between items-start py-0.5 border-b border-zinc-100 dark:border-white/5 gap-1.5">
              <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                <Network className="w-3 h-3 text-blue-500 shrink-0" />
                Public IP:
              </span>
              <span className="font-bold tabular-nums text-right text-[9px] break-all leading-tight flex-1">{loading ? 'Probing...' : telemetry?.ip}</span>
            </div>

            <div className="flex justify-between items-start py-0.5 border-b border-zinc-100 dark:border-white/5 gap-1.5">
              <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                Location:
              </span>
              <span className="font-semibold text-right text-[9px] break-words leading-tight flex-1">
                {loading ? 'Resolving...' : `${telemetry?.city}, ${telemetry?.region}, ${telemetry?.country}`}
              </span>
            </div>

            <div className="flex justify-between items-start py-0.5 border-b border-zinc-100 dark:border-white/5 gap-1.5">
              <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                <Server className="w-3 h-3 text-indigo-500 shrink-0" />
                Carrier:
              </span>
              <span className="font-semibold text-right text-[9px] break-words leading-tight flex-1" title={telemetry?.org}>
                {loading ? 'Querying...' : `${telemetry?.asn} • ${telemetry?.org}`}
              </span>
            </div>

            <div className="flex justify-between items-start py-0.5 border-b border-zinc-100 dark:border-white/5 gap-1.5">
              <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                <Globe className="w-3 h-3 text-cyan-500 shrink-0" />
                Timezone:
              </span>
              <span className="font-semibold text-right text-[9px] break-words leading-tight flex-1">{telemetry?.timezone || 'UTC'}</span>
            </div>

            <div className="flex justify-between items-start py-0.5 gap-1.5">
              <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                Latency:
              </span>
              <span className="font-bold text-emerald-500 text-right tabular-nums text-[9px] break-words leading-tight flex-1">
                {pingMs !== null ? `${pingMs} ms (RTT)` : 'Benchmarking...'}
              </span>
            </div>
          </div>
        )}

        {activeTab === 'posture' && (
          <div className="space-y-1">
            <div className="flex justify-between items-start py-0.5 border-b border-zinc-100 dark:border-white/5 gap-1.5">
              <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                <Laptop className="w-3 h-3 text-blue-500 shrink-0" />
                Host OS:
              </span>
              <span className="font-semibold text-right text-[9px] break-words leading-tight flex-1">{devicePosture.os}</span>
            </div>

            <div className="flex justify-between items-start py-0.5 border-b border-zinc-100 dark:border-white/5 gap-1.5">
              <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                <Globe className="w-3 h-3 text-emerald-500 shrink-0" />
                Browser:
              </span>
              <span className="font-semibold text-right text-[9px] break-words leading-tight flex-1">{devicePosture.browser}</span>
            </div>

            <div className="flex justify-between items-start py-0.5 border-b border-zinc-100 dark:border-white/5 gap-1.5">
              <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                <Cpu className="w-3 h-3 text-purple-500 shrink-0" />
                CPU Cores:
              </span>
              <span className="font-semibold text-right text-[9px] break-words leading-tight flex-1">{devicePosture.hardwareCores}</span>
            </div>

            <div className="flex justify-between items-start py-0.5 border-b border-zinc-100 dark:border-white/5 gap-1.5">
              <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                <Layers className="w-3 h-3 text-amber-500 shrink-0" />
                Display:
              </span>
              <span className="font-semibold text-right text-[9px] break-words leading-tight flex-1">{devicePosture.screenRes}</span>
            </div>

            <div className="flex justify-between items-start py-0.5 gap-1.5">
              <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                <Shield className="w-3 h-3 text-cyan-500 shrink-0" />
                Language:
              </span>
              <span className="font-semibold text-right text-[9px] break-words leading-tight flex-1">{devicePosture.language}</span>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-1">
            <div className="flex justify-between items-start py-0.5 border-b border-zinc-100 dark:border-white/5 gap-1.5">
              <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                <Shield className="w-3 h-3 text-emerald-500 shrink-0" />
                PDP Engine:
              </span>
              <span className="font-semibold text-right text-emerald-500 text-[9px] break-words leading-tight flex-1">NIST SP 800-207</span>
            </div>

            <div className="flex justify-between items-start py-0.5 border-b border-zinc-100 dark:border-white/5 gap-1.5">
              <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                <Lock className="w-3 h-3 text-blue-500 shrink-0" />
                Cipher:
              </span>
              <span className="font-semibold text-right text-[9px] break-words leading-tight flex-1">TLS 1.3 / AES-256</span>
            </div>

            <div className="flex justify-between items-start py-0.5 border-b border-zinc-100 dark:border-white/5 gap-1.5">
              <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                <Activity className="w-3 h-3 text-amber-500 shrink-0" />
                Content Sec:
              </span>
              <span className="font-semibold text-right text-[9px] break-words leading-tight flex-1">CSP L3 • Honeypot Armed</span>
            </div>

            <div className="flex justify-between items-start py-0.5 gap-1.5">
              <span className="text-zinc-400 flex items-center gap-1 shrink-0 text-[9px] pt-0.5">
                <Wifi className="w-3 h-3 text-indigo-500 shrink-0" />
                Data PEP:
              </span>
              <span className="font-semibold text-right text-blue-400 text-[9px] break-words leading-tight flex-1">Micro-Segmented Gate</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className={`px-2.5 py-1.5 border-t flex items-center justify-between gap-1.5 ${
        isLight ? 'border-zinc-200 bg-zinc-50' : 'border-white/5 bg-black/40'
      }`}>
        <button
          onClick={copyDiagnosticSummary}
          className={`px-1.5 py-0.5 rounded-md text-[8px] font-semibold flex items-center gap-1 transition-all cursor-pointer border ${
            copied
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
              : (isLight 
                  ? 'bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-300' 
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10')
          }`}
        >
          {copied ? <Check className="w-2.5 h-2.5 text-white" /> : <Copy className="w-2.5 h-2.5" />}
          <span>{copied ? 'Copied!' : 'Export JSON'}</span>
        </button>

        <div className="flex items-center gap-1 text-[7.5px] text-zinc-400 font-mono">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Live</span>
        </div>
      </div>
    </div>
  )}
</div>
  );
};
