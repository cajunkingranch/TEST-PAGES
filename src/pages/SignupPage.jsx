import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ageVerified, setAgeVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const getPasswordHint = () => {
    if (!password) return null;
    if (password.length < 8) {
      return { text: `${8 - password.length} more character${8 - password.length === 1 ? '' : 's'} needed`, color: 'rgba(212,160,160,0.7)' };
    }
    return { text: 'Looks good', color: 'rgba(201,168,76,0.7)' };
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!ageVerified) {
      setError('You must confirm you are 18 years of age or older.');
      return;
    }
    if (!termsAccepted) {
      setError('You must accept the Terms of Service and Privacy Policy.');
      return;
    }

    setStep(2);
  };

  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(email, password, selectedPlan);
      navigate(`/checkout?plan=${selectedPlan}`);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordHint = getPasswordHint();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .signup-page {
          min-height: 100vh;
          display: flex; flex-direction: column;
          background-color: #0A0A0A; color: #E8E0D0;
          font-family: 'Inter', sans-serif; font-weight: 300;
          background-image:
            radial-gradient(ellipse 80% 55% at 50% -5%, rgba(201,168,76,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 50% 35% at 20% 90%, rgba(201,168,76,0.03) 0%, transparent 55%);
        }

        .signup-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 24px;
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .signup-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .signup-brand-icon { width: 32px; height: 32px; object-fit: contain; }
        .signup-brand-wordmark { height: 20px; object-fit: contain; max-width: 130px; }
        .signup-header-cta {
          padding: 10px 20px;
          background: linear-gradient(135deg, rgba(201,168,76,0.9), rgba(201,168,76,0.65));
          border: none; border-radius: 10px;
          font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500;
          color: #0A0A0A; cursor: pointer; text-decoration: none;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .signup-header-cta:hover { box-shadow: 0 0 24px rgba(201,168,76,0.35); transform: translateY(-1px); }

        .signup-main {
          flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 100px 24px 60px;
        }

        .signup-form-card {
          width: 100%; max-width: 420px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(201,168,76,0.22);
          border-radius: 20px;
          padding: 36px 32px;
          backdrop-filter: blur(20px);
        }

        .signup-step-progress { display: flex; align-items: center; gap: 0; margin-bottom: 28px; }
        .signup-step-pill {
          display: flex; align-items: center; gap: 8px;
          padding: 7px 16px; border-radius: 20px;
          font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
          transition: background 0.3s, color 0.3s;
          cursor: pointer; border: none; background: none;
        }
        .signup-step-pill.active {
          background: rgba(201,168,76,0.85);
          color: #0A0A0A;
        }
        .signup-step-pill.inactive { color: rgba(232,224,208,0.45); }
        .signup-step-connector { flex: 1; height: 1px; background: rgba(255,255,255,0.08); margin: 0 4px; }

        .signup-card-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400; font-size: 28px;
          color: #E8E0D0; text-align: center; margin-bottom: 5px;
        }
        .signup-card-sub { font-size: 13px; color: rgba(232,224,208,0.45); text-align: center; margin-bottom: 28px; }

        .signup-field { margin-bottom: 18px; }
        .signup-field-label {
          display: block; font-size: 10px; font-weight: 500;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: rgba(232,224,208,0.45); margin-bottom: 7px;
        }
        .signup-field-input {
          width: 100%; padding: 14px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 300;
          color: #E8E0D0; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          -webkit-appearance: none;
        }
        .signup-field-input::placeholder { color: rgba(232,224,208,0.28); }
        .signup-field-input:focus {
          border-color: rgba(201,168,76,0.5);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
        }

        .signup-pw-hint { font-size: 11px; margin-top: 5px; }

        .signup-checks { margin-bottom: 24px; display: flex; flex-direction: column; gap: 12px; }
        .signup-check-row { display: flex; align-items: flex-start; gap: 12px; cursor: pointer; }
        .signup-check-box {
          width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px;
          border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 4px; background: rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s, background 0.2s;
          cursor: pointer;
        }
        .signup-check-box.checked {
          border-color: #C9A84C;
          background: rgba(201,168,76,0.15);
        }
        .signup-check-mark { display: none; }
        .signup-check-box.checked .signup-check-mark { display: block; }
        .signup-check-label { font-size: 13px; color: rgba(232,224,208,0.45); line-height: 1.5; }
        .signup-check-label a { color: #C9A84C; text-decoration: none; }
        .signup-check-label a:hover { text-decoration: underline; }

        .signup-error {
          background: rgba(220, 80, 80, 0.12);
          border: 1px solid rgba(220, 80, 80, 0.3);
          border-radius: 10px;
          padding: 12px 16px;
          margin-bottom: 20px;
          font-size: 13px;
          color: rgba(220, 140, 140, 0.9);
          text-align: center;
        }

        .signup-submit-btn {
          width: 100%; padding: 16px;
          background: linear-gradient(135deg, rgba(201,168,76,0.9), rgba(201,168,76,0.65));
          border: none; border-radius: 13px;
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500;
          color: #0A0A0A; cursor: pointer;
          box-shadow: 0 0 24px rgba(201,168,76,0.15);
          transition: box-shadow 0.3s, transform 0.3s;
          margin-bottom: 18px;
        }
        .signup-submit-btn:hover { box-shadow: 0 0 40px rgba(201,168,76,0.35); transform: translateY(-1px); }
        .signup-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .signup-alt-link { font-size: 13px; color: rgba(232,224,208,0.45); text-align: center; }
        .signup-alt-link a { color: #C9A84C; text-decoration: none; font-weight: 400; }
        .signup-alt-link a:hover { text-decoration: underline; }

        /* PLAN SELECTION */
        .signup-plan-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px; }
        .signup-plan-card {
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(201,168,76,0.22);
          border-radius: 16px; padding: 24px 20px;
          cursor: pointer;
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
          position: relative; text-align: center;
        }
        .signup-plan-card:hover { background: rgba(255,255,255,0.06); transform: translateY(-2px); }
        .signup-plan-card.selected {
          border-color: rgba(201,168,76,0.7);
          background: rgba(201,168,76,0.08);
        }
        .signup-plan-badge {
          position: absolute; top: -10px; left: 50%; transform: translateX(-50%);
          background: #C9A84C; color: #0A0A0A;
          font-size: 9px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
          padding: 3px 12px; border-radius: 20px;
        }
        .signup-plan-name {
          font-size: 11px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase;
          color: #C9A84C; margin-bottom: 8px;
        }
        .signup-plan-price {
          font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 300;
          color: #E8E0D0; margin-bottom: 4px;
        }
        .signup-plan-price span { font-size: 14px; }
        .signup-plan-sub { font-size: 11px; color: rgba(232,224,208,0.45); }

        .signup-footer {
          background: rgba(0,0,0,0.4);
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 48px 28px 32px;
        }
        .signup-footer-inner { max-width: 900px; margin: 0 auto; }
        .signup-footer-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
        .signup-footer-brand-icon { width: 26px; height: 26px; object-fit: contain; opacity: 0.6; }
        .signup-footer-brand-wordmark { height: 16px; object-fit: contain; opacity: 0.6; }
        .signup-footer-tagline { font-size: 12px; color: rgba(232,224,208,0.45); margin-bottom: 32px; }
        .signup-footer-links { display: grid; grid-template-columns: repeat(3, auto); gap: 32px; justify-content: start; margin-bottom: 36px; }
        .signup-footer-col-heading { font-size: 9px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; color: #C9A84C; opacity: 0.65; margin-bottom: 10px; }
        .signup-footer-col a { display: block; font-size: 12px; color: rgba(232,224,208,0.45); text-decoration: none; margin-bottom: 7px; transition: color 0.2s; }
        .signup-footer-col a:hover { color: #E8E0D0; }
        .signup-footer-copy { font-size: 11px; color: rgba(232,224,208,0.2); border-top: 1px solid rgba(255,255,255,0.04); padding-top: 20px; }
      `}</style>

      <div className="signup-page">
        <header className="signup-header">
          <Link to="/" className="signup-brand">
            <img className="signup-brand-icon" src="/Logos/nysa-logo.svg.png" alt="NySa" />
            <img className="signup-brand-wordmark" src="/Logos/nysa-wordmark.svg" alt="NySa FloW AI" />
          </Link>
          <Link to="/signup" className="signup-header-cta">Get Started</Link>
        </header>

        <main className="signup-main">
          <div className="signup-form-card">
            <div className="signup-step-progress">
              <div className={`signup-step-pill ${step === 1 ? 'active' : 'inactive'}`}>1. Account</div>
              <div className="signup-step-connector" />
              <div className={`signup-step-pill ${step === 2 ? 'active' : 'inactive'}`}>2. Plan</div>
            </div>

            {step === 1 && (
              <>
                <h1 className="signup-card-heading">Create Your Account</h1>
                <p className="signup-card-sub">Begin your private companion experience</p>

                <form onSubmit={handleAccountSubmit}>
                  <div className="signup-field">
                    <label className="signup-field-label" htmlFor="signup-email">Email</label>
                    <input
                      className="signup-field-input"
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="signup-field">
                    <label className="signup-field-label" htmlFor="signup-password">Password</label>
                    <input
                      className="signup-field-input"
                      id="signup-password"
                      type="password"
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {passwordHint && (
                      <p className="signup-pw-hint" style={{ color: passwordHint.color }}>{passwordHint.text}</p>
                    )}
                  </div>

                  <div className="signup-field">
                    <label className="signup-field-label" htmlFor="signup-confirm">Confirm Password</label>
                    <input
                      className="signup-field-input"
                      id="signup-confirm"
                      type="password"
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="signup-checks">
                    <label className="signup-check-row" onClick={() => setAgeVerified(!ageVerified)}>
                      <div className={`signup-check-box ${ageVerified ? 'checked' : ''}`}>
                        <svg className="signup-check-mark" width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="signup-check-label">I confirm I am 18 years of age or older</span>
                    </label>
                    <label className="signup-check-row" onClick={() => setTermsAccepted(!termsAccepted)}>
                      <div className={`signup-check-box ${termsAccepted ? 'checked' : ''}`}>
                        <svg className="signup-check-mark" width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="signup-check-label">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
                    </label>
                  </div>

                  {error && <div className="signup-error">{error}</div>}

                  <button className="signup-submit-btn" type="submit">Continue to Plan Selection</button>
                </form>

                <p className="signup-alt-link">Already have an account? <Link to="/login">Sign in</Link></p>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="signup-card-heading">Choose Your Plan</h1>
                <p className="signup-card-sub">3 days free trial included with both plans</p>

                <form onSubmit={handlePlanSubmit}>
                  <div className="signup-plan-cards">
                    <div
                      className={`signup-plan-card ${selectedPlan === 'premium' ? 'selected' : ''}`}
                      onClick={() => setSelectedPlan('premium')}
                    >
                      <div className="signup-plan-badge">Most Popular</div>
                      <div className="signup-plan-name">Premium</div>
                      <div className="signup-plan-price"><span>$</span>14.99<span>/mo</span></div>
                      <div className="signup-plan-sub">The complete private experience</div>
                    </div>
                    <div
                      className={`signup-plan-card ${selectedPlan === 'elite' ? 'selected' : ''}`}
                      onClick={() => setSelectedPlan('elite')}
                    >
                      <div className="signup-plan-name">Elite</div>
                      <div className="signup-plan-price"><span>$</span>24.99<span>/mo</span></div>
                      <div className="signup-plan-sub">Priority everything, early access</div>
                    </div>
                  </div>

                  {error && <div className="signup-error">{error}</div>}

                  <button className="signup-submit-btn" type="submit" disabled={loading}>
                    {loading ? 'Creating Account...' : `Start Free Trial — ${selectedPlan === 'premium' ? '$14.99' : '$24.99'}/mo after`}
                  </button>

                  <button
                    type="button"
                    className="signup-submit-btn"
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(201,168,76,0.22)',
                      color: 'rgba(232,224,208,0.45)',
                      boxShadow: 'none',
                      fontSize: '13px',
                    }}
                    onClick={() => { setStep(1); setError(''); }}
                  >
                    &larr; Back to Account Details
                  </button>
                </form>
              </>
            )}
          </div>
        </main>

        <footer className="signup-footer">
          <div className="signup-footer-inner">
            <div className="signup-footer-brand">
              <img className="signup-footer-brand-icon" src="/Logos/nysa-logo.svg.png" alt="NySa" />
              <img className="signup-footer-brand-wordmark" src="/Logos/nysa-wordmark.svg" alt="NySa FloW AI" />
            </div>
            <p className="signup-footer-tagline">Your private AI companion experience</p>
            <div className="signup-footer-links">
              <div className="signup-footer-col">
                <div className="signup-footer-col-heading">Product</div>
                <Link to="/pricing">Pricing</Link>
                <Link to="/signup">Get Started</Link>
              </div>
              <div className="signup-footer-col">
                <div className="signup-footer-col-heading">Legal</div>
                <a href="#">Terms of Service</a>
                <a href="#">Privacy Policy</a>
              </div>
              <div className="signup-footer-col">
                <div className="signup-footer-col-heading">Support</div>
                <a href="#">Contact</a>
                <a href="#">FAQ</a>
              </div>
            </div>
            <p className="signup-footer-copy">&copy; 2026 NySa FloW AI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SignupPage;
