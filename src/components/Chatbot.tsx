'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface Message {
    role: 'user' | 'model';
    parts: { text: string }[];
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const sendMessage = async () => {
        if (!input.trim() || loading || cooldown) return;

        const userMessage: Message = { role: 'user', parts: [{ text: input }] };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);
        setCooldown(true);

        // Start cooldown timer (3 seconds)
        setTimeout(() => setCooldown(false), 3000);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (!apiUrl) {
                console.error('NEXT_PUBLIC_API_URL is not defined in the environment.');
                throw new Error('API URL not configured');
            }
            const response = await fetch(`${apiUrl}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: input,
                    history: messages,
                }),
            });

            const data = await response.json();

            if (data.text) {
                setMessages((prev) => [...prev, { role: 'model', parts: [{ text: data.text }] }]);
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages((prev) => [...prev, {
                role: 'model',
                parts: [{ text: t('chat.error') }]
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--brand-black, #000)',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isOpen ? 'rotate(45deg)' : 'none',
                }}
            >
                {isOpen ? (
                    <span style={{ fontSize: '1.5rem' }}>✕</span>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '7.5rem',
                    right: '2rem',
                    width: 'min(400px, 90vw)',
                    height: 'min(600px, 70vh)',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    boxShadow: '0 12px 48px rgba(0,0,0,0.12)',
                    zIndex: 999,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                    pointerEvents: isOpen ? 'all' : 'none',
                    border: '1px solid rgba(0,0,0,0.05)',
                }}
            >
                {/* Header */}
                <div style={{
                    padding: '1.25rem 1.5rem',
                    background: 'rgba(0,0,0,0.02)',
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{ position: 'relative' }}>
                        <img
                            src="/image-personal.png"
                            alt="Pedro"
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: '2px solid #fff',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                objectFit: 'cover'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '2px',
                            right: '2px',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: '#10B981',
                            border: '2px solid #fff',
                            boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.1)'
                        }} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{t('chat.header.title')}</h3>
                        <p style={{ fontSize: '0.75rem', color: '#666', margin: 0 }}>{t('chat.header.status')}</p>
                    </div>
                </div>

                {/* Messages */}
                <div
                    ref={scrollRef}
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                    }}
                >
                    {messages.length === 0 && (
                        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#888' }}>
                            <p style={{ fontSize: '0.9rem' }}>{t('chat.welcome')}</p>
                            <p style={{ fontSize: '0.8rem' }}>{t('chat.suggestion')}</p>
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                                alignItems: 'flex-end'
                            }}
                        >
                            {/* Avatar Icon */}
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: msg.role === 'user' ? '#f0f0f0' : 'rgba(0,0,0,0.05)',
                                color: '#666',
                                flexShrink: 0
                            }}>
                                {msg.role === 'user' ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                                        <circle cx="12" cy="5" r="2"></circle>
                                        <path d="M12 7v4"></path>
                                        <line x1="8" y1="16" x2="8" y2="16"></line>
                                        <line x1="16" y1="16" x2="16" y2="16"></line>
                                    </svg>
                                )}
                            </div>

                            <div
                                style={{
                                    maxWidth: '80%',
                                    padding: '0.8rem 1.2rem',
                                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                    background: msg.role === 'user' ? '#000' : 'rgba(0,0,0,0.05)',
                                    color: msg.role === 'user' ? '#fff' : '#000',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.4',
                                    animation: 'fadeUp 0.3s ease-out forwards',
                                }}
                            >
                                {msg.parts[0].text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(0,0,0,0.05)',
                                color: '#666',
                                flexShrink: 0
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                                    <circle cx="12" cy="5" r="2"></circle>
                                    <path d="M12 7v4"></path>
                                    <line x1="8" y1="16" x2="8" y2="16"></line>
                                    <line x1="16" y1="16" x2="16" y2="16"></line>
                                </svg>
                            </div>
                            <div style={{ padding: '0.8rem' }}>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#888', animation: 'typing 1s infinite' }} />
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#888', animation: 'typing 1s infinite 0.2s' }} />
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#888', animation: 'typing 1s infinite 0.4s' }} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div style={{
                    padding: '1.5rem',
                    borderTop: '1px solid rgba(0,0,0,0.05)',
                    display: 'flex',
                    gap: '10px'
                }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        disabled={loading || cooldown}
                        placeholder={cooldown ? t('chat.cooldown') : t('chat.placeholder')}
                        style={{
                            flex: 1,
                            background: 'rgba(0,0,0,0.03)',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '0.8rem 1rem',
                            fontSize: '0.9rem',
                            outline: 'none',
                            opacity: (loading || cooldown) ? 0.6 : 1
                        }}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || loading || cooldown}
                        style={{
                            background: '#000',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            width: '42px',
                            height: '42px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            opacity: !input.trim() || loading ? 0.3 : 1,
                            transition: 'all 0.2s'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>

            <style jsx global>{`
        @keyframes typing {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
        </>
    );
}
