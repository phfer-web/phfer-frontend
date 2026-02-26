'use client';

import Link from 'next/link';
import DiscordStatus from '@/components/DiscordStatus';
import { useLanguage } from '@/context/LanguageContext';
import IntroLoader from '@/components/IntroLoader';
import { useState } from 'react';

export default function HomePage() {
    const { t } = useLanguage();
    const [showIntro, setShowIntro] = useState(true);

    return (
        <>
            {showIntro && <IntroLoader onComplete={() => setShowIntro(false)} />}

            <main className={`animate-fade-up ${showIntro ? 'opacity-0' : 'opacity-100'}`} style={{ transition: 'opacity 0.5s ease' }}>
                <section className="hero-section">
                    <div className="container">
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            letterSpacing: '-0.04em'
                        }}>
                            {t('home.hero.title')} <span style={{ color: '#000' }}>{t('home.hero.subtitle')}</span>.
                        </h1>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                            color: '#444',
                            maxWidth: '900px',
                            lineHeight: 1.6,
                            fontWeight: 400,
                            marginTop: '1.5rem'
                        }}>
                            {t('home.hero.description')}
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                            <a
                                href="https://drive.google.com/drive/folders/1uxyglnsnpw3eLQLCb_xpqVoffd-lLT3I"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cv-button"
                                style={{
                                    padding: '1rem 2rem',
                                    backgroundColor: '#000',
                                    color: '#fff',
                                    borderRadius: '100px',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {t('home.hero.cv')}
                                <span>↗</span>
                            </a>
                            <Link
                                href="/work"
                                className="works-button"
                                style={{
                                    padding: '1rem 2rem',
                                    backgroundColor: 'transparent',
                                    color: '#000',
                                    border: '2px solid #000',
                                    borderRadius: '100px',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {t('home.hero.works')}
                            </Link>
                        </div>

                    </div>

                    <div style={{
                        position: 'absolute',
                        bottom: '-1px',
                        left: 0,
                        width: '100%',
                        overflow: 'hidden',
                        lineHeight: 0,
                    }}>
                        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{
                            position: 'relative',
                            display: 'block',
                            width: 'calc(100% + 1.3px)',
                            height: '100px',
                        }}>
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" fill="#F9F9F9"></path>
                        </svg>
                    </div>
                </section>

                <div className="animate-fade-up delay-200 container">
                    <DiscordStatus />
                </div>

                <style jsx>{`
                .hero-section {
                    background-color: var(--hero-bg);
                    width: 100%;
                    padding: 18vh 0 25vh 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    overflow: hidden;
                }
                @media (max-width: 1100px) {
                    :global(main) {
                        padding: 0 !important;
                    }
                    .hero-section {
                        padding: 2.8rem 0rem 9rem 0rem;
                    }
                }
                .cv-button:hover {
                    opacity: 0.8;
                }
                .works-button:hover {
                    background-color: #000 !important;
                    color: #fff !important;
                }
            `}</style>
            </main>
        </>
    );
}
