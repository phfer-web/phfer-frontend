'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPage() {
    const { t } = useLanguage();

    return (
        <main style={{ marginTop: '5rem', padding: '0 2rem 15vh 2rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>{t('legal.privacy.title')}</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7 }}>
                <p>{t('legal.privacy.p1')}</p>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem' }}>{t('legal.privacy.q1')}</h2>
                <p>{t('legal.privacy.a1')}</p>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem' }}>{t('legal.privacy.q2')}</h2>
                <p>{t('legal.privacy.a2')}</p>
            </div>
        </main>
    );
}
