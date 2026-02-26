'use client';

import Link from 'next/link';
import DiscordStatus from '@/components/DiscordStatus';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
    const { t } = useLanguage();

    return (
        <main className="animate-fade-up">
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
            </section>

            <div className="animate-fade-up delay-200 container">
                <DiscordStatus />
            </div>

            <style jsx>{`
                .hero-section {
                    background-color: var(--hero-bg);
                    width: 100%;
                    padding: 18vh 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                @media (max-width: 768px) {
                    .hero-section {
                        padding: 4rem 2rem;
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
    );
}
