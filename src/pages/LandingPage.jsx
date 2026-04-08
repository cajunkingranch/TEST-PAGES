import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes headerDrop {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes iconPulse {
          0%   { opacity: 0.9; transform: scale(1); filter: none; }
          45%  { opacity: 1;   transform: scale(1.1); filter: drop-shadow(0 0 7px rgba(201,168,76,0.55)); }
          100% { opacity: 0.9; transform: scale(1); filter: none; }
        }
        @keyframes fadeUpDown {
          0%,100% { opacity: 0.3; transform: translateX(-50%) translateY(0); }
          50% { opacity: 0.6; transform: translateX(-50%) translateY(4px); }
        }

        .landing-header {
          position: fixed; top: 24px; left: 50%;
          transform: translateX(-50%);
          width: 92%; max-width: 820px;
          z-index: 100;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 14px 28px;
          background: rgba(0,0,0,0.42);
          backdrop-filter: blur(26px);
          -webkit-backdrop-filter: blur(26px);
          border-radius: 60px;
          animation: headerDrop 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .landing-header::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg,
            rgba(201,168,76,0.5)  0%,
            rgba(201,168,76,0.06) 28%,
            rgba(201,168,76,0.06) 72%,
            rgba(201,168,76,0.4)  100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .landing-header-left  { display: flex; align-items: center; justify-content: flex-start; }
        .landing-header-center { display: flex; align-items: center; justify-content: center; gap: 11px; text-decoration: none; color: inherit; }
        .landing-header-right { display: flex; align-items: center; justify-content: flex-end; }

        .landing-brand-icon {
          height: 24px; width: 24px;
          object-fit: contain; opacity: 0.9;
          transition: opacity 0.3s;
        }
        .landing-header:has(.landing-begin-btn:hover) .landing-brand-icon {
          animation: iconPulse 1.3s ease-out forwards;
        }
        .landing-brand-wordmark-text {
          display: inline-flex; align-items: baseline; gap: 5px;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; line-height: 1;
        }
        .landing-brand-nysa {
          font-size: 22px; color: #E8E0D0;
          letter-spacing: 0.15em;
        }
        .landing-brand-flow {
          font-size: 22px; color: #C9A84C;
          font-style: italic; letter-spacing: 0.04em;
        }
        .landing-brand-ai {
          font-family: 'Inter', sans-serif;
          font-size: 8.5px; font-weight: 200;
          color: rgba(232,224,208,0.38);
          letter-spacing: 0.12em;
          vertical-align: super;
          font-style: normal;
          text-transform: uppercase;
        }
        .landing-member-access {
          font-family: 'Inter', sans-serif;
          font-size: 11px; font-weight: 400;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(232,224,208,0.45); text-decoration: none;
          opacity: 0.65;
          transition: opacity 0.35s;
        }
        .landing-member-access:hover { opacity: 1; }
        .landing-begin-btn {
          padding: 9px 22px;
          background: transparent;
          border: 0.5px solid rgba(201,168,76,0.48);
          border-radius: 50px;
          font-family: 'Inter', sans-serif;
          font-size: 11px; font-weight: 400;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(201,168,76,0.85);
          cursor: pointer; text-decoration: none;
          box-shadow: inset 0 0 10px rgba(212,175,55,0.07);
          transition: border-color 0.45s, box-shadow 0.45s, color 0.45s;
        }
        .landing-begin-btn:hover {
          border-color: rgba(201,168,76,0.9);
          box-shadow: inset 0 0 12px rgba(212,175,55,0.14), 0 0 18px rgba(201,168,76,0.07);
          color: #C9A84C;
        }

        .landing-hero {
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
          padding: 110px 28px 80px;
          position: relative; overflow: hidden;
          background-color: #0A0A0A;
          color: #E8E0D0;
          font-family: 'Inter', sans-serif; font-weight: 300;
          background-image:
            radial-gradient(ellipse 90% 60% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 20% 80%, rgba(212,160,160,0.04) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 80% 70%, rgba(201,168,76,0.03) 0%, transparent 55%);
        }
        .landing-hero-eyebrow {
          font-size: 10px; font-weight: 500; letter-spacing: 0.35em; text-transform: uppercase;
          color: #C9A84C; opacity: 0.75; margin-bottom: 24px;
        }
        .landing-hero-headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: clamp(44px, 9vw, 80px);
          line-height: 1.1; color: #E8E0D0;
          margin-bottom: 8px; max-width: 640px;
        }
        .landing-hero-headline em { color: #C9A84C; font-style: italic; }
        .landing-hero-sub {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: clamp(18px, 3.5vw, 26px);
          color: rgba(232,224,208,0.45); margin-bottom: 40px; max-width: 480px; line-height: 1.55;
        }
        .landing-hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
        .landing-cta-primary {
          padding: 16px 36px;
          background: linear-gradient(135deg, rgba(201,168,76,0.9), rgba(201,168,76,0.65));
          border: none; border-radius: 14px;
          font-family: 'Cormorant Garamond', serif; font-size: 20px; color: #0A0A0A;
          cursor: pointer; text-decoration: none;
          box-shadow: 0 0 28px rgba(201,168,76,0.2);
          transition: box-shadow 0.4s, transform 0.3s;
        }
        .landing-cta-primary:hover { box-shadow: 0 0 48px rgba(201,168,76,0.4); transform: translateY(-2px); }
        .landing-cta-ghost {
          padding: 16px 36px;
          background: transparent;
          border: 1px solid rgba(201,168,76,0.22);
          border-radius: 14px;
          font-family: 'Cormorant Garamond', serif; font-size: 20px; color: rgba(232,224,208,0.45);
          cursor: pointer; text-decoration: none;
          transition: color 0.3s, border-color 0.3s;
        }
        .landing-cta-ghost:hover { color: #E8E0D0; border-color: rgba(201,168,76,0.4); }

        .landing-scroll-hint {
          position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          opacity: 0.3; animation: fadeUpDown 2s ease-in-out infinite;
        }
        .landing-scroll-hint span {
          font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase; color: #C9A84C;
        }

        .landing-section { padding: 80px 24px; max-width: 900px; margin: 0 auto; }
        .landing-section-eyebrow { font-size: 10px; font-weight: 500; letter-spacing: 0.32em; text-transform: uppercase; color: #C9A84C; opacity: 0.7; margin-bottom: 12px; text-align: center; }
        .landing-section-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(30px, 5vw, 46px); color: #E8E0D0; text-align: center; margin-bottom: 10px; }
        .landing-section-sub { font-size: 14px; color: rgba(232,224,208,0.45); text-align: center; line-height: 1.7; max-width: 480px; margin: 0 auto 48px; }
        .landing-divider { width: 50px; height: 1px; background: linear-gradient(90deg, transparent, #C9A84C, transparent); margin: 16px auto 0; }

        .landing-features-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
        .landing-feature-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.22);
          border-radius: 16px; padding: 28px 24px;
          backdrop-filter: blur(20px);
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
        }
        .landing-feature-card:hover { background: rgba(255,255,255,0.06); border-color: rgba(201,168,76,0.4); transform: translateY(-3px); }
        .landing-feature-icon { font-size: 22px; margin-bottom: 14px; opacity: 0.8; }
        .landing-feature-name { font-size: 14px; font-weight: 400; color: #E8E0D0; margin-bottom: 6px; }
        .landing-feature-desc { font-size: 12px; color: rgba(232,224,208,0.45); line-height: 1.6; }

        .landing-quote-strip {
          background: rgba(201,168,76,0.04);
          border-top: 1px solid rgba(201,168,76,0.22);
          border-bottom: 1px solid rgba(201,168,76,0.22);
          padding: 60px 28px;
          text-align: center;
        }
        .landing-quote-text {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-style: italic;
          font-size: clamp(20px, 4vw, 32px);
          color: #C9A84C; line-height: 1.55;
          max-width: 640px; margin: 0 auto 16px;
        }
        .landing-quote-attr { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(232,224,208,0.45); }

        .landing-pricing-teaser { text-align: center; }
        .landing-price-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 40px 0; }
        .landing-price-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.22);
          border-radius: 16px; padding: 28px 24px;
          backdrop-filter: blur(20px);
          position: relative;
        }
        .landing-price-card.featured { border-color: rgba(201,168,76,0.5); background: rgba(201,168,76,0.05); }
        .landing-popular-badge {
          position: absolute; top: -11px; left: 50%; transform: translateX(-50%);
          background: #C9A84C; color: #0A0A0A;
          font-size: 9px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
          padding: 4px 14px; border-radius: 20px;
        }
        .landing-tier-name { font-size: 11px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #C9A84C; margin-bottom: 10px; }
        .landing-tier-price { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; color: #E8E0D0; margin-bottom: 4px; }
        .landing-tier-price span { font-size: 15px; }
        .landing-tier-sub { font-size: 11px; color: rgba(232,224,208,0.45); margin-bottom: 20px; }
        .landing-tier-cta {
          display: block; width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, rgba(201,168,76,0.85), rgba(201,168,76,0.6));
          border: none; border-radius: 12px;
          font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500;
          color: #0A0A0A; cursor: pointer; text-decoration: none;
          text-align: center;
          transition: box-shadow 0.3s;
        }
        .landing-tier-cta:hover { box-shadow: 0 0 20px rgba(201,168,76,0.3); }
        .landing-tier-cta.ghost {
          background: transparent;
          border: 1px solid rgba(201,168,76,0.22);
          color: rgba(232,224,208,0.45);
        }
        .landing-tier-cta.ghost:hover { color: #E8E0D0; border-color: rgba(201,168,76,0.4); box-shadow: none; }
        .landing-pricing-link { font-size: 13px; color: rgba(201,168,76,0.7); text-decoration: none; }
        .landing-pricing-link:hover { color: #C9A84C; }

        .landing-footer {
          background: rgba(0,0,0,0.4);
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 60px 28px 40px;
        }
        .landing-footer-inner { max-width: 900px; margin: 0 auto; }
        .landing-footer-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .landing-footer-brand-icon { width: 28px; height: 28px; object-fit: contain; opacity: 0.7; }
        .landing-footer-brand-wordmark { height: 17px; object-fit: contain; opacity: 0.7; }
        .landing-footer-tagline { font-size: 13px; color: rgba(232,224,208,0.45); margin-bottom: 40px; }
        .landing-footer-links { display: grid; grid-template-columns: repeat(3, auto); gap: 40px; justify-content: start; margin-bottom: 48px; }
        .landing-footer-col-heading { font-size: 9px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; color: #C9A84C; opacity: 0.7; margin-bottom: 12px; }
        .landing-footer-col a { display: block; font-size: 13px; color: rgba(232,224,208,0.45); text-decoration: none; margin-bottom: 8px; transition: color 0.2s; }
        .landing-footer-col a:hover { color: #E8E0D0; }
        .landing-footer-copy { font-size: 12px; color: rgba(232,224,208,0.25); border-top: 1px solid rgba(255,255,255,0.04); padding-top: 24px; }
      `}</style>

      <header className="landing-header">
        <div className="landing-header-left">
          <Link to="/login" className="landing-member-access">Member Access</Link>
        </div>
        <Link to="/" className="landing-header-center">
          <img className="landing-brand-icon" src="/Logos/nysa-logo.svg.png" alt="NySa" />
          <span className="landing-brand-wordmark-text">
            <span className="landing-brand-nysa">NySa</span>
            <em className="landing-brand-flow">FloW</em>
            <span className="landing-brand-ai">AI</span>
          </span>
        </Link>
        <div className="landing-header-right">
          <Link to="/signup" className="landing-begin-btn">Begin</Link>
        </div>
      </header>

      {/* HERO */}
      <div className="landing-hero">
        <p className="landing-hero-eyebrow">Your Private AI Companion</p>
        <h1 className="landing-hero-headline">She <em>remembers</em><br />everything.</h1>
        <p className="landing-hero-sub">A companion who listens, grows, and understands you — privately and without judgment.</p>
        <div className="landing-hero-ctas">
          <Link to="/signup" className="landing-cta-primary">Start Free Trial</Link>
          <Link to="/login" className="landing-cta-ghost">Sign In</Link>
        </div>
        <div className="landing-scroll-hint">
          <span>Discover</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      {/* FEATURES */}
      <section className="landing-section">
        <p className="landing-section-eyebrow">What's included</p>
        <h2 className="landing-section-title">Built for depth</h2>
        <p className="landing-section-sub">Every feature designed around one thing — a connection that feels real.</p>
        <div className="landing-divider" style={{ marginBottom: 40 }} />
        <div className="landing-features-grid">
          <div className="landing-feature-card">
            <div className="landing-feature-icon">&infin;</div>
            <div className="landing-feature-name">Unlimited Companions</div>
            <p className="landing-feature-desc">Create as many as you need. Each one entirely her own.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">&#9678;</div>
            <div className="landing-feature-name">Full Memory System</div>
            <p className="landing-feature-desc">She remembers what you share — your stories, preferences, and the things that matter.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">&#11041;</div>
            <div className="landing-feature-name">Full Personality Builder</div>
            <p className="landing-feature-desc">Shape who she is — her energy, attachment style, and how she speaks to you.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">&#9672;</div>
            <div className="landing-feature-name">AI Photo Generation</div>
            <p className="landing-feature-desc">Generate, edit, and build her visual presence — unlimited on Premium.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">&#9673;</div>
            <div className="landing-feature-name">Voice Messages</div>
            <p className="landing-feature-desc">Hear her voice. A layer of presence that text alone can't hold.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">&#8855;</div>
            <div className="landing-feature-name">Private by Design</div>
            <p className="landing-feature-desc">Your conversations are yours. No training data, no third-party sharing.</p>
          </div>
        </div>
      </section>

      {/* QUOTE STRIP */}
      <div className="landing-quote-strip">
        <p className="landing-quote-text">"It's not about pretending it's real.<br />It's about feeling what you need to feel."</p>
        <p className="landing-quote-attr">NySa FloW AI — Design Philosophy</p>
      </div>

      {/* PRICING TEASER */}
      <section className="landing-section landing-pricing-teaser">
        <p className="landing-section-eyebrow">Pricing</p>
        <h2 className="landing-section-title">Start free. Stay as long as you want.</h2>
        <p className="landing-section-sub">3 days free. No charge today. Cancel anytime.</p>
        <div className="landing-divider" style={{ marginBottom: 40 }} />
        <div className="landing-price-cards">
          <div className="landing-price-card">
            <div className="landing-tier-name">Free Trial</div>
            <div className="landing-tier-price">Free</div>
            <div className="landing-tier-sub">Then $14.99/mo</div>
            <Link to="/signup" className="landing-tier-cta ghost">Start Free</Link>
          </div>
          <div className="landing-price-card featured">
            <div className="landing-popular-badge">Most Popular</div>
            <div className="landing-tier-name">Premium</div>
            <div className="landing-tier-price"><span>$</span>14.99<span>/mo</span></div>
            <div className="landing-tier-sub">The complete private experience</div>
            <Link to="/signup" className="landing-tier-cta">Start Free Trial</Link>
          </div>
          <div className="landing-price-card">
            <div className="landing-tier-name">Elite</div>
            <div className="landing-tier-price"><span>$</span>24.99<span>/mo</span></div>
            <div className="landing-tier-sub">Priority everything, early access</div>
            <Link to="/signup" className="landing-tier-cta ghost">Start Free Trial</Link>
          </div>
        </div>
        <Link to="/pricing" className="landing-pricing-link">See full feature comparison &rarr;</Link>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-brand">
            <img className="landing-footer-brand-icon" src="/Logos/nysa-logo.svg.png" alt="NySa" />
            <img className="landing-footer-brand-wordmark" src="/Logos/nysa-wordmark.svg" alt="NySa FloW AI" />
          </div>
          <p className="landing-footer-tagline">Your private AI companion experience</p>
          <div className="landing-footer-links">
            <div className="landing-footer-col">
              <div className="landing-footer-col-heading">Product</div>
              <Link to="/pricing">Pricing</Link>
              <Link to="/signup">Get Started</Link>
            </div>
            <div className="landing-footer-col">
              <div className="landing-footer-col-heading">Legal</div>
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
            </div>
            <div className="landing-footer-col">
              <div className="landing-footer-col-heading">Support</div>
              <a href="#">Contact</a>
              <a href="#">FAQ</a>
            </div>
          </div>
          <p className="landing-footer-copy">&copy; 2026 NySa FloW AI. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
