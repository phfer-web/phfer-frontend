'use client';

import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    about: string;
    tags: string[];
    githubUrl: string;
    demoUrl?: string;
    imageUrl: string;
    gradient: string;
}

export default function WorkPage() {
    const { t } = useLanguage();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const projects: Project[] = [
        {
            id: 'kardio',
            title: t('projects.kardio.title'),
            shortDescription: t('projects.kardio.short'),
            fullDescription: t('projects.kardio.full'),
            about: t('projects.kardio.about'),
            tags: ['React', 'Vite', 'Node.js', 'Supabase', 'Google Auth'],
            githubUrl: 'https://github.com/kardio-app/kardio-frontend',
            demoUrl: 'https://kardio.netlify.app/home',
            imageUrl: '/kardio-image.png',
            gradient: 'linear-gradient(45deg, #2a2a2a, #1a1a1a)'
        },
        {
            id: 'dentioo',
            title: t('projects.dentioo.title'),
            shortDescription: t('projects.dentioo.short'),
            fullDescription: t('projects.dentioo.full'),
            about: t('projects.dentioo.about'),
            tags: ['React', 'Supabase', 'Google APIs', 'PDF Tools', 'Micro-SaaS'],
            githubUrl: 'https://github.com/dentioo/dentioo-frontend',
            demoUrl: 'https://dentioo.netlify.app/',
            imageUrl: '/dentioo-image.png',
            gradient: 'linear-gradient(45deg, #1a1a1a, #000)'
        },
        {
            id: 'aura-air',
            title: t('projects.aura.title'),
            shortDescription: t('projects.aura.short'),
            fullDescription: t('projects.aura.full'),
            about: t('projects.aura.about'),
            tags: ['NASA API', 'Google Maps', 'MySQL', 'Docker', 'React', 'Hackathon'],
            githubUrl: 'https://github.com/nasa-hackaton-app/aura-air-app',
            imageUrl: '/aura-image.png',
            gradient: 'linear-gradient(45deg, #4facfe, #00f2fe)'
        },
        {
            id: 'mvc-crud',
            title: t('projects.mvc.title'),
            shortDescription: t('projects.mvc.short'),
            fullDescription: t('projects.mvc.full'),
            about: t('projects.mvc.about'),
            tags: ['C#', '.NET MVC', 'OOP', 'MySQL', 'CRUD'],
            githubUrl: 'https://github.com/initpedro',
            imageUrl: '/mvc-image.png',
            gradient: 'linear-gradient(45deg, #444, #333)'
        }
    ];

    // Lock scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProject]);

    return (
        <>
            <main className="animate-fade-up" style={{
                marginTop: '5rem',
                padding: '0 clamp(1rem, 5vw, 2rem) 15vh clamp(1rem, 5vw, 2rem)',
                maxWidth: 'var(--max-width)',
                margin: '5rem auto 0 auto'
            }}>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    marginBottom: '1rem'
                }}>
                    {t('work.title')}
                </h1>

                <p style={{
                    fontSize: '1.1rem',
                    color: '#666',
                    maxWidth: '1100px',
                    lineHeight: 1.6,
                    marginBottom: '4rem'
                }}>
                    {t('work.description')}
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
                    gap: 'clamp(2rem, 5vw, 4rem)',
                    justifyContent: 'center'
                }}>
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem',
                                backgroundColor: '#F9F9F9',
                                border: '1px solid #eee',
                                padding: '2rem',
                                borderRadius: '24px',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'default',
                                minHeight: '540px'
                            }}
                            className="project-card"
                        >
                            <div style={{
                                aspectRatio: '16/9',
                                backgroundColor: '#eee',
                                width: '100%',
                                backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : project.gradient,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '12px'
                            }} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>{project.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#666', margin: 0, lineHeight: 1.5 }}>
                                    {project.shortDescription}
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    {project.tags.slice(0, 3).map(tag => (
                                        <span key={tag} style={{
                                            fontSize: '0.65rem',
                                            textTransform: 'uppercase',
                                            padding: '4px 10px',
                                            backgroundColor: '#f5f5f5',
                                            color: '#666',
                                            borderRadius: '6px',
                                            fontWeight: 600
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setSelectedProject(project)}
                                    style={{
                                        marginTop: 'auto',
                                        padding: '12px',
                                        backgroundColor: '#000',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'opacity 0.2s ease'
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
                                    onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                                >
                                    {t('work.see_details')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modal */}
            {selectedProject && (
                <div
                    className="modal-overlay animate-fade-in"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="modal-content animate-zoom-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedProject(null)}
                            style={{
                                position: 'absolute',
                                top: '24px',
                                right: '24px',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(0,0,0,0.05)',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                        </button>

                        <div style={{ flex: '0 0 40%', position: 'relative', minHeight: '300px' }}>
                            {selectedProject.imageUrl && (
                                <NextImage
                                    src={selectedProject.imageUrl}
                                    alt={selectedProject.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 1100px) 100vw, 40vw"
                                    priority
                                />
                            )}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))',
                                pointerEvents: 'none'
                            }} />
                        </div>

                        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                            <div style={{ padding: '40px', flex: 1 }}>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                                    {selectedProject.title}
                                </h2>

                                <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6, marginBottom: '2rem' }}>
                                    {selectedProject.fullDescription}
                                </p>

                                <div style={{ marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
                                        {t('work.modal.technologies')}
                                    </h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {selectedProject.tags.map((tag: string) => (
                                            <span key={tag} style={{
                                                fontSize: '0.8rem',
                                                fontWeight: 600,
                                                padding: '6px 14px',
                                                backgroundColor: 'rgba(0,0,0,0.04)',
                                                color: '#000',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(0,0,0,0.05)'
                                            }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{t('work.modal.about')}</h3>
                                    <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6 }}>
                                        {selectedProject.about}
                                    </p>
                                </div>
                            </div>

                            <div style={{ padding: '32px 40px', borderTop: '1px solid #eee', background: '#fcfcfc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <a
                                    href={selectedProject.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        backgroundColor: '#000',
                                        color: '#fff',
                                        borderRadius: '12px',
                                        fontWeight: 700,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        textAlign: 'center'
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                                    {t('work.modal.github')}
                                </a>
                                {selectedProject.demoUrl && (
                                    <a
                                        href={selectedProject.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            width: '100%',
                                            padding: '16px',
                                            backgroundColor: '#F9F9F9',
                                            color: '#000',
                                            borderRadius: '12px',
                                            fontWeight: 700,
                                            border: '2px solid #000',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                        {t('work.modal.demo')}
                                    </a>
                                )}
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    style={{
                                        border: 'none',
                                        background: 'none',
                                        color: '#888',
                                        fontSize: '0.9rem',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        marginTop: '4px'
                                    }}
                                >
                                    {t('work.modal.close')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

}
