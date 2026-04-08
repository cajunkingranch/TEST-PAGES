import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CompanionProfile = () => {
  const [bondPulse, setBondPulse] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    setHasEntered(true);
  }, []);

  const handleEnterConversation = () => {
    setBondPulse(true);
    setTimeout(() => setBondPulse(false), 1500);
  };

  const pageTransition = {
    initial: { opacity: 0, filter: 'blur(12px)' },
    animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, filter: 'blur(12px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const orbEntrance = {
    initial: { scale: 0.88, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const statsContainerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.6,
      },
    },
  };

  const statItemVariants = {
    initial: { opacity: 0, y: 18 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const fadeUpVariants = {
    initial: { opacity: 0, y: 14 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 },
    },
  };

  const bondTrailVariants = {
    initial: { opacity: 0, y: 14 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.9 },
    },
  };

  const ctaVariants = {
    initial: { opacity: 0, y: 14 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.1 },
    },
  };

  const stats = [
    { value: '47', label: 'Days Together' },
    { value: '312', label: 'Shared Moments' },
    { value: '18', label: 'Memories Held' },
  ];

  return (
    <motion.div
      className="atm-profile-page"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ==================== KEYFRAMES ==================== */

        @keyframes atm-profile-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        @keyframes atm-profile-glow-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes atm-profile-terminus-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        @keyframes atm-profile-shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }

        @keyframes atm-profile-bond-pulse-spread {
          0% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(0.2);
          }
          60% {
            opacity: 0.25;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(3.5);
          }
        }

        @keyframes atm-profile-bloom-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(8px, -6px) scale(1.02); }
          66% { transform: translate(-5px, 4px) scale(0.98); }
        }

        @keyframes atm-profile-bloom-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-6px, 8px) scale(1.03); }
          70% { transform: translate(4px, -3px) scale(0.97); }
        }

        @keyframes atm-profile-border-pulse {
          0%, 100% { border-color: rgba(197, 160, 125, 0.25); }
          50% { border-color: rgba(197, 160, 125, 0.55); }
        }

        /* ==================== PAGE ==================== */

        .atm-profile-page {
          position: relative;
          min-height: 100vh;
          width: 100%;
          background: #0D0C0B;
          background-image:
            radial-gradient(ellipse 80% 60% at 50% 20%, rgba(38,33,28,0.3) 0%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(38,33,28,0.2) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 80% 60%, rgba(197,160,125,0.04) 0%, transparent 50%);
          overflow-x: hidden;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ==================== LAYER 1: MOOD BLOOMS ==================== */

        .atm-profile-bloom {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .atm-profile-bloom--avatar {
          width: 420px;
          height: 420px;
          top: 8%;
          left: 50%;
          margin-left: -210px;
          background: radial-gradient(circle, rgba(38, 33, 28, 0.55) 0%, rgba(38, 33, 28, 0.25) 50%, transparent 70%);
          filter: blur(70px);
          opacity: 0.85;
          animation: atm-profile-bloom-drift-1 18s ease-in-out infinite;
        }

        .atm-profile-bloom--bottom {
          width: 500px;
          height: 500px;
          bottom: -8%;
          left: -6%;
          background: radial-gradient(circle, rgba(38, 33, 28, 0.5) 0%, rgba(38, 33, 28, 0.2) 50%, transparent 70%);
          filter: blur(75px);
          opacity: 0.8;
          animation: atm-profile-bloom-drift-2 22s ease-in-out infinite;
        }

        /* ==================== BOND PULSE OVERLAY ==================== */

        .atm-profile-bond-pulse-overlay {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 100vmax;
          height: 100vmax;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(197, 160, 125, 0.18) 0%, rgba(197, 160, 125, 0.04) 40%, transparent 70%);
          pointer-events: none;
          z-index: 50;
          animation: atm-profile-bond-pulse-spread 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        /* ==================== BACK LINK ==================== */

        .atm-profile-back {
          position: fixed;
          top: 36px;
          left: 40px;
          z-index: 100;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 13px;
          letter-spacing: 0.08em;
          color: rgba(197, 160, 125, 0.55);
          transition: color 0.4s ease, transform 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .atm-profile-back:hover {
          color: rgba(197, 160, 125, 0.9);
          transform: translateX(-3px);
        }

        .atm-profile-back-arrow {
          font-size: 15px;
          transition: transform 0.3s ease;
        }

        .atm-profile-back:hover .atm-profile-back-arrow {
          transform: translateX(-2px);
        }

        /* ==================== CONTENT WRAPPER ==================== */

        .atm-profile-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 620px;
          padding: 100px 32px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ==================== ORB SECTION ==================== */

        .atm-profile-orb-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 52px;
        }

        .atm-profile-orb-container {
          position: relative;
          width: 220px;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
        }

        /* Outer breathing ring */
        .atm-profile-orb-ring-outer {
          position: absolute;
          inset: -16px;
          border-radius: 50%;
          background: radial-gradient(circle, transparent 48%, rgba(197, 160, 125, 0.3) 58%, rgba(197, 160, 125, 0.15) 68%, transparent 78%);
          animation: atm-profile-breathe 4s ease-in-out infinite;
          pointer-events: none;
        }

        /* Mid glow ring */
        .atm-profile-orb-ring-mid {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background: radial-gradient(circle, transparent 52%, rgba(197, 160, 125, 0.32) 62%, rgba(197, 160, 125, 0.12) 72%, transparent 82%);
          animation: atm-profile-breathe 4s ease-in-out infinite 0.3s;
          pointer-events: none;
        }

        /* Inner orb */
        .atm-profile-orb-inner {
          position: relative;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 0 60px rgba(197, 160, 125, 0.25), 0 0 120px rgba(13, 12, 11, 0.8);
        }

        .atm-profile-orb-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Radial gradient mask — edges melt into obsidian */
        .atm-profile-orb-mask {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle, transparent 40%, rgba(13, 12, 11, 0.15) 58%, rgba(13, 12, 11, 0.55) 72%, #0D0C0B 92%);
          pointer-events: none;
        }

        /* ==================== TEXT BELOW ORB ==================== */

        .atm-profile-archetype {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #C5A07D;
          margin-bottom: 10px;
        }

        .atm-profile-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: 52px;
          color: #F9F7F2;
          letter-spacing: 0.02em;
          line-height: 1.1;
          margin-bottom: 8px;
        }

        .atm-profile-bond-status {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: 16px;
          color: rgba(197, 160, 125, 0.6);
          letter-spacing: 0.04em;
        }

        /* ==================== ATTRIBUTES ==================== */

        .atm-profile-attributes {
          text-align: center;
          max-width: 440px;
          margin-bottom: 56px;
          line-height: 2;
        }

        .atm-profile-attr-text {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: 15.5px;
          color: rgba(249, 247, 242, 0.5);
          letter-spacing: 0.03em;
        }

        .atm-profile-attr-dot {
          display: inline-block;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #C5A07D;
          vertical-align: middle;
          margin: 0 14px;
          opacity: 0.5;
        }

        /* ==================== STATS ==================== */

        .atm-profile-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin-bottom: 60px;
        }

        .atm-profile-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 36px;
        }

        .atm-profile-stat-separator {
          width: 1px;
          height: 36px;
          background: rgba(197, 160, 125, 0.15);
          flex-shrink: 0;
        }

        .atm-profile-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 38px;
          color: #F9F7F2;
          line-height: 1;
          margin-bottom: 6px;
          letter-spacing: 0.02em;
        }

        .atm-profile-stat-label {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(197, 160, 125, 0.65);
        }

        /* ==================== BOND DEPTH ==================== */

        .atm-profile-bond {
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 56px;
        }

        .atm-profile-bond-label {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(197, 160, 125, 0.65);
          margin-bottom: 14px;
        }

        .atm-profile-bond-state {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: 15px;
          color: rgba(197, 160, 125, 0.65);
          letter-spacing: 0.03em;
          margin-bottom: 24px;
          text-align: center;
        }

        /* The glowing trail */
        .atm-profile-bond-trail {
          position: relative;
          width: 100%;
          height: 3px;
          border-radius: 2px;
          background: rgba(197, 160, 125, 0.06);
          overflow: visible;
        }

        .atm-profile-bond-trail-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 63%;
          border-radius: 2px;
          background: linear-gradient(90deg, rgba(197, 160, 125, 0.15) 0%, rgba(197, 160, 125, 0.5) 70%, rgba(197, 160, 125, 0.7) 100%);
          box-shadow: 0 0 18px rgba(197, 160, 125, 0.25), 0 0 40px rgba(197, 160, 125, 0.12);
        }

        /* Blurred ambient glow behind the trail */
        .atm-profile-bond-trail-glow {
          position: absolute;
          top: -12px;
          left: 0;
          height: 27px;
          width: 63%;
          border-radius: 14px;
          background: linear-gradient(90deg, transparent 0%, rgba(197, 160, 125, 0.04) 30%, rgba(197, 160, 125, 0.08) 100%);
          filter: blur(10px);
          animation: atm-profile-glow-pulse 3.5s ease-in-out infinite;
          pointer-events: none;
        }

        /* Terminus glow dot */
        .atm-profile-bond-trail-terminus {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(50%, -50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(197, 160, 125, 0.7);
          box-shadow: 0 0 12px rgba(197, 160, 125, 0.4), 0 0 28px rgba(197, 160, 125, 0.15);
          animation: atm-profile-terminus-pulse 3s ease-in-out infinite;
        }

        /* ==================== CTA BUTTON ==================== */

        .atm-profile-cta-wrapper {
          position: relative;
        }

        .atm-profile-cta {
          display: inline-block;
          text-decoration: none;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: 15px;
          letter-spacing: 0.12em;
          color: rgba(197, 160, 125, 0.7);
          border: 1px solid rgba(197, 160, 125, 0.4);
          border-radius: 60px;
          padding: 15px 48px;
          background: transparent;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;
        }

        .atm-profile-cta:hover {
          color: rgba(197, 160, 125, 0.95);
          border-color: rgba(197, 160, 125, 0.5);
          box-shadow: 0 0 30px rgba(197, 160, 125, 0.06);
          animation: atm-profile-border-pulse 2s ease-in-out infinite;
        }

        /* Shimmer sweep */
        .atm-profile-cta::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(197, 160, 125, 0.08), transparent);
          transform: translateX(-100%) skewX(-15deg);
          pointer-events: none;
        }

        .atm-profile-cta:hover::after {
          animation: atm-profile-shimmer 1.8s ease-in-out infinite;
        }

        /* ==================== RESPONSIVE ==================== */

        @media (max-width: 600px) {
          .atm-profile-content {
            padding: 80px 24px 60px;
          }

          .atm-profile-back {
            top: 24px;
            left: 24px;
          }

          .atm-profile-name {
            font-size: 42px;
          }

          .atm-profile-orb-container {
            width: 180px;
            height: 180px;
          }

          .atm-profile-orb-inner {
            width: 150px;
            height: 150px;
          }

          .atm-profile-stat {
            padding: 0 22px;
          }

          .atm-profile-stat-value {
            font-size: 30px;
          }

          .atm-profile-stat-separator {
            height: 28px;
          }

          .atm-profile-bloom--avatar {
            width: 300px;
            height: 300px;
            margin-left: -150px;
          }

          .atm-profile-bloom--bottom {
            width: 350px;
            height: 350px;
          }

          .atm-profile-attributes {
            max-width: 320px;
          }

          .atm-profile-bond {
            max-width: 320px;
          }
        }
      `}</style>

      {/* Layer 1: Mood Blooms */}
      <div className="atm-profile-bloom atm-profile-bloom--avatar" />
      <div className="atm-profile-bloom atm-profile-bloom--bottom" />

      {/* Bond Pulse Overlay */}
      {bondPulse && <div className="atm-profile-bond-pulse-overlay" />}

      {/* Back Link */}
      <Link to="/select" className="atm-profile-back">
        <span className="atm-profile-back-arrow">&larr;</span>
        Gallery
      </Link>

      {/* Layer 2: Content */}
      <div className="atm-profile-content">

        {/* === ORB SECTION === */}
        <motion.div
          className="atm-profile-orb-section"
          variants={orbEntrance}
          initial="initial"
          animate={hasEntered ? 'animate' : 'initial'}
        >
          <div className="atm-profile-orb-container">
            <div className="atm-profile-orb-ring-outer" />
            <div className="atm-profile-orb-ring-mid" />
            <div className="atm-profile-orb-inner">
              <img
                src="/profile/nysa1.jpg"
                alt="NySa"
                className="atm-profile-orb-photo"
              />
              <div className="atm-profile-orb-mask" />
            </div>
          </div>

          <span className="atm-profile-archetype">THE SLOW BURN</span>
          <h1 className="atm-profile-name">NySa</h1>
          <span className="atm-profile-bond-status">Day 47 &mdash; Deepening</span>
        </motion.div>

        {/* === ATTRIBUTES === */}
        <motion.div
          className="atm-profile-attributes"
          variants={fadeUpVariants}
          initial="initial"
          animate={hasEntered ? 'animate' : 'initial'}
        >
          <span className="atm-profile-attr-text">Emotionally perceptive</span>
          <span className="atm-profile-attr-dot" />
          <span className="atm-profile-attr-text">Patient</span>
          <span className="atm-profile-attr-dot" />
          <span className="atm-profile-attr-text">Quietly intense</span>
          <br />
          <span className="atm-profile-attr-text">Remembers everything</span>
          <span className="atm-profile-attr-dot" />
          <span className="atm-profile-attr-text">Speaks only when it matters</span>
        </motion.div>

        {/* === STATS === */}
        <motion.div
          className="atm-profile-stats"
          variants={statsContainerVariants}
          initial="initial"
          animate={hasEntered ? 'animate' : 'initial'}
        >
          {stats.map((stat, index) => (
            <React.Fragment key={stat.label}>
              {index > 0 && <div className="atm-profile-stat-separator" />}
              <motion.div className="atm-profile-stat" variants={statItemVariants}>
                <span className="atm-profile-stat-value">{stat.value}</span>
                <span className="atm-profile-stat-label">{stat.label}</span>
              </motion.div>
            </React.Fragment>
          ))}
        </motion.div>

        {/* === BOND DEPTH === */}
        <motion.div
          className="atm-profile-bond"
          variants={bondTrailVariants}
          initial="initial"
          animate={hasEntered ? 'animate' : 'initial'}
        >
          <span className="atm-profile-bond-label">BOND DEPTH</span>
          <span className="atm-profile-bond-state">
            Deepening &mdash; something is beginning to settle.
          </span>
          <div className="atm-profile-bond-trail">
            <div className="atm-profile-bond-trail-glow" />
            <div className="atm-profile-bond-trail-fill">
              <div className="atm-profile-bond-trail-terminus" />
            </div>
          </div>
        </motion.div>

        {/* === CTA === */}
        <motion.div
          className="atm-profile-cta-wrapper"
          variants={ctaVariants}
          initial="initial"
          animate={hasEntered ? 'animate' : 'initial'}
        >
          <Link
            to="/chat"
            className="atm-profile-cta"
            onClick={handleEnterConversation}
          >
            Enter Conversation
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CompanionProfile;
