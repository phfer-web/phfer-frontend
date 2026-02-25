'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NotFound() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            router.push('/home');
        }, 5000);

        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
        };
    }, [router]);

    return (
        <main style={{
            height: '70vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1.5rem'
        }}>
            <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 800, letterSpacing: '-0.05em' }}>404</h1>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>Page not found. Redirecting to home in {countdown}s...</p>
            <Link href="/home" style={{
                textDecoration: 'underline',
                fontWeight: 600,
                marginTop: '1rem'
            }}>
                Go home now
            </Link>
        </main>
    );
}
