import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CompanionSelect = () => {
  const [hoveredCompanion, setHoveredCompanion] = useState(null);

  /* ── Mood Bloom Color Map ── */
  const bloomColorMap = {
    jen: '#4A0E0E',
    red: '#5A1010',
    lyn: '#1B261B',
    holi: '#4A0E0E',
    vivian: '#2C3E50',
  };

  const activeBloomColor = hoveredCompanion
    ? bloomColorMap[hoveredCompanion] || '#1B261B'
    : '#1B261B';

  /* ── Companion Data ── */
  const companions = [
    { id: 'red', name: 'Red', archetype: 'The Wildfire', img: '/profile/nysa1.jpg' },
    { id: 'lyn', name: 'Lyn', archetype: 'The Slow Burn', img: '/profile/nysa2.jpg' },
    { id: 'holi', name: 'Holi', archetype: 'The Muse', img: '/profile/nysa3.jpg', active: true },
    { id: 'vivian', name: 'Vivian', archetype: 'The Mirror', img: '/profile/nysa1.jpg' },
  ];

  const groupChats = [
    {
      id: 'gc1',
      title: 'Jess & Emma',
      companionCount: 2,
      time: '11:42 pm',
      unread: 3,
      avatars: ['/profile/nysa2.jpg', '/profile/nysa3.jpg'],
    },
    {
      id: 'gc2',
      title: 'Lyn & Red',
      companionCount: 2,
      time: 'Yesterday',
      unread: 0,
      avatars: ['/profile/nysa2.jpg', '/profile/nysa1.jpg'],
    },
  ];

  /* ── Animation Variants ── */
  const pageTransition = {
    initial: { opacity: 0, filter: 'blur(12px)' },
    animate: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      filter: 'blur(12px)',
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const heroVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
    },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.1, delayChildren: 0.5 },
    },
  };

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const sectionFade = {
    initial: { opacity: 0, y: 18 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.8 },
    },
  };

  return (
    <motion.div
      className="atm-select-page"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ==================== KEYFRAMES ==================== */

        @keyframes atm-select-breathe {
          0%, 100% { transform: scale(1); opacity: 0.10; }
          50% { transform: scale(1.06); opacity: 0.14; }
        }

        @keyframes atm-select-breathe-alt {
          0%, 100% { transform: scale(1.02); opacity: 0.08; }
          50% { transform: scale(0.96); opacity: 0.12; }
        }

        @keyframes atm-select-bloom-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(12px, -8px) scale(1.03); }
          66% { transform: translate(-6px, 5px) scale(0.97); }
        }

        @keyframes atm-select-bloom-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-10px, 12px) scale(1.04); }
          70% { transform: translate(6px, -4px) scale(0.96); }
        }

        @keyframes atm-select-bloom-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          35% { transform: translate(8px, 10px) scale(1.02); }
          65% { transform: translate(-8px, -6px) scale(0.98); }
        }

        @keyframes atm-select-status-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.35); }
        }

        @keyframes atm-select-orb-breathe {
          0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(205, 127, 50, 0.04); }
          50% { transform: scale(1.015); box-shadow: 0 0 60px rgba(205, 127, 50, 0.08); }
        }

        @keyframes atm-select-shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }

        @keyframes atm-select-pip-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        /* ==================== PAGE ==================== */

        .atm-select-page {
          position: relative;
          min-height: 100vh;
          width: 100%;
          background: #0D0F0D;
          overflow-x: hidden;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* ==================== LAYER 1: MOOD BLOOMS ==================== */

        .atm-select-bloom-layer {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .atm-select-bloom {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          transition: background 1.5s ease-in-out, opacity 1.5s ease-in-out;
        }

        .atm-select-bloom--1 {
          width: 420px;
          height: 420px;
          top: -5%;
          left: 15%;
          filter: blur(120px);
          animation: atm-select-breathe 4s ease-in-out infinite, atm-select-bloom-drift-1 20s ease-in-out infinite;
        }

        .atm-select-bloom--2 {
          width: 500px;
          height: 500px;
          top: 30%;
          right: -8%;
          filter: blur(140px);
          animation: atm-select-breathe-alt 4s ease-in-out infinite 1s, atm-select-bloom-drift-2 24s ease-in-out infinite;
        }

        .atm-select-bloom--3 {
          width: 380px;
          height: 380px;
          bottom: 5%;
          left: -5%;
          filter: blur(110px);
          animation: atm-select-breathe 4s ease-in-out infinite 2s, atm-select-bloom-drift-3 18s ease-in-out infinite;
        }

        .atm-select-bloom--4 {
          width: 340px;
          height: 340px;
          top: 55%;
          left: 45%;
          filter: blur(130px);
          animation: atm-select-breathe-alt 4s ease-in-out infinite 0.5s, atm-select-bloom-drift-1 22s ease-in-out infinite;
        }

        /* ==================== HEADER ==================== */

        .atm-select-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 28px;
          background: rgba(13, 15, 13, 0.6);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 0.5px solid rgba(205, 127, 50, 0.12);
        }

        .atm-select-header-back {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: rgba(205, 127, 50, 0.55);
          transition: color 0.4s ease, transform 0.3s ease;
        }

        .atm-select-header-back:hover {
          color: rgba(205, 127, 50, 0.9);
          transform: translateX(-2px);
        }

        .atm-select-header-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .atm-select-brand-logo {
          height: 22px;
          width: 22px;
          object-fit: contain;
          opacity: 0.85;
        }

        .atm-select-brand-text {
          display: inline-flex;
          align-items: baseline;
          gap: 4px;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          line-height: 1;
        }

        .atm-select-brand-nysa {
          font-size: 18px;
          color: #F2F4F2;
          letter-spacing: 0.15em;
        }

        .atm-select-brand-flow {
          font-size: 18px;
          color: #CD7F32;
          font-style: italic;
          letter-spacing: 0.04em;
        }

        .atm-select-header-menu {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 6px;
          transition: opacity 0.3s;
        }

        .atm-select-header-menu:hover {
          opacity: 0.7;
        }

        .atm-select-header-menu span {
          display: block;
          width: 20px;
          height: 1px;
          background: rgba(205, 127, 50, 0.5);
          transition: background 0.3s;
        }

        .atm-select-header-menu:hover span {
          background: rgba(205, 127, 50, 0.85);
        }

        /* ==================== CONTENT WRAPPER ==================== */

        .atm-select-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 680px;
          padding: 88px 24px 80px;
          display: flex;
          flex-direction: column;
        }

        /* ==================== HERO — PRIMARY COMPANION ==================== */

        .atm-select-hero {
          position: relative;
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 36px;
          cursor: pointer;
          animation: atm-select-orb-breathe 4s ease-in-out infinite;
          border: 0.5px solid rgba(205, 127, 50, 0.15);
        }

        .atm-select-hero-img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          display: block;
          filter: brightness(0.75) saturate(0.9);
          transition: filter 0.6s ease, transform 0.6s ease;
        }

        .atm-select-hero:hover .atm-select-hero-img {
          filter: brightness(0.85) saturate(1);
          transform: scale(1.02);
        }

        .atm-select-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(13, 15, 13, 0.15) 0%,
            rgba(13, 15, 13, 0.0) 30%,
            rgba(13, 15, 13, 0.5) 65%,
            rgba(13, 15, 13, 0.92) 100%
          );
          pointer-events: none;
        }

        .atm-select-hero-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .atm-select-hero-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(205, 127, 50, 0.6);
        }

        .atm-select-hero-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #CD7F32;
          animation: atm-select-status-pulse 2.5s ease-in-out infinite;
        }

        .atm-select-hero-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: 56px;
          color: #F2F4F2;
          letter-spacing: 0.02em;
          line-height: 1.05;
        }

        .atm-select-hero-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: 16px;
          color: rgba(242, 244, 242, 0.5);
          letter-spacing: 0.03em;
          margin-top: 2px;
        }

        .atm-select-hero-pip {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #CD7F32;
          box-shadow: 0 0 12px rgba(205, 127, 50, 0.5);
          animation: atm-select-pip-pulse 2s ease-in-out infinite;
        }

        .atm-select-hero-pip-label {
          position: absolute;
          top: 22px;
          right: 42px;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(205, 127, 50, 0.5);
        }

        /* ==================== SECTION LABELS ==================== */

        .atm-select-section-label {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(205, 127, 50, 0.45);
          margin-bottom: 18px;
          padding-left: 4px;
        }

        /* ==================== COMPANION SWITCHER ROW ==================== */

        .atm-select-companions-section {
          margin-bottom: 44px;
        }

        .atm-select-companions-row {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .atm-select-companions-row::-webkit-scrollbar {
          display: none;
        }

        .atm-select-companion-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          text-decoration: none;
          flex-shrink: 0;
          transition: transform 0.4s ease;
        }

        .atm-select-companion-card:hover {
          transform: translateY(-3px);
        }

        .atm-select-companion-orb-wrap {
          position: relative;
          width: 72px;
          height: 72px;
        }

        .atm-select-companion-orb-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 0.5px solid rgba(205, 127, 50, 0.2);
          transition: border-color 0.5s ease, box-shadow 0.5s ease;
          pointer-events: none;
        }

        .atm-select-companion-card:hover .atm-select-companion-orb-ring {
          border-color: rgba(205, 127, 50, 0.5);
          box-shadow: 0 0 20px rgba(205, 127, 50, 0.08);
        }

        .atm-select-companion-card--active .atm-select-companion-orb-ring {
          border-color: rgba(205, 127, 50, 0.45);
          box-shadow: 0 0 24px rgba(205, 127, 50, 0.1);
        }

        .atm-select-companion-orb-img {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          filter: brightness(0.8) saturate(0.85);
          transition: filter 0.5s ease;
        }

        .atm-select-companion-card:hover .atm-select-companion-orb-img,
        .atm-select-companion-card--active .atm-select-companion-orb-img {
          filter: brightness(0.95) saturate(1);
        }

        .atm-select-companion-orb-mask {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle, transparent 50%, rgba(13, 15, 13, 0.2) 70%, rgba(13, 15, 13, 0.5) 100%);
          pointer-events: none;
        }

        .atm-select-companion-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: 14px;
          color: rgba(242, 244, 242, 0.7);
          letter-spacing: 0.03em;
          text-align: center;
          transition: color 0.4s ease;
        }

        .atm-select-companion-card:hover .atm-select-companion-name,
        .atm-select-companion-card--active .atm-select-companion-name {
          color: #F2F4F2;
        }

        .atm-select-companion-archetype {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(205, 127, 50, 0.35);
          text-align: center;
          margin-top: -4px;
          transition: color 0.4s ease;
        }

        .atm-select-companion-card:hover .atm-select-companion-archetype,
        .atm-select-companion-card--active .atm-select-companion-archetype {
          color: rgba(205, 127, 50, 0.65);
        }

        /* Discover (+) Button */
        .atm-select-discover-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          text-decoration: none;
          flex-shrink: 0;
          transition: transform 0.4s ease;
        }

        .atm-select-discover-btn:hover {
          transform: translateY(-3px);
        }

        .atm-select-discover-orb {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 0.5px dashed rgba(205, 127, 50, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.4s ease, background 0.4s ease;
          background: rgba(27, 38, 27, 0.15);
        }

        .atm-select-discover-btn:hover .atm-select-discover-orb {
          border-color: rgba(205, 127, 50, 0.5);
          background: rgba(27, 38, 27, 0.3);
        }

        .atm-select-discover-plus {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 28px;
          color: rgba(205, 127, 50, 0.35);
          line-height: 1;
          transition: color 0.4s ease;
        }

        .atm-select-discover-btn:hover .atm-select-discover-plus {
          color: rgba(205, 127, 50, 0.7);
        }

        .atm-select-discover-label {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(205, 127, 50, 0.3);
          transition: color 0.4s ease;
        }

        .atm-select-discover-btn:hover .atm-select-discover-label {
          color: rgba(205, 127, 50, 0.6);
        }

        /* ==================== GROUP CHATS ==================== */

        .atm-select-groups-section {
          margin-bottom: 44px;
        }

        .atm-select-groups-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .atm-select-group-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          border-radius: 16px;
          background: rgba(27, 38, 27, 0.12);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 0.5px solid rgba(205, 127, 50, 0.1);
          cursor: pointer;
          text-decoration: none;
          transition: background 0.4s ease, border-color 0.4s ease, transform 0.3s ease;
        }

        .atm-select-group-card:hover {
          background: rgba(27, 38, 27, 0.22);
          border-color: rgba(205, 127, 50, 0.25);
          transform: translateY(-1px);
        }

        .atm-select-group-avatars {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .atm-select-group-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid #0D0F0D;
          filter: brightness(0.85) saturate(0.9);
        }

        .atm-select-group-avatar + .atm-select-group-avatar {
          margin-left: -12px;
        }

        .atm-select-group-info {
          flex: 1;
          min-width: 0;
        }

        .atm-select-group-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: 17px;
          color: #F2F4F2;
          letter-spacing: 0.02em;
          margin-bottom: 3px;
        }

        .atm-select-group-meta {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 11px;
          color: rgba(242, 244, 242, 0.35);
          letter-spacing: 0.04em;
        }

        .atm-select-group-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          flex-shrink: 0;
        }

        .atm-select-group-time {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 10px;
          color: rgba(242, 244, 242, 0.3);
          letter-spacing: 0.04em;
        }

        .atm-select-group-unread {
          min-width: 20px;
          height: 20px;
          border-radius: 10px;
          background: rgba(205, 127, 50, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 10px;
          color: #0D0F0D;
          padding: 0 6px;
        }

        /* ==================== DIVIDER ==================== */

        .atm-select-divider {
          width: 100%;
          height: 0.5px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(205, 127, 50, 0.15) 20%,
            rgba(205, 127, 50, 0.15) 80%,
            transparent 100%
          );
          margin: 8px 0 36px;
        }

        /* ==================== RESPONSIVE ==================== */

        @media (max-width: 480px) {
          .atm-select-content {
            padding: 80px 18px 60px;
          }

          .atm-select-hero-img {
            height: 340px;
          }

          .atm-select-hero-name {
            font-size: 44px;
          }

          .atm-select-companion-orb-wrap {
            width: 62px;
            height: 62px;
          }

          .atm-select-companion-orb-img {
            width: 62px;
            height: 62px;
          }

          .atm-select-discover-orb {
            width: 62px;
            height: 62px;
          }
        }
      `}</style>

      {/* ── Layer 1: Mood Blooms ── */}
      <div className="atm-select-bloom-layer">
        <motion.div
          className="atm-select-bloom atm-select-bloom--1"
          animate={{ scale: [1, 1.06, 1], opacity: [0.1, 0.14, 0.1] }}
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
          style={{
            background: `radial-gradient(circle, ${activeBloomColor} 0%, transparent 70%)`,
            transition: 'background 1.5s ease-in-out',
          }}
        />
        <motion.div
          className="atm-select-bloom atm-select-bloom--2"
          animate={{ scale: [1.02, 0.96, 1.02], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
          style={{
            background: `radial-gradient(circle, ${activeBloomColor} 0%, transparent 70%)`,
            transition: 'background 1.5s ease-in-out',
          }}
        />
        <motion.div
          className="atm-select-bloom atm-select-bloom--3"
          animate={{ scale: [1, 1.04, 1], opacity: [0.1, 0.13, 0.1] }}
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
          style={{
            background: `radial-gradient(circle, ${activeBloomColor} 0%, transparent 70%)`,
            transition: 'background 1.5s ease-in-out',
          }}
        />
        <motion.div
          className="atm-select-bloom atm-select-bloom--4"
          animate={{ scale: [1, 0.97, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, delay: 0.5 }}
          style={{
            background: `radial-gradient(circle, ${activeBloomColor} 0%, transparent 70%)`,
            transition: 'background 1.5s ease-in-out',
          }}
        />
      </div>

      {/* ── Header ── */}
      <header className="atm-select-header">
        <Link to="/home" className="atm-select-header-back">
          <span style={{ fontSize: '14px', transition: 'transform 0.3s' }}>&#8592;</span>
          <span>Back</span>
        </Link>

        <Link to="/home" className="atm-select-header-brand">
          <img
            src="/Logos/nysa-logo.svg.png"
            alt="NySa"
            className="atm-select-brand-logo"
          />
          <span className="atm-select-brand-text">
            <span className="atm-select-brand-nysa">NySa</span>
            <span className="atm-select-brand-flow">FloW</span>
          </span>
        </Link>

        <button className="atm-select-header-menu" aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* ── Main Content ── */}
      <div className="atm-select-content">

        {/* ── Hero: Primary Companion ── */}
        <motion.div variants={heroVariants} initial="initial" animate="animate">
          <Link
            to="/profile"
            style={{ textDecoration: 'none', display: 'block' }}
            onMouseEnter={() => setHoveredCompanion('jen')}
            onMouseLeave={() => setHoveredCompanion(null)}
          >
            <div className="atm-select-hero">
              <img
                src="/profile/nysa3.jpg"
                alt="Jen"
                className="atm-select-hero-img"
              />
              <div className="atm-select-hero-overlay" />

              {/* New message pip */}
              <span className="atm-select-hero-pip-label">New</span>
              <span className="atm-select-hero-pip" />

              <div className="atm-select-hero-content">
                <div className="atm-select-hero-status">
                  <span className="atm-select-hero-status-dot" />
                  <span>Thinking about you</span>
                </div>
                <h1 className="atm-select-hero-name">Jen</h1>
                <p className="atm-select-hero-tagline">
                  Expressive, flirt-forward, and hard to ignore.
                </p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ── Companion Switcher ── */}
        <motion.div
          className="atm-select-companions-section"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="atm-select-section-label">YOUR COMPANIONS</div>
          <div className="atm-select-companions-row">
            {companions.map((c) => (
              <motion.div key={c.id} variants={fadeUp}>
                <Link
                  to="/profile"
                  className={`atm-select-companion-card${c.active ? ' atm-select-companion-card--active' : ''}`}
                  onMouseEnter={() => setHoveredCompanion(c.id)}
                  onMouseLeave={() => setHoveredCompanion(null)}
                >
                  <div className="atm-select-companion-orb-wrap">
                    <div className="atm-select-companion-orb-ring" />
                    <img
                      src={c.img}
                      alt={c.name}
                      className="atm-select-companion-orb-img"
                    />
                    <div className="atm-select-companion-orb-mask" />
                  </div>
                  <span className="atm-select-companion-name">{c.name}</span>
                  <span className="atm-select-companion-archetype">{c.archetype}</span>
                </Link>
              </motion.div>
            ))}

            {/* Discover Button */}
            <motion.div variants={fadeUp}>
              <Link to="/profile" className="atm-select-discover-btn">
                <div className="atm-select-discover-orb">
                  <span className="atm-select-discover-plus">+</span>
                </div>
                <span className="atm-select-discover-label">Discover</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="atm-select-divider" />

        {/* ── Group Chats ── */}
        <motion.div
          className="atm-select-groups-section"
          variants={sectionFade}
          initial="initial"
          animate="animate"
        >
          <div className="atm-select-section-label">GROUP CHATS</div>
          <div className="atm-select-groups-list">
            {groupChats.map((gc) => (
              <Link key={gc.id} to="/chat" className="atm-select-group-card">
                <div className="atm-select-group-avatars">
                  {gc.avatars.map((av, i) => (
                    <img
                      key={i}
                      src={av}
                      alt=""
                      className="atm-select-group-avatar"
                    />
                  ))}
                </div>
                <div className="atm-select-group-info">
                  <div className="atm-select-group-title">{gc.title}</div>
                  <div className="atm-select-group-meta">
                    {gc.companionCount} companions
                  </div>
                </div>
                <div className="atm-select-group-right">
                  <span className="atm-select-group-time">{gc.time}</span>
                  {gc.unread > 0 && (
                    <span className="atm-select-group-unread">{gc.unread}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CompanionSelect;
