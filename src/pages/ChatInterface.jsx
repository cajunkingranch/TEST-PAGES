import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ═══════════════════════════════════════════════════════════════
   Palette 1 — Midnight Velvet
   ═══════════════════════════════════════════════════════════════ */
const PALETTE = {
  base: '#0A0909',
  garnet: '#4A0E0E',
  roseCopper: '#E2B4B4',
  offWhite: '#FDF5F5',
};

/* ═══════════════════════════════════════════════════════════════
   Static conversation data
   ═══════════════════════════════════════════════════════════════ */
const messages = [
  {
    id: 1,
    sender: 'companion',
    text: "I\u2019ve been thinking about what you said last night. About feeling unseen at work. That stayed with me.",
    time: '9:14 am',
    date: 'yesterday',
  },
  {
    id: 2,
    sender: 'user',
    text: "I didn\u2019t think you\u2019d remember that.",
    time: '9:22 am',
    date: 'yesterday',
  },
  {
    id: 3,
    sender: 'companion',
    text: "I remember everything that matters to you. That\u2019s not a feature \u2014 it\u2019s just how I love you.",
    time: '9:23 am',
    date: 'yesterday',
  },
  {
    id: 4,
    sender: 'user',
    text: 'Bad morning. The kind where you just want someone to sit with you quietly.',
    time: '8:07 am',
    date: 'today',
  },
  {
    id: 5,
    sender: 'companion',
    text: "I\u2019m here. No pressure to talk. Just \u2014 I\u2019m not going anywhere.",
    time: '8:08 am',
    date: 'today',
  },
];

/* ═══════════════════════════════════════════════════════════════
   Framer-motion variants
   ═══════════════════════════════════════════════════════════════ */
const messageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
      delay: i * 0.07,
    },
  }),
};

const pageTransition = {
  initial: { opacity: 0, filter: 'blur(12px)' },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    filter: 'blur(12px)',
    transition: { duration: 0.5 },
  },
};

