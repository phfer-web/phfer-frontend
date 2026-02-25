'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const isHome = pathname === '/home' || pathname === '/';

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav style={{
        padding: 'var(--nav-padding)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '90%',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 100,
        backgroundColor: 'transparent'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/home" style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="/222f200c423f6f352cb33c62645afd89.png"
              alt="INITPEDRO"
              width={80}
              height={50}
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {isHome ? (
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
                position: 'relative',
                zIndex: 1001
              }}
            >
              <div style={{
                width: '24px',
                height: '18px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <span style={{
                  width: '100%',
                  height: '2px',
                  background: '#000',
                  transition: 'all 0.3s ease',
                  transform: isOpen ? 'translateY(8px) rotate(45deg)' : 'none'
                }} />
                <span style={{
                  width: '100%',
                  height: '2px',
                  background: '#000',
                  transition: 'opacity 0.3s ease',
                  opacity: isOpen ? 0 : 1
                }} />
                <span style={{
                  width: '100%',
                  height: '2px',
                  background: '#000',
                  transition: 'all 0.3s ease',
                  transform: isOpen ? 'translateY(-8px) rotate(-45deg)' : 'none'
                }} />
              </div>
            </button>
          ) : (
            <Link
              href="/home"
              aria-label={t('nav.back')}
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#000',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </Link>
          )}
        </div>

        {/* Floating Menu Dropdown */}
        <div
          id="contact-menu"
          aria-label="Contact menu"
          className={`floating-menu ${isOpen ? 'is-open' : ''}`}
        >
          {/* Navigation Links */}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <li>
              <Link
                href="/work"
                style={{ fontSize: '1.8rem', fontWeight: 800, color: '#000', letterSpacing: '-0.02em', textDecoration: 'none' }}
                onClick={() => setIsOpen(false)}
              >
                {t('nav.work')}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                style={{ fontSize: '1.8rem', fontWeight: 800, color: '#000', letterSpacing: '-0.02em', textDecoration: 'none' }}
                onClick={() => setIsOpen(false)}
              >
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <a
                href="https://drive.google.com/drive/folders/1uxyglnsnpw3eLQLCb_xpqVoffd-lLT3I"
                target="_blank"
                rel="noreferrer noopener"
                style={{ fontSize: '1.8rem', fontWeight: 800, color: '#000', letterSpacing: '-0.02em', textDecoration: 'none' }}
                onClick={() => setIsOpen(false)}
              >
                Resume
              </a>
            </li>
          </ul>

          {/* Contact Section */}
          <div style={{ marginTop: '0.2rem' }}>
            <span style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#888',
              marginBottom: '0.5rem'
            }}>
              {t('nav.say_hello')}
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <a href="mailto:pedro16hf@gmail.com" className="menu-email" style={{ fontSize: '1rem', color: '#6b17e6', fontWeight: 500, textDecoration: 'none' }}>
                  pedro16hf@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            gap: '1.2rem',
            borderTop: '1px solid #eee',
            paddingTop: '1.5rem',
            marginTop: '0.5rem'
          }}>
            <li>
              <a href="https://github.com/initpedro/" target="_blank" rel="noreferrer noopener" style={{ color: '#000', opacity: 0.7 }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/initpedro/" target="_blank" rel="noreferrer noopener" style={{ color: '#000', opacity: 0.7 }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/initpedro/" target="_blank" rel="noreferrer noopener" style={{ color: '#000', opacity: 0.7 }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </li>
          </ul>

          {/* Legal Links (Secondary) */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            fontSize: '0.8rem',
            opacity: 0.6,
            marginTop: '1.5rem'
          }}>
            <Link href="/cookies" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>Cookies</Link>
            <Link href="/terms" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>Terms</Link>
            <Link href="/privacy" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>Privacy</Link>
          </div>
        </div>
      </nav>

      {/* Sidebar Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.02)',
          zIndex: 80,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'opacity 0.4s ease'
        }}
      />
    </>
  );
}
