import React, { useState } from 'react';
import { X, Calendar, Clock, Eye, Heart, Share2, Terminal, Check, Printer } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from '../types';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, onClose }) => {
  const [likes, setLikes] = useState(post ? post.likes : 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!post) return null;

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0a0a0c] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
          <div className="flex items-center space-x-2 text-xs font-medium text-blue-400">
            <span className="px-2.5 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
              {post.category}
            </span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              title="Print Whitepaper / Executive Brief"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 font-normal">
              {post.excerpt}
            </p>

            {/* Author and Date Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center space-x-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <div>
                  <div className="text-sm font-semibold text-white">{post.author.name}</div>
                  <div className="text-xs text-zinc-400">{post.author.role}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs text-zinc-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            {/* Executive Key Takeaway Callout Box */}
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-200 text-xs sm:text-sm space-y-1">
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-blue-400 text-[11px]">
                <span>Executive Committee Key Takeaway</span>
              </div>
              <p className="leading-relaxed text-zinc-200">
                {post.id === 'bp-2026-fair-model' && "Empowers the CFO and Board Audit Committee to replace subjective red/amber/green heatmaps with actuarial loss probability distributions, optimizing cyber insurance premiums and capital reserve allocations."}
                {post.id === 'bp-2025-sec-disclosure' && "Establishes a 96-hour cross-functional materiality determination runbook connecting the CISO, General Counsel, and Investor Relations to prevent regulatory enforcement penalties."}
                {post.id === 'bp-2025-genai-sec' && "Provides governance for secure LLM enterprise integration, preventing prompt exfiltration and token leakage via real-time reverse proxy inspection."}
                {post.id === 'bp-2025-nhi-identities' && "Mitigates credential sprawl across multi-cloud service accounts by enforcing ephemeral workloads and Identity Federation cryptographic attestation."}
                {post.id !== 'bp-2026-fair-model' && post.id !== 'bp-2025-sec-disclosure' && post.id !== 'bp-2025-genai-sec' && post.id !== 'bp-2025-nhi-identities' && "Provides rigorous architectural patterns and governance frameworks for enterprise security transformation."}
              </p>
            </div>
          </div>

          {/* Markdown Content */}
          <div className="prose prose-invert max-w-none text-zinc-300 text-sm sm:text-base leading-relaxed space-y-6 pt-4 border-t border-white/10">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 className="text-2xl sm:text-3xl font-bold text-white mt-8 mb-4 tracking-tight" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-xl sm:text-2xl font-bold text-white mt-6 mb-3 tracking-tight" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-lg font-semibold text-white mt-4 mb-2" {...props} />,
                p: ({ node, ...props }) => <p className="mb-4 text-zinc-300 leading-relaxed" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2 mb-4 text-zinc-300" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-2 mb-4 text-zinc-300" {...props} />,
                li: ({ node, ...props }) => <li className="text-zinc-300" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-semibold text-white" {...props} />,
                blockquote: ({ node, ...props }) => <blockquote className="border-l-2 border-blue-500 pl-4 italic text-zinc-400 my-4" {...props} />,
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="w-full text-left border-collapse border border-white/10 rounded-xl overflow-hidden" {...props} />
                  </div>
                ),
                th: ({ node, ...props }) => <th className="bg-white/[0.05] p-3 text-white font-semibold border-b border-white/10" {...props} />,
                td: ({ node, ...props }) => <td className="p-3 border-b border-white/5 text-zinc-300" {...props} />,
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline ? (
                    <div className="my-6 rounded-2xl overflow-hidden border border-white/10 bg-[#000000]">
                      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/10 text-xs text-zinc-400 font-mono">
                        <span>{match ? match[1].toUpperCase() : 'CODE'}</span>
                        <Terminal className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-blue-200">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  ) : (
                    <code className="bg-white/10 text-blue-300 px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="text-xs font-medium bg-white/[0.05] border border-white/10 px-3 py-1 rounded-full text-zinc-300">
                #{tag}
              </span>
            ))}
          </div>

          {/* Footer Actions (Like & Share) */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                hasLiked
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'bg-white/[0.05] text-zinc-300 hover:text-white border border-white/10'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span>{likes} Likes</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/10 rounded-full text-xs font-medium transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
