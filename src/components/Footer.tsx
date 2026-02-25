'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
    const { language, setLanguage, t } = useLanguage();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const languages: { name: 'English' | 'Português (PT-BR)'; label: string }[] = [
        { name: 'English', label: 'English' },
        { name: 'Português (PT-BR)', label: 'Português (PT-BR)' },
    ];

    const handleLanguageSelect = (lang: 'English' | 'Português (PT-BR)') => {
        setLanguage(lang);
        setIsDropdownOpen(false);
    };

    return (
        <div style={{ background: 'linear-gradient(to right, var(--hero-bg), #C5BB9D)', paddingBottom: '40px', paddingTop: '1px' }}>
            <footer className="footer-main" style={{
                backgroundColor: '#F9F9F9',
                color: '#000',
                padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 28rem)',
                margin: '40px auto',
                borderRadius: '32px',
                maxWidth: 'var(--max-width)',
                width: '100%',
                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
            }}>
                <div className="footer-content" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '3rem',
                }}>
                    {/* Brand Info */}
                    <div style={{ minWidth: '250px', position: 'relative' }}>
                        <p style={{
                            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            marginBottom: '0.5rem'
                        }}>
                            Pedro Fonseca
                        </p>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>
                            {t('footer.copyright')}
                        </p>

                        <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                aria-expanded={isDropdownOpen}
                                type="button"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 16px',
                                    backgroundColor: '#f0f0f0',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '100px',
                                    fontSize: '0.85rem',
                                    color: '#000',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s cubic-bezier(0, 0, 0.2, 1)',
                                    marginTop: '1rem',
                                    lineHeight: 1
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#e8e8e8';
                                    e.currentTarget.style.borderColor = '#d0d0d0';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                                    e.currentTarget.style.borderColor = '#e0e0e0';
                                }}
                            >
                                <span style={{ fontSize: '1rem' }}>🌐</span>
                                <span>{language}</span>
                                <span style={{ fontSize: '0.7rem', opacity: 0.4, marginLeft: '2px', transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>↓</span>
                            </button>

                            {isDropdownOpen && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: 'calc(100% + 12px)',
                                        left: '0',
                                        zIndex: 50,
                                        minWidth: '180px',
                                        backgroundColor: '#F9F9F9',
                                        borderRadius: '16px',
                                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
                                        border: '1px solid #eee',
                                        padding: '8px 0',
                                        animation: 'fadeUp 0.2s ease-out'
                                    }}
                                >
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {languages.map((lang) => (
                                            <li key={lang.name}>
                                                <button
                                                    onClick={() => handleLanguageSelect(lang.name)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px 20px',
                                                        textAlign: 'left',
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        fontSize: '0.875rem',
                                                        color: language === lang.name ? '#000' : '#666',
                                                        fontWeight: language === lang.name ? 600 : 400,
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        transition: 'background-color 0.2s'
                                                    }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                                >
                                                    {lang.label}
                                                    {language === lang.name && <span style={{ fontSize: '0.8rem' }}>✓</span>}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Social Section */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        minWidth: '250px'
                    }}>
                        <h3 style={{
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            color: '#888'
                        }}>
                            {t('footer.social')}
                        </h3>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                        }}>
                            <li>
                                <a href="https://www.instagram.com/initpedro/" target="_blank" rel="noopener" style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/initpedro/" target="_blank" rel="noopener" style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/initpedro/" target="_blank" rel="noopener" style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}