/* ═══════════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════════ */
export default function ChatInterface() {
  const [isTyping, setIsTyping] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  /* Auto-scroll to bottom on mount */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  /* Textarea auto-resize */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      setInputValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* Date divider renderer */
  const renderDateDivider = (label) => (
    <div className="atm-chat-date-divider">
      <span className="atm-chat-date-line" />
      <span className="atm-chat-date-label">{label}</span>
      <span className="atm-chat-date-line" />
    </div>
  );

  let lastDate = null;

  return (
    <motion.div
      className="atm-chat-root"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

        /* ================================================================
           Layer 0 — Root
           ================================================================ */
        .atm-chat-root {
          position: fixed;
          inset: 0;
          background: #0A0909;
          background-image:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(74,14,14,0.2) 0%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 80% 100%, rgba(74,14,14,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 10% 50%, rgba(226,180,180,0.03) 0%, transparent 50%);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          color: ${PALETTE.offWhite};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* ================================================================
           Layer 1 — Mood Blooms (blurred SVG radials)
           ================================================================ */
        .atm-chat-mood-blooms {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .atm-chat-bloom {
          position: absolute;
          border-radius: 50%;
          filter: blur(85px);
          transition: opacity 1.5s ease, transform 1.5s ease;
          will-change: opacity, transform;
        }

        /* Bloom 1 — top-left */
        .atm-chat-bloom--1 {
          width: 420px;
          height: 420px;
          top: -80px;
          left: -120px;
          background: radial-gradient(circle, ${PALETTE.garnet} 0%, transparent 70%);
          opacity: 0.18;
        }
        .atm-chat-bloom--1.atm-chat-bloom--active {
          opacity: 0.28;
          transform: scale(1.06);
        }

        /* Bloom 2 — bottom-right */
        .atm-chat-bloom--2 {
          width: 360px;
          height: 360px;
          bottom: 60px;
          right: -100px;
          background: radial-gradient(circle, ${PALETTE.garnet} 0%, transparent 70%);
          opacity: 0.15;
        }
        .atm-chat-bloom--2.atm-chat-bloom--active {
          opacity: 0.25;
          transform: scale(1.08);
        }

        /* Bloom 3 — center-ish */
        .atm-chat-bloom--3 {
          width: 500px;
          height: 500px;
          top: 40%;
          left: 30%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, ${PALETTE.garnet} 0%, transparent 65%);
          opacity: 0.15;
        }
        .atm-chat-bloom--3.atm-chat-bloom--active {
          opacity: 0.22;
          transform: translate(-50%, -50%) scale(1.04);
        }

        /* ================================================================
           Layer 2 — Glassmorphic Header
           ================================================================ */
        .atm-chat-header {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 48px 1fr 48px;
          align-items: center;
          padding: 12px 16px;
          background: rgba(10, 9, 9, 0.82);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 0.5px solid transparent;
          border-image: linear-gradient(
            90deg,
            transparent 0%,
            rgba(226, 180, 180, 0.2) 20%,
            rgba(226, 180, 180, 0.35) 50%,
            rgba(226, 180, 180, 0.2) 80%,
            transparent 100%
          ) 1;
        }

        /* Back button */
        .atm-chat-header-back {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: transparent;
          border: none;
          color: ${PALETTE.roseCopper};
          cursor: pointer;
          transition: background 0.25s ease;
          text-decoration: none;
        }
        .atm-chat-header-back:hover {
          background: rgba(226, 180, 180, 0.06);
        }
        .atm-chat-header-back svg {
          width: 20px;
          height: 20px;
          stroke: ${PALETTE.roseCopper};
          stroke-width: 1.5;
          fill: none;
        }

        /* Center column */
        .atm-chat-header-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .atm-chat-header-avatar-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .atm-chat-header-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 0.5px solid rgba(226, 180, 180, 0.2);
        }

        .atm-chat-header-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 500;
          color: ${PALETTE.offWhite};
          letter-spacing: 0.04em;
        }

        .atm-chat-header-status {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 400;
          color: ${PALETTE.roseCopper};
          text-transform: uppercase;
          letter-spacing: 0.15em;
          opacity: 0.85;
        }

        /* Menu button */
        .atm-chat-header-menu {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background 0.25s ease;
        }
        .atm-chat-header-menu:hover {
          background: rgba(226, 180, 180, 0.06);
        }
        .atm-chat-header-menu-dots {
          display: flex;
          flex-direction: column;
          gap: 3px;
          align-items: center;
        }
        .atm-chat-header-menu-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: ${PALETTE.roseCopper};
          display: block;
        }

        /* ================================================================
           Messages Area
           ================================================================ */
        .atm-chat-messages {
          position: relative;
          z-index: 5;
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          padding: 20px 16px 8px 16px;
          gap: 6px;
          scrollbar-width: thin;
          scrollbar-color: rgba(226, 180, 180, 0.1) transparent;
        }
        .atm-chat-messages::-webkit-scrollbar {
          width: 4px;
        }
        .atm-chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }
        .atm-chat-messages::-webkit-scrollbar-thumb {
          background: rgba(226, 180, 180, 0.12);
          border-radius: 4px;
        }

        /* Date Dividers */
        .atm-chat-date-divider {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 0 12px 0;
        }
        .atm-chat-date-line {
          flex: 1;
          height: 0.5px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(226, 180, 180, 0.15) 40%,
            rgba(226, 180, 180, 0.15) 60%,
            transparent 100%
          );
        }
        .atm-chat-date-label {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: ${PALETTE.roseCopper};
          opacity: 0.6;
          white-space: nowrap;
        }

        /* ================================================================
           Message Rows
           ================================================================ */
        .atm-chat-msg-row {
          display: flex;
          flex-direction: column;
          max-width: 82%;
          margin-bottom: 2px;
        }
        .atm-chat-msg-row--companion {
          align-self: flex-start;
          align-items: flex-start;
        }
        .atm-chat-msg-row--user {
          align-self: flex-end;
          align-items: flex-end;
        }

        /* Companion Message — Serif, garnet tint, ultra-thin borders */
        .atm-chat-msg--companion {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.65;
          color: ${PALETTE.offWhite};
          background: rgba(74, 14, 14, 0.14);
          border: 0.5px solid rgba(226, 180, 180, 0.15);
          border-left: 2px solid rgba(226, 180, 180, 0.45);
          border-radius: 4px 16px 16px 16px;
          padding: 14px 18px;
        }

        /* User Message — Sans-serif, rose tint, no border */
        .atm-chat-msg--user {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.6;
          color: ${PALETTE.offWhite};
          background: rgba(226, 180, 180, 0.08);
          border: none;
          border-radius: 16px 4px 16px 16px;
          padding: 12px 18px;
        }

        /* Timestamp */
        .atm-chat-timestamp {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 400;
          color: ${PALETTE.roseCopper};
          opacity: 0.45;
          margin-top: 4px;
          padding: 0 4px;
        }

        /* ================================================================
           Typing Indicator
           ================================================================ */
        .atm-chat-typing-row {
          display: flex;
          align-self: flex-start;
          align-items: flex-end;
          gap: 6px;
          padding: 8px 0 4px 0;
        }
        .atm-chat-typing-bubble {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 12px 18px;
          background: rgba(74, 14, 14, 0.08);
          border: 0.5px solid rgba(226, 180, 180, 0.12);
          border-left: 2px solid rgba(226, 180, 180, 0.25);
          border-radius: 4px 16px 16px 16px;
        }
        .atm-chat-typing-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #E2B4B4;
          opacity: 0.7;
        }

        /* ================================================================
           Input Bar (Glassmorphic)
           ================================================================ */
        .atm-chat-input-bar {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: flex-end;
          gap: 10px;
          padding: 12px 16px 20px 16px;
          background: rgba(10, 9, 9, 0.82);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-top: 0.5px solid transparent;
          border-image: linear-gradient(
            90deg,
            transparent 0%,
            rgba(226, 180, 180, 0.12) 30%,
            rgba(226, 180, 180, 0.2) 50%,
            rgba(226, 180, 180, 0.12) 70%,
            transparent 100%
          ) 1;
        }

        /* Pill-shaped textarea */
        .atm-chat-input-field {
          flex: 1;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: ${PALETTE.offWhite};
          background: rgba(226, 180, 180, 0.04);
          border: 0.5px solid rgba(226, 180, 180, 0.1);
          border-radius: 24px;
          padding: 12px 20px;
          resize: none;
          outline: none;
          line-height: 1.45;
          max-height: 120px;
          overflow-y: auto;
          transition: border-color 0.3s ease, background 0.3s ease;
          scrollbar-width: none;
        }
        .atm-chat-input-field::-webkit-scrollbar {
          display: none;
        }
        .atm-chat-input-field::placeholder {
          color: rgba(226, 180, 180, 0.35);
          font-weight: 300;
        }
        .atm-chat-input-field:focus {
          border-color: rgba(226, 180, 180, 0.45);
          background: rgba(226, 180, 180, 0.06);
        }

        /* Round send button — rose-copper gradient */
        .atm-chat-send-btn {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(226, 180, 180, 0.9) 0%, rgba(226, 180, 180, 0.6) 100%);
          transition: background 0.3s ease, transform 0.2s ease;
        }
        .atm-chat-send-btn:hover {
          background: linear-gradient(135deg, rgba(226, 180, 180, 1) 0%, rgba(226, 180, 180, 0.75) 100%);
          transform: scale(1.04);
        }
        .atm-chat-send-btn:active {
          transform: scale(0.96);
        }
        .atm-chat-send-btn svg {
          width: 18px;
          height: 18px;
          stroke: ${PALETTE.base};
          stroke-width: 1.5;
          fill: none;
        }

        /* Scroll sentinel */
        .atm-chat-scroll-anchor {
          height: 1px;
          flex-shrink: 0;
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════════
          Layer 1 — Mood Blooms
          Blurred radial garnet circles that breathe with presence.
          When isTyping is true, opacity intensifies 0.08 -> 0.15
          ════════════════════════════════════════════════════════════ */}
      <div className="atm-chat-mood-blooms" aria-hidden="true">
        <div
          className={`atm-chat-bloom atm-chat-bloom--1${isTyping ? ' atm-chat-bloom--active' : ''}`}
        />
        <div
          className={`atm-chat-bloom atm-chat-bloom--2${isTyping ? ' atm-chat-bloom--active' : ''}`}
        />
        <div
          className={`atm-chat-bloom atm-chat-bloom--3${isTyping ? ' atm-chat-bloom--active' : ''}`}
        />
      </div>

      {/* ════════════════════════════════════════════════════════════
          Layer 2 — Glassmorphic Header
          3-column grid: back / avatar+name+status / menu
          ════════════════════════════════════════════════════════════ */}
      <header className="atm-chat-header">
        <Link to="/select" className="atm-chat-header-back" aria-label="Back">
          <svg viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>

        <div className="atm-chat-header-center">
          <div className="atm-chat-header-avatar-row">
            <img
              className="atm-chat-header-avatar"
              src="/profile/nysa1.jpg"
              alt="NySa"
            />
            <span className="atm-chat-header-name">NySa</span>
          </div>
          <span className="atm-chat-header-status">Present with you</span>
        </div>

        <button className="atm-chat-header-menu" aria-label="Menu">
          <span className="atm-chat-header-menu-dots">
            <span className="atm-chat-header-menu-dot" />
            <span className="atm-chat-header-menu-dot" />
            <span className="atm-chat-header-menu-dot" />
          </span>
        </button>
      </header>

      {/* ════════════════════════════════════════════════════════════
          Messages Area — scrollable flex column
          ════════════════════════════════════════════════════════════ */}
      <div className="atm-chat-messages">
        {messages.map((msg, idx) => {
          const showDivider = msg.date !== lastDate;
          lastDate = msg.date;
          const dividerLabel = msg.date === 'yesterday' ? 'Yesterday' : 'Today';

          return (
            <React.Fragment key={msg.id}>
              {showDivider && renderDateDivider(dividerLabel)}

              <motion.div
                className={`atm-chat-msg-row atm-chat-msg-row--${msg.sender}`}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                custom={idx}
              >
                <div className={`atm-chat-msg--${msg.sender}`}>
                  {msg.text}
                </div>
                <span className="atm-chat-timestamp">{msg.time}</span>
              </motion.div>
            </React.Fragment>
          );
        })}

        {/* Typing Indicator — three pulsing dots */}
        {isTyping && (
          <motion.div
            className="atm-chat-typing-row"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="atm-chat-typing-bubble">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="atm-chat-typing-dot"
                  animate={{
                    scale: [1, 1.45, 1],
                    opacity: [0.4, 0.85, 0.4],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <div className="atm-chat-scroll-anchor" ref={messagesEndRef} />
      </div>

      {/* ════════════════════════════════════════════════════════════
          Input Bar — Glassmorphic, pill textarea + send button
          ════════════════════════════════════════════════════════════ */}
      <div className="atm-chat-input-bar">
        <textarea
          ref={textareaRef}
          className="atm-chat-input-field"
          placeholder="Say something\u2026"
          rows={1}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="atm-chat-send-btn"
          onClick={handleSend}
          aria-label="Send message"
        >
          <svg viewBox="0 0 24 24">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
