'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        // Check if user has already accepted cookies
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Delay showing the banner for a smoother entrance
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            width: '100%',
            padding: '0 1rem 1rem 1rem',
            animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    borderRadius: '24px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                    padding: '1.25rem 1.5rem',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1.5rem'
                    }}>
                        <p style={{
                            fontSize: '0.9rem',
                            color: '#444',
                            flex: '1',
                            minWidth: '280px',
                            margin: 0,
                            lineHeight: 1.5
                        }}>
                            {t('cookies.banner')}{' '}
                            <Link href="/cookies" style={{ color: '#000', fontWeight: 600, textDecoration: 'underline' }}>
                                {t('cookies.link')}
                            </Link>.
                        </p>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            flexWrap: 'wrap'
                        }}>
                            <Link
                                href="/cookies"
                                style={{
                                    padding: '0.6rem 1.25rem',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    borderRadius: '100px',
                                    border: '1px solid #eee',
                                    backgroundColor: '#fff',
                                    color: '#000',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {t('cookies.learn_more')}
                            </Link>
                            <button
                                onClick={handleAccept}
                                style={{
                                    padding: '0.6rem 1.5rem',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    borderRadius: '100px',
                                    backgroundColor: '#000',
                                    color: '#fff',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
                                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                            >
                                {t('cookies.accept')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
