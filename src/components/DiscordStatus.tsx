'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const DISCORD_ID = '683063659638816800';

export default function DiscordStatus() {
    const { t } = useLanguage();
    const [status, setStatus] = useState<'online' | 'idle' | 'dnd' | 'offline' | 'loading'>('loading');
    const [profileData, setProfileData] = useState<any>(null);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
                const data = await response.json();
                if (data.success) {
                    setStatus(data.data.discord_status);
                    setProfileData(data.data);
                } else {
                    setStatus('offline');
                }
            } catch (error) {
                console.error('Error fetching Discord status:', error);
                setStatus('offline');
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 30000);
        return () => clearInterval(interval);
    }, []);

    const isActive = status === 'online' || status === 'dnd';
    const message = isActive
        ? t('status.message_active')
        : t('status.message_away');

    // Discord Status Branding Colors
    const statusColors = {
        online: '#23a55a',
        idle: '#f0b232',
        dnd: '#f23f43',
        offline: '#80848e',
        loading: '#80848e'
    };

    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);

    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(false);
    const chatScrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatScrollRef.current) {
            chatScrollRef.current.scrollTo({
                top: chatScrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages, loading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim() || loading || cooldown) return;

        const userMessage = { role: 'user' as const, content: chatInput };
        setChatMessages(prev => [...prev, userMessage]);
        const currentInput = chatInput;
        setChatInput('');
        setLoading(true);
        setCooldown(true);

        // Start cooldown timer (3 seconds)
        setTimeout(() => setCooldown(false), 3000);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (!apiUrl) throw new Error('API URL not configured');

            const response = await fetch(`${apiUrl}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: currentInput,
                    history: chatMessages.map(m => ({
                        role: m.role === 'assistant' ? 'model' : 'user',
                        parts: [{ text: m.content }]
                    }))
                }),
            });

            const data = await response.json();
            if (data.text) {
                setChatMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (error: any) {
            console.error('Chat Error:', error);
            setChatMessages(prev => [...prev, {
                role: 'assistant',
                content: t('chat.error')
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section style={{
            padding: '120px 2rem',
            backgroundColor: '#F9F9F9',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '600px',
            width: '100%'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: '5rem',
                maxWidth: '1200px',
                width: '100%'
            }}>
                {/* COLUMN 1: High-Fidelity Discord Profile Card (Left) */}
                <div style={{
                    flex: '1',
                    minWidth: '340px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    {/* The Card */}
                    <div style={{
                        width: '340px',
                        backgroundColor: '#111214',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        color: '#fff',
                        fontFamily: 'var(--font-geist-sans), sans-serif',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                        border: '1px solid #1e1f22'
                    }}>
                        {/* Banner Layer */}
                        <div style={{
                            height: '105px',
                            backgroundColor: profileData?.discord_user?.banner_color || '#5865F2',
                            backgroundImage: profileData?.discord_user?.banner
                                ? `url(https://cdn.discordapp.com/banners/${DISCORD_ID}/${profileData.discord_user.banner}.webp?size=600)`
                                : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}></div>

                        {/* Content Layer */}
                        <div style={{ padding: '0 16px 16px 16px', position: 'relative' }}>
                            {/* Avatar & Decoration HUD */}
                            <div style={{
                                position: 'absolute',
                                top: '-105px',
                                left: '16px',
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                backgroundColor: '#111214',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {/* Base Avatar */}
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    border: '2px solid #111214'
                                }}>
                                    {profileData?.discord_user?.avatar && (
                                        <img
                                            src={`https://cdn.discordapp.com/avatars/${DISCORD_ID}/${profileData.discord_user.avatar}.webp?size=160`}
                                            alt="Discord Avatar"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    )}
                                </div>

                                {/* Status Ring/Indicator */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '4px',
                                    right: '4px',
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    backgroundColor: (statusColors as any)[status === 'loading' ? 'offline' : status],
                                    border: '2px solid #111214',
                                    zIndex: 3
                                }}></div>
                            </div>

                            {/* Identity Section (Names) */}
                            <div style={{ marginTop: '120px', padding: '0 4px', position: 'relative' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#fff' }}>
                                    {profileData?.discord_user?.global_name || 'Pedro'}
                                </h3>
                                <p style={{ fontSize: '0.85rem', color: '#b5bac1', margin: '2px 0 0 0' }}>
                                    {profileData?.discord_user?.username || 'initpedro'}
                                </p>
                            </div>

                            {/* Info Box (About Me, etc) */}
                            <div style={{ marginTop: '12px' }}>
                                <div style={{
                                    backgroundColor: '#1e1f22',
                                    borderRadius: '8px',
                                    padding: '12px',
                                }}>
                                    {/* About Me Section */}
                                    <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#fff', marginBottom: '8px' }}>
                                        {t('about.title')}
                                    </h4>
                                    <p style={{ fontSize: '0.85rem', color: '#dbdee1', lineHeight: 1.4, margin: 0 }}>
                                        {profileData?.activities?.find((a: any) => a.type === 4)?.state || "Software Developer. Building innovative solutions."}
                                    </p>

                                    <div style={{
                                        width: '100%',
                                        height: '1px',
                                        backgroundColor: '#2b2d31',
                                        margin: '12px 0'
                                    }}></div>

                                    {/* Activity (Current Role / Custom) */}
                                    <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#fff', marginTop: '12px', marginBottom: '8px' }}>
                                        {t('status.member_since')}
                                    </h4>
                                    <p style={{ fontSize: '0.85rem', color: '#dbdee1', margin: 0 }}>
                                        {t('status.active_dev')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUMN 2: Chat & Messages (Right) */}
                <div
                    className="discord-chat-column"
                    style={{
                        flex: '1.5',
                        minWidth: '350px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem'
                    }}
                >
                    <div className="discord-chat-header">
                        <h2 style={{
                            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            marginBottom: '1rem',
                            color: '#1a1a1a'
                        }}>
                            {isActive ? t('status.chat_header_active') : t('status.chat_header_away')}
                        </h2>
                        <p style={{
                            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                            color: '#666',
                            lineHeight: 1.6,
                            maxWidth: '500px'
                        }}>
                            {message}
                        </p>
                    </div>

                    {/* Chat Box */}
                    <div style={{
                        backgroundColor: '#f9f9f9',
                        borderRadius: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '450px', // Slightly taller to accommodate header
                        maxWidth: '500px',
                        width: '100%',
                        border: '1px solid #eee',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        alignSelf: 'inherit',
                        overflow: 'hidden'
                    }}>
                        {/* Chat Header inside the box */}
                        <div style={{
                            padding: '1rem 1.5rem',
                            background: 'rgba(0,0,0,0.02)',
                            borderBottom: '1px solid #eee',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src="/image-personal.png"
                                    alt="Pedro"
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        border: '2px solid #fff',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    right: '0',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: isActive ? statusColors.online : statusColors.offline,
                                    border: '2px solid #fff',
                                    boxShadow: '0 0 0 2px rgba(0,0,0,0.05)'
                                }} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>{t('chat.header.title')}</h3>
                                <p style={{ fontSize: '0.7rem', color: '#666', margin: 0 }}>{t('chat.header.status')}</p>
                            </div>
                        </div>

                        <div
                            ref={chatScrollRef}
                            style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {chatMessages.length === 0 && (
                                <div style={{
                                    alignSelf: 'flex-start',
                                    backgroundColor: '#F9F9F9',
                                    color: '#000',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '18px 18px 18px 4px',
                                    fontSize: '0.9rem',
                                    maxWidth: '85%',
                                    border: '1px solid #eee',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                                }}>
                                    {t('chat.welcome_discord')}
                                </div>
                            )}
                            {chatMessages.map((msg, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    gap: '10px',
                                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                                    alignItems: 'flex-end',
                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    width: '100%'
                                }}>
                                    {/* Avatar Icon */}
                                    <div style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: msg.role === 'user' ? '#f0f0f0' : 'rgba(0,0,0,0.05)',
                                        color: '#666',
                                        flexShrink: 0
                                    }}>
                                        {msg.role === 'user' ? (
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        ) : (
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                                                <circle cx="12" cy="5" r="2"></circle>
                                                <path d="M12 7v4"></path>
                                                <line x1="8" y1="16" x2="8" y2="16"></line>
                                                <line x1="16" y1="16" x2="16" y2="16"></line>
                                            </svg>
                                        )}
                                    </div>

                                    <div style={{
                                        backgroundColor: msg.role === 'user' ? '#000' : '#F9F9F9',
                                        color: msg.role === 'user' ? '#fff' : '#000',
                                        padding: '0.75rem 1rem',
                                        borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                        fontSize: '0.9rem',
                                        maxWidth: '75%',
                                        border: msg.role === 'assistant' ? '1px solid #eee' : 'none',
                                        boxShadow: msg.role === 'assistant' ? '0 2px 5px rgba(0,0,0,0.02)' : 'none',
                                        animation: 'fadeUp 0.3s ease-out forwards',
                                    }}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', alignSelf: 'flex-start' }}>
                                    <div style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'rgba(0,0,0,0.05)',
                                        color: '#666',
                                        flexShrink: 0
                                    }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                                            <circle cx="12" cy="5" r="2"></circle>
                                            <path d="M12 7v4"></path>
                                            <line x1="8" y1="16" x2="8" y2="16"></line>
                                            <line x1="16" y1="16" x2="16" y2="16"></line>
                                        </svg>
                                    </div>
                                    <div style={{ padding: '0.5rem 0.5rem', display: 'flex', gap: '4px' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#888', animation: 'typing 1s infinite' }} />
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#888', animation: 'typing 1s infinite 0.2s' }} />
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#888', animation: 'typing 1s infinite 0.4s' }} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.75rem' }}>
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                disabled={loading || cooldown}
                                placeholder={cooldown ? t('chat.cooldown') : t('chat.placeholder')}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem 1.25rem',
                                    borderRadius: '100px',
                                    border: '1px solid #ddd',
                                    outline: 'none',
                                    fontSize: '0.9rem',
                                    opacity: (loading || cooldown) ? 0.6 : 1
                                }}
                            />
                            <button
                                type="submit"
                                disabled={!chatInput.trim() || loading || cooldown}
                                style={{
                                    backgroundColor: '#000',
                                    color: '#fff',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: (!chatInput.trim() || loading || cooldown) ? 0.3 : 1
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .discord-chat-column {
                    text-align: left;
                    align-items: flex-start;
                }
                .discord-chat-header p {
                    margin-left: 0;
                }
                @media (max-width: 1100px) {
                    .discord-chat-column {
                        text-align: center;
                        align-items: center;
                    }
                    .discord-chat-header p {
                        margin-left: auto;
                        margin-right: auto;
                    }
                }
            `}</style>
        </section >
    );
}
