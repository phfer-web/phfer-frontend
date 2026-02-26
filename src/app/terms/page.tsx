'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsPage() {
    const { t } = useLanguage();

    return (
        <main className="container" style={{ marginTop: '5rem', paddingTop: '4vh', paddingBottom: '4vh' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>{t('legal.terms.title')}</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7 }}>
                <p>{t('legal.terms.p1')}</p>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem' }}>{t('legal.terms.q1')}</h2>
                <p>{t('legal.terms.a1')}</p>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem' }}>{t('legal.terms.q2')}</h2>
                <p>{t('legal.terms.a2')}</p>
            </div>
        </main>
    );
}
