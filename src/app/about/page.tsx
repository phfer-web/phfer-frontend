'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <main className="animate-fade-up" style={{ marginTop: '5rem', padding: '0 2rem 15vh 2rem' }}>
            <h1 style={{
                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                marginBottom: '4rem'
            }}>
                {t('about.title')}
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <div style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#444', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#333', marginBottom: '1rem' }}>
                        {t('about.p1')}
                    </p>

                    <p>
                        {t('about.p2')}
                    </p>

                    <p>
                        {t('about.p3')}
                    </p>

                    <p>
                        {t('about.p4')}
                    </p>

                    <p>
                        {t('about.p5')}
                    </p>

                    <p>
                        {t('about.p6')}
                    </p>

                    <p>
                        {t('about.p7')}
                    </p>
                </div>

                <section className="animate-fade-up delay-100">
                    <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#888', marginBottom: '2.5rem' }}>
                        {t('about.expertise')}
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {/* Frontend Card */}
                        <div style={{
                            backgroundColor: '#f9f9f9',
                            padding: '2.5rem',
                            borderRadius: '24px',
                            border: '1px solid rgba(0,0,0,0.03)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Frontend</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <li style={{ color: '#555', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%' }} />
                                    HTML / SCSS
                                </li>
                                <li style={{ color: '#555', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%' }} />
                                    JavaScript / TypeScript
                                </li>
                                <li style={{ color: '#555', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%' }} />
                                    React / Next.js
                                </li>
                                <li style={{ color: '#555', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%' }} />
                                    Vue.js / Vite
                                </li>
                                <li style={{ color: '#555', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%' }} />
                                    Vanilla CSS / Tailwind
                                </li>
                            </ul>
                        </div>

                        {/* Backend Card */}
                        <div style={{
                            backgroundColor: '#f9f9f9',
                            padding: '2.5rem',
                            borderRadius: '24px',
                            border: '1px solid rgba(0,0,0,0.03)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }} className="delay-100">
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Backend</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <li style={{ color: '#555', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%' }} />
                                    C# / .NET
                                </li>
                                <li style={{ color: '#555', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%' }} />
                                    Java
                                </li>
                                <li style={{ color: '#555', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%' }} />
                                    Node.js / NestJS
                                </li>
                                <li style={{ color: '#555', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%' }} />
                                    MySQL / PostgreSQL
                                </li>
                                <li style={{ color: '#555', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%' }} />
                                    MongoDB / REST & GraphQL
                                </li>
                            </ul>
                        </div>

                        {/* Tools Card */}
                        <div style={{
                            backgroundColor: '#f9f9f9',
                            padding: '2.5rem',
                            borderRadius: '24px',
                            border: '1px solid rgba(0,0,0,0.03)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }} className="delay-200">
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Tools & DevOps</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <li style={{ color: '#555', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%' }} />
                                    Git / GitHub
                                </li>
                                <li style={{ color: '#555', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%' }} />
                                    Docker
                                </li>
                                <li style={{ color: '#555', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%' }} />
                                    PowerBI
                                </li>
                                <li style={{ color: '#555', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%' }} />
                                    Deploy / CI/CD
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#888', marginBottom: '2rem' }}>
                        {t('about.philosophy_title')}
                    </h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#444' }}>
                        {t('about.philosophy_text')}
                    </p>
                </section>
            </div>
        </main>
    );
}
