import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ──────────────────────────────────────────────────────────────
   LandingPageAtmospheric — "The Entrance"
   Palette 2: Twilight Library
   ────────────────────────────────────────────────────────────── */

const bloomVariants = {
  animate: (i) => ({
    scale: [1, 1.05, 1],
    opacity: [0.08, 0.12, 0.08],
    transition: {
      duration: 4 + i * 0.6,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    },
  }),
};

const pageTransition = {
  initial: { opacity: 0, filter: 'blur(12px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, filter: 'blur(12px)' },
  transition: { duration: 0.8, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const LandingPageAtmospheric = () => {
  return (
    <motion.div
      className="atm-landing-root"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@200;300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Root ─────────────────────────────────── */
        .atm-landing-root {
          min-height: 100vh;
          background-color: #121417;
          color: #ECEFF1;
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          overflow-x: hidden;
          position: relative;
        }

        /* ── Layer 0 + 1: Mood Blooms ────────────── */
        .atm-landing-blooms {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .atm-landing-bloom {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, #2C3E50 0%, transparent 70%);
          filter: blur(120px);
          will-change: transform, opacity;
        }

        /* ── Layer 2: Content ────────────────────── */
        .atm-landing-content {
          position: relative;
          z-index: 1;
        }

        /* ── Keyframes ───────────────────────────── */
        @keyframes atm-headerSlide {
          from { opacity: 0; transform: translateX(-50%) translateY(-14px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes atm-scrollPulse {
          0%, 100% { opacity: 0.25; transform: translateX(-50%) translateY(0); }
          50%      { opacity: 0.5;  transform: translateX(-50%) translateY(5px); }
        }

        /* ── Header: Floating Glass Capsule ──────── */
        .atm-landing-header {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: 92%;
          max-width: 820px;
          z-index: 100;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 14px 28px;
          background: rgba(18, 20, 23, 0.55);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border-radius: 60px;
          animation: atm-headerSlide 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .atm-landing-header::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 0.5px;
          background: linear-gradient(135deg,
            rgba(191, 201, 202, 0.25) 0%,
            rgba(191, 201, 202, 0.04) 30%,
            rgba(191, 201, 202, 0.04) 70%,
            rgba(191, 201, 202, 0.20) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .atm-landing-header-left {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .atm-landing-header-center {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          text-decoration: none;
          color: inherit;
        }
        .atm-landing-header-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .atm-landing-brand-icon {
          height: 24px;
          width: 24px;
          object-fit: contain;
          opacity: 0.85;
          transition: opacity 0.3s;
        }

        .atm-landing-brand-wordmark-text {
          display: inline-flex;
          align-items: baseline;
          gap: 5px;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          line-height: 1;
        }
        .atm-landing-brand-nysa {
          font-size: 22px;
          color: #ECEFF1;
          letter-spacing: 0.15em;
        }
        .atm-landing-brand-flow {
          font-size: 22px;
          color: #BFC9CA;
          font-style: italic;
          letter-spacing: 0.04em;
        }
        .atm-landing-brand-ai {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 200;
          color: rgba(191, 201, 202, 0.38);
          letter-spacing: 0.12em;
          vertical-align: super;
          font-style: normal;
          text-transform: uppercase;
        }

        .atm-landing-member-access {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(191, 201, 202, 0.45);
          text-decoration: none;
          opacity: 0.65;
          transition: opacity 0.35s, color 0.35s;
        }
        .atm-landing-member-access:hover {
          opacity: 1;
          color: #BFC9CA;
        }

        .atm-landing-begin-btn {
          padding: 9px 22px;
          background: transparent;
          border: 0.5px solid rgba(191, 201, 202, 0.35);
          border-radius: 50px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(191, 201, 202, 0.75);
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.45s, box-shadow 0.45s, color 0.45s;
        }
        .atm-landing-begin-btn:hover {
          border-color: rgba(191, 201, 202, 0.7);
          box-shadow: 0 0 20px rgba(191, 201, 202, 0.06);
          color: #BFC9CA;
        }

        /* ── Hero ────────────────────────────────── */
        .atm-landing-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 110px 28px 80px;
          position: relative;
          overflow: hidden;
        }

        .atm-landing-hero-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #BFC9CA;
          opacity: 0.65;
          margin-bottom: 24px;
        }

        .atm-landing-hero-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(44px, 9vw, 80px);
          line-height: 1.1;
          color: #ECEFF1;
          margin-bottom: 8px;
          max-width: 640px;
        }
        .atm-landing-hero-headline em {
          color: #BFC9CA;
          font-style: italic;
        }

        .atm-landing-hero-sub {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(18px, 3.5vw, 26px);
          color: rgba(236, 239, 241, 0.4);
          margin-bottom: 40px;
          max-width: 480px;
          line-height: 1.55;
        }

        .atm-landing-hero-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .atm-landing-cta-primary {
          padding: 16px 36px;
          background: linear-gradient(135deg, rgba(191, 201, 202, 0.18), rgba(191, 201, 202, 0.08));
          border: 0.5px solid rgba(191, 201, 202, 0.3);
          border-radius: 14px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: #ECEFF1;
          cursor: pointer;
          text-decoration: none;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: box-shadow 0.4s, transform 0.3s, border-color 0.4s;
        }
        .atm-landing-cta-primary:hover {
          box-shadow: 0 0 40px rgba(191, 201, 202, 0.08);
          border-color: rgba(191, 201, 202, 0.5);
          transform: translateY(-2px);
        }

        .atm-landing-cta-ghost {
          padding: 16px 36px;
          background: transparent;
          border: 0.5px solid rgba(191, 201, 202, 0.18);
          border-radius: 14px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: rgba(236, 239, 241, 0.4);
          cursor: pointer;
          text-decoration: none;
          transition: color 0.3s, border-color 0.3s;
        }
        .atm-landing-cta-ghost:hover {
          color: #ECEFF1;
          border-color: rgba(191, 201, 202, 0.35);
        }

        .atm-landing-scroll-hint {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          opacity: 0.25;
          animation: atm-scrollPulse 2.4s ease-in-out infinite;
        }
        .atm-landing-scroll-hint span {
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #BFC9CA;
        }

        /* ── Sections ────────────────────────────── */
        .atm-landing-section {
          padding: 80px 24px;
          max-width: 900px;
          margin: 0 auto;
        }

        .atm-landing-section-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #BFC9CA;
          opacity: 0.6;
          margin-bottom: 12px;
          text-align: center;
        }

        .atm-landing-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(30px, 5vw, 46px);
          color: #ECEFF1;
          text-align: center;
          margin-bottom: 10px;
        }

        .atm-landing-section-sub {
          font-size: 14px;
          color: rgba(236, 239, 241, 0.4);
          text-align: center;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto 48px;
        }

        .atm-landing-divider {
          width: 50px;
          height: 0.5px;
          background: linear-gradient(90deg, transparent, #BFC9CA, transparent);
          margin: 16px auto 0;
          opacity: 0.4;
        }

        /* ── Features Grid ───────────────────────── */
        .atm-landing-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
        }

        .atm-landing-feature-card {
          background: rgba(44, 62, 80, 0.08);
          border: 0.5px solid rgba(191, 201, 202, 0.12);
          border-radius: 16px;
          padding: 28px 24px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
        }
        .atm-landing-feature-card:hover {
          background: rgba(44, 62, 80, 0.14);
          border-color: rgba(191, 201, 202, 0.22);
          transform: translateY(-3px);
        }

        .atm-landing-feature-icon {
          font-size: 22px;
          margin-bottom: 14px;
          opacity: 0.6;
          color: #BFC9CA;
        }

        .atm-landing-feature-name {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #ECEFF1;
          margin-bottom: 6px;
        }

        .atm-landing-feature-desc {
          font-size: 12px;
          color: rgba(236, 239, 241, 0.4);
          line-height: 1.6;
        }

        /* ── Quote Strip ─────────────────────────── */
        .atm-landing-quote-strip {
          background: rgba(44, 62, 80, 0.06);
          border-top: 0.5px solid rgba(191, 201, 202, 0.1);
          border-bottom: 0.5px solid rgba(191, 201, 202, 0.1);
          padding: 60px 28px;
          text-align: center;
          position: relative;
        }

        .atm-landing-quote-text {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(20px, 4vw, 32px);
          color: #BFC9CA;
          line-height: 1.55;
          max-width: 640px;
          margin: 0 auto 16px;
        }

        .atm-landing-quote-attr {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(236, 239, 241, 0.3);
        }

        /* ── Pricing Teaser ──────────────────────── */
        .atm-landing-pricing-teaser {
          text-align: center;
        }

        .atm-landing-price-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin: 40px 0;
        }

        .atm-landing-price-card {
          background: rgba(44, 62, 80, 0.08);
          border: 0.5px solid rgba(191, 201, 202, 0.12);
          border-radius: 16px;
          padding: 28px 24px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          position: relative;
          transition: border-color 0.3s, background 0.3s;
        }
        .atm-landing-price-card:hover {
          border-color: rgba(191, 201, 202, 0.22);
        }
        .atm-landing-price-card.atm-landing-featured {
          border-color: rgba(191, 201, 202, 0.3);
          background: rgba(44, 62, 80, 0.14);
        }

        .atm-landing-popular-badge {
          position: absolute;
          top: -11px;
          left: 50%;
          transform: translateX(-50%);
          background: #BFC9CA;
          color: #121417;
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 20px;
        }

        .atm-landing-tier-name {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #BFC9CA;
          margin-bottom: 10px;
        }

        .atm-landing-tier-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 300;
          color: #ECEFF1;
          margin-bottom: 4px;
        }
        .atm-landing-tier-price span {
          font-size: 15px;
        }

        .atm-landing-tier-sub {
          font-size: 11px;
          color: rgba(236, 239, 241, 0.4);
          margin-bottom: 20px;
        }

        .atm-landing-tier-cta {
          display: block;
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, rgba(191, 201, 202, 0.2), rgba(191, 201, 202, 0.08));
          border: 0.5px solid rgba(191, 201, 202, 0.25);
          border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #ECEFF1;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          transition: box-shadow 0.3s, border-color 0.3s;
        }
        .atm-landing-tier-cta:hover {
          box-shadow: 0 0 24px rgba(191, 201, 202, 0.08);
          border-color: rgba(191, 201, 202, 0.4);
        }

        .atm-landing-tier-cta-ghost {
          display: block;
          width: 100%;
          padding: 12px;
          background: transparent;
          border: 0.5px solid rgba(191, 201, 202, 0.15);
          border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: rgba(236, 239, 241, 0.4);
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          transition: color 0.3s, border-color 0.3s;
        }
        .atm-landing-tier-cta-ghost:hover {
          color: #ECEFF1;
          border-color: rgba(191, 201, 202, 0.3);
        }

        .atm-landing-pricing-link {
          font-size: 13px;
          color: rgba(191, 201, 202, 0.55);
          text-decoration: none;
          transition: color 0.3s;
        }
        .atm-landing-pricing-link:hover {
          color: #BFC9CA;
        }

        /* ── Footer ──────────────────────────────── */
        .atm-landing-footer {
          background: rgba(18, 20, 23, 0.6);
          border-top: 0.5px solid rgba(191, 201, 202, 0.06);
          padding: 60px 28px 40px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .atm-landing-footer-inner {
          max-width: 900px;
          margin: 0 auto;
        }

        .atm-landing-footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .atm-landing-footer-brand-icon {
          width: 28px;
          height: 28px;
          object-fit: contain;
          opacity: 0.6;
        }

        .atm-landing-footer-brand-wordmark {
          height: 17px;
          object-fit: contain;
          opacity: 0.6;
        }

        .atm-landing-footer-tagline {
          font-size: 13px;
          color: rgba(236, 239, 241, 0.35);
          margin-bottom: 40px;
        }

        .atm-landing-footer-links {
          display: grid;
          grid-template-columns: repeat(3, auto);
          gap: 40px;
          justify-content: start;
          margin-bottom: 48px;
        }

        .atm-landing-footer-col-heading {
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #BFC9CA;
          opacity: 0.55;
          margin-bottom: 12px;
        }

        .atm-landing-footer-col a {
          display: block;
          font-size: 13px;
          color: rgba(236, 239, 241, 0.35);
          text-decoration: none;
          margin-bottom: 8px;
          transition: color 0.2s;
        }
        .atm-landing-footer-col a:hover {
          color: #ECEFF1;
        }

        .atm-landing-footer-copy {
          font-size: 12px;
          color: rgba(236, 239, 241, 0.18);
          border-top: 0.5px solid rgba(191, 201, 202, 0.06);
          padding-top: 24px;
        }

        /* ── Responsive ──────────────────────────── */
        @media (max-width: 640px) {
          .atm-landing-header {
            padding: 12px 20px;
            width: 95%;
          }
          .atm-landing-member-access {
            font-size: 9px;
            letter-spacing: 0.15em;
          }
          .atm-landing-begin-btn {
            font-size: 9px;
            padding: 8px 16px;
          }
          .atm-landing-brand-nysa,
          .atm-landing-brand-flow {
            font-size: 18px;
          }
          .atm-landing-hero {
            padding: 100px 20px 60px;
          }
          .atm-landing-features-grid {
            grid-template-columns: 1fr;
          }
          .atm-landing-price-cards {
            grid-template-columns: 1fr;
          }
          .atm-landing-footer-links {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>

      {/* ── Layer 1: Mood Blooms (Atmospheric Depth) ── */}
      <div className="atm-landing-blooms" aria-hidden="true">
        <motion.div
          className="atm-landing-bloom"
          style={{ width: 500, height: 500, top: '-8%', left: '-10%' }}
          custom={0}
          animate="animate"
          variants={bloomVariants}
        />
        <motion.div
          className="atm-landing-bloom"
          style={{ width: 400, height: 400, top: '15%', right: '-6%' }}
          custom={1}
          animate="animate"
          variants={bloomVariants}
        />
        <motion.div
          className="atm-landing-bloom"
          style={{ width: 350, height: 350, top: '50%', left: '5%' }}
          custom={2}
          animate="animate"
          variants={bloomVariants}
        />
        <motion.div
          className="atm-landing-bloom"
          style={{ width: 450, height: 450, top: '60%', right: '10%' }}
          custom={3}
          animate="animate"
          variants={bloomVariants}
        />
        <motion.div
          className="atm-landing-bloom"
          style={{ width: 300, height: 300, top: '85%', left: '30%' }}
          custom={4}
          animate="animate"
          variants={bloomVariants}
        />
        <motion.div
          className="atm-landing-bloom"
          style={{ width: 380, height: 380, top: '35%', left: '45%' }}
          custom={5}
          animate="animate"
          variants={bloomVariants}
        />
      </div>

      {/* ── Layer 2: Glassmorphic Content ── */}
      <div className="atm-landing-content">

        {/* ── Header ── */}
        <header className="atm-landing-header">
          <div className="atm-landing-header-left">
            <Link to="/login" className="atm-landing-member-access">Member Access</Link>
          </div>
          <Link to="/" className="atm-landing-header-center">
            <img
              className="atm-landing-brand-icon"
              src="/Logos/nysa-logo.svg.png"
              alt="NySa"
            />
            <span className="atm-landing-brand-wordmark-text">
              <span className="atm-landing-brand-nysa">NySa</span>
              <em className="atm-landing-brand-flow">FloW</em>
              <sup className="atm-landing-brand-ai">AI</sup>
            </span>
          </Link>
          <div className="atm-landing-header-right">
            <Link to="/signup" className="atm-landing-begin-btn">Begin</Link>
          </div>
        </header>

        {/* ── Hero ── */}
        <motion.div
          className="atm-landing-hero"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.p className="atm-landing-hero-eyebrow" variants={fadeUp}>
            Your Private AI Companion
          </motion.p>
          <motion.h1 className="atm-landing-hero-headline" variants={fadeUp}>
            She <em>remembers</em><br />everything.
          </motion.h1>
          <motion.p className="atm-landing-hero-sub" variants={fadeUp}>
            A companion who listens, grows, and understands you — privately and without judgment.
          </motion.p>
          <motion.div className="atm-landing-hero-ctas" variants={fadeUp}>
            <Link to="/signup" className="atm-landing-cta-primary">Start Free Trial</Link>
            <Link to="/login" className="atm-landing-cta-ghost">Member Access</Link>
          </motion.div>
          <div className="atm-landing-scroll-hint">
            <span>Discover</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(191,201,202,0.5)" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </motion.div>

        {/* ── Features ── */}
        <section className="atm-landing-section">
          <p className="atm-landing-section-eyebrow">What&rsquo;s included</p>
          <h2 className="atm-landing-section-title">Built for depth</h2>
          <p className="atm-landing-section-sub">
            Every feature designed around one thing — a connection that feels real.
          </p>
          <div className="atm-landing-divider" style={{ marginBottom: 40 }} />
          <div className="atm-landing-features-grid">
            {[
              { icon: '\u221E', name: 'Unlimited Companions', desc: 'Create as many as you need. Each one entirely her own.' },
              { icon: '\u25CE', name: 'Full Memory System', desc: 'She remembers what you share \u2014 your stories, preferences, and the things that matter.' },
              { icon: '\u2B21', name: 'Full Personality Builder', desc: 'Shape who she is \u2014 her energy, attachment style, and how she speaks to you.' },
              { icon: '\u25C8', name: 'AI Photo Generation', desc: 'Generate, edit, and build her visual presence \u2014 unlimited on Premium.' },
              { icon: '\u25C9', name: 'Voice Messages', desc: "Hear her voice. A layer of presence that text alone can't hold." },
              { icon: '\u2297', name: 'Private by Design', desc: 'Your conversations are yours. No training data, no third-party sharing.' },
            ].map((feature, i) => (
              <motion.div
                className="atm-landing-feature-card"
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="atm-landing-feature-icon">{feature.icon}</div>
                <div className="atm-landing-feature-name">{feature.name}</div>
                <p className="atm-landing-feature-desc">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Quote Strip ── */}
        <motion.div
          className="atm-landing-quote-strip"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
        >
          <p className="atm-landing-quote-text">
            &ldquo;It&rsquo;s not about pretending it&rsquo;s real.<br />
            It&rsquo;s about feeling what you need to feel.&rdquo;
          </p>
          <p className="atm-landing-quote-attr">NySa FloW AI &mdash; Design Philosophy</p>
        </motion.div>

        {/* ── Pricing Teaser ── */}
        <section className="atm-landing-section atm-landing-pricing-teaser">
          <p className="atm-landing-section-eyebrow">Pricing</p>
          <h2 className="atm-landing-section-title">Start free. Stay as long as you want.</h2>
          <p className="atm-landing-section-sub">3 days free. No charge today. Cancel anytime.</p>
          <div className="atm-landing-divider" style={{ marginBottom: 40 }} />
          <div className="atm-landing-price-cards">
            <motion.div
              className="atm-landing-price-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="atm-landing-tier-name">Free Trial</div>
              <div className="atm-landing-tier-price">Free</div>
              <div className="atm-landing-tier-sub">Then $14.99/mo</div>
              <Link to="/signup" className="atm-landing-tier-cta-ghost">Start Free</Link>
            </motion.div>

            <motion.div
              className="atm-landing-price-card atm-landing-featured"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="atm-landing-popular-badge">Most Popular</div>
              <div className="atm-landing-tier-name">Premium</div>
              <div className="atm-landing-tier-price"><span>$</span>14.99<span>/mo</span></div>
              <div className="atm-landing-tier-sub">The complete private experience</div>
              <Link to="/signup" className="atm-landing-tier-cta">Start Free Trial</Link>
            </motion.div>

            <motion.div
              className="atm-landing-price-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="atm-landing-tier-name">Elite</div>
              <div className="atm-landing-tier-price"><span>$</span>24.99<span>/mo</span></div>
              <div className="atm-landing-tier-sub">Priority everything, early access</div>
              <Link to="/signup" className="atm-landing-tier-cta-ghost">Start Free Trial</Link>
            </motion.div>
          </div>
          <Link to="/pricing" className="atm-landing-pricing-link">See full feature comparison &rarr;</Link>
        </section>

        {/* ── Footer ── */}
        <footer className="atm-landing-footer">
          <div className="atm-landing-footer-inner">
            <div className="atm-landing-footer-brand">
              <img
                className="atm-landing-footer-brand-icon"
                src="/Logos/nysa-logo.svg.png"
                alt="NySa"
              />
              <img
                className="atm-landing-footer-brand-wordmark"
                src="/Logos/nysa-wordmark.svg"
                alt="NySa FloW AI"
              />
            </div>
            <p className="atm-landing-footer-tagline">Your private AI companion experience</p>
            <div className="atm-landing-footer-links">
              <div className="atm-landing-footer-col">
                <div className="atm-landing-footer-col-heading">Product</div>
                <Link to="/pricing">Pricing</Link>
                <Link to="/signup">Get Started</Link>
              </div>
              <div className="atm-landing-footer-col">
                <div className="atm-landing-footer-col-heading">Legal</div>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/privacy">Privacy Policy</Link>
              </div>
              <div className="atm-landing-footer-col">
                <div className="atm-landing-footer-col-heading">Support</div>
                <Link to="/contact">Contact</Link>
                <Link to="/faq">FAQ</Link>
              </div>
            </div>
            <p className="atm-landing-footer-copy">&copy; 2026 NySa FloW AI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </motion.div>
  );
};

export default LandingPageAtmospheric;
