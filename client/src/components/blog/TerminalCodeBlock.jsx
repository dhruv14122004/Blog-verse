import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TerminalCodeBlock = ({ code, language = 'javascript', title = 'script.js' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-8 rounded-lg overflow-hidden border border-zinc-700 bg-[#0b0b0f] shadow-lg font-mono text-sm relative group">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-zinc-400 text-xs">{title}</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="text-zinc-400 hover:text-white transition-colors"
                >
                    {copied ? 'COPIED!' : 'COPY'}
                </button>
            </div>

            {/* Code Content */}
            <div className="p-4 overflow-x-auto">
                <pre className="text-[var(--color-web-white)]">
                    <code>{code}</code>
                </pre>
            </div>

            {/* Glitch Overlay Effect on Hover */}
            <motion.div
                className="absolute inset-0 bg-[var(--color-electric-blue)]/5 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
            ></motion.div>
        </div>
    );
};

export default TerminalCodeBlock;
