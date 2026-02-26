'use client';

import { useEffect, useState } from 'react';

interface IntroLoaderProps {
    onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Animation sequence timing
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
                onComplete();
            }, 600); // Faster fade/blur out duration
        }, 1500); // Reduced time to show the scribble (faster)

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--hero-bg)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isExiting ? 0 : 1,
            filter: isExiting ? 'blur(20px)' : 'blur(0)',
            transform: 'scale(' + (isExiting ? '1.1' : '1') + ')',
        }}>
            <div style={{ width: 'min(500px, 80vw)', position: 'relative' }}>
                <svg
                    viewBox="0 0 500 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '100%', height: 'auto' }}
                >
                    {/* Placeholder for real "initpedro" handwritten path */}
                    <text
                        x="50%"
                        y="55%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="scribble-text"
                        style={{
                            fontFamily: '"Shadows Into Light", cursive, sans-serif',
                            fontSize: '60px',
                            fontWeight: 800,
                            fill: 'none',
                            stroke: '#000',
                            strokeWidth: '1.5',
                            letterSpacing: '0.1em'
                        }}
                    >
                        initpedro
                    </text>
                </svg>

                <style jsx>{`
                    .scribble-text {
                        stroke-dasharray: 1000;
                        stroke-dashoffset: 1000;
                        animation: drawText 1.2s ease-in-out forwards;
                    }

                    @keyframes drawText {
                        0% {
                            stroke-dashoffset: 1000;
                            opacity: 0;
                        }
                        10% {
                            opacity: 1;
                        }
                        100% {
                            stroke-dashoffset: 0;
                            opacity: 1;
                        }
                    }

                    /* Add a subtle wobble effect to look more hand-drawn */
                    .scribble-text {
                        animation: drawText 1.2s ease-in-out forwards, wobble 3s infinite alternate;
                    }

                    @keyframes wobble {
                        0% { transform: translate(0, 0) rotate(0deg); }
                        25% { transform: translate(1px, -1px) rotate(0.1deg); }
                        50% { transform: translate(-1px, 1px) rotate(-0.1deg); }
                        100% { transform: translate(0, 0) rotate(0deg); }
                    }
                `}</style>
            </div>

            {/* Import Google Font for handwritten look */}
            <link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel="stylesheet" />
        </div>
    );
}
