import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(identifier, password);
      const redirectTo = location.state?.from || '/home';
      navigate(redirectTo);
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-page {
          min-height: 100vh;
          display: flex; flex-direction: column;
          background-color: #0A0A0A; color: #E8E0D0;
          font-family: 'Inter', sans-serif; font-weight: 300;
          background-image:
            radial-gradient(ellipse 80% 55% at 50% -5%, rgba(201,168,76,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 50% 35% at 80% 90%, rgba(201,168,76,0.03) 0%, transparent 55%);
        }

        .login-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 24px;
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .login-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .login-brand-icon { width: 32px; height: 32px; object-fit: contain; }
        .login-brand-wordmark { height: 20px; object-fit: contain; max-width: 130px; }
        .login-header-cta {
          padding: 10px 20px;
          background: linear-gradient(135deg, rgba(201,168,76,0.9), rgba(201,168,76,0.65));
          border: none; border-radius: 10px;
          font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500;
          color: #0A0A0A; cursor: pointer; text-decoration: none;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .login-header-cta:hover { box-shadow: 0 0 24px rgba(201,168,76,0.35); transform: translateY(-1px); }

        .login-main {
          flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 100px 24px 60px;
        }

        .login-form-card {
          width: 100%; max-width: 400px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(201,168,76,0.22);
          border-radius: 20px;
          padding: 40px 32px;
          backdrop-filter: blur(20px);
        }
        .login-card-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400; font-size: 30px;
          color: #E8E0D0; text-align: center; margin-bottom: 6px;
        }
        .login-card-sub {
          font-size: 13px; color: rgba(232,224,208,0.45);
          text-align: center; margin-bottom: 32px; line-height: 1.6;
        }

        .login-field { margin-bottom: 20px; }
        .login-field-label {
          display: block; font-size: 10px; font-weight: 500;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: rgba(232,224,208,0.45); margin-bottom: 8px;
        }
        .login-field-input {
          width: 100%; padding: 14px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 300;
          color: #E8E0D0; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          -webkit-appearance: none;
        }
        .login-field-input::placeholder { color: rgba(232,224,208,0.28); }
        .login-field-input:focus {
          border-color: rgba(201,168,76,0.5);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
        }

        .login-forgot-row { display: flex; justify-content: flex-end; margin-top: -10px; margin-bottom: 20px; }
        .login-forgot-link { font-size: 12px; color: #C9A84C; text-decoration: none; opacity: 0.8; transition: opacity 0.2s; }
        .login-forgot-link:hover { opacity: 1; }

        .login-error {
          background: rgba(220, 80, 80, 0.12);
          border: 1px solid rgba(220, 80, 80, 0.3);
          border-radius: 10px;
          padding: 12px 16px;
          margin-bottom: 20px;
          font-size: 13px;
          color: rgba(220, 140, 140, 0.9);
          text-align: center;
        }

        .login-submit-btn {
          width: 100%; padding: 16px;
          background: linear-gradient(135deg, rgba(201,168,76,0.9), rgba(201,168,76,0.65));
          border: none; border-radius: 13px;
          font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 500;
          color: #0A0A0A; cursor: pointer;
          box-shadow: 0 0 24px rgba(201,168,76,0.15);
          transition: box-shadow 0.3s, transform 0.3s;
          margin-bottom: 20px;
        }
        .login-submit-btn:hover { box-shadow: 0 0 40px rgba(201,168,76,0.35); transform: translateY(-1px); }
        .login-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .login-alt-link { font-size: 13px; color: rgba(232,224,208,0.45); text-align: center; }
        .login-alt-link a { color: #C9A84C; text-decoration: none; font-weight: 400; }
        .login-alt-link a:hover { text-decoration: underline; }

        .login-footer {
          background: rgba(0,0,0,0.4);
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 48px 28px 32px;
        }
        .login-footer-inner { max-width: 900px; margin: 0 auto; }
        .login-footer-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
        .login-footer-brand-icon { width: 26px; height: 26px; object-fit: contain; opacity: 0.6; }
        .login-footer-brand-wordmark { height: 16px; object-fit: contain; opacity: 0.6; }
        .login-footer-tagline { font-size: 12px; color: rgba(232,224,208,0.45); margin-bottom: 32px; }
        .login-footer-links { display: grid; grid-template-columns: repeat(3, auto); gap: 32px; justify-content: start; margin-bottom: 36px; }
        .login-footer-col-heading { font-size: 9px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; color: #C9A84C; opacity: 0.65; margin-bottom: 10px; }
        .login-footer-col a { display: block; font-size: 12px; color: rgba(232,224,208,0.45); text-decoration: none; margin-bottom: 7px; transition: color 0.2s; }
        .login-footer-col a:hover { color: #E8E0D0; }
        .login-footer-copy { font-size: 11px; color: rgba(232,224,208,0.2); border-top: 1px solid rgba(255,255,255,0.04); padding-top: 20px; }
      `}</style>

      <div className="login-page">
        <header className="login-header">
          <Link to="/" className="login-brand">
            <img className="login-brand-icon" src="/Logos/nysa-logo.svg.png" alt="NySa" />
            <img className="login-brand-wordmark" src="/Logos/nysa-wordmark.svg" alt="NySa FloW AI" />
          </Link>
          <Link to="/signup" className="login-header-cta">Get Started</Link>
        </header>

        <main className="login-main">
          <div className="login-form-card">
            <h1 className="login-card-heading">Welcome Back</h1>
            <p className="login-card-sub">Sign in to continue your experience</p>

            <form onSubmit={handleSubmit}>
              <div className="login-field">
                <label className="login-field-label" htmlFor="login-email">Email</label>
                <input
                  className="login-field-input"
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              <div className="login-field">
                <label className="login-field-label" htmlFor="login-password">Password</label>
                <input
                  className="login-field-input"
                  id="login-password"
                  type="password"
                  placeholder="Your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-forgot-row">
                <Link to="/forgot-password" className="login-forgot-link">Forgot password?</Link>
              </div>

              {error && <div className="login-error">{error}</div>}

              <button className="login-submit-btn" type="submit" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <p className="login-alt-link">Don't have an account? <Link to="/signup">Create one</Link></p>
          </div>
        </main>

        <footer className="login-footer">
          <div className="login-footer-inner">
            <div className="login-footer-brand">
              <img className="login-footer-brand-icon" src="/Logos/nysa-logo.svg.png" alt="NySa" />
              <img className="login-footer-brand-wordmark" src="/Logos/nysa-wordmark.svg" alt="NySa FloW AI" />
            </div>
            <p className="login-footer-tagline">Your private AI companion experience</p>
            <div className="login-footer-links">
              <div className="login-footer-col">
                <div className="login-footer-col-heading">Product</div>
                <Link to="/pricing">Pricing</Link>
                <Link to="/signup">Get Started</Link>
              </div>
              <div className="login-footer-col">
                <div className="login-footer-col-heading">Legal</div>
                <a href="#">Terms of Service</a>
                <a href="#">Privacy Policy</a>
              </div>
              <div className="login-footer-col">
                <div className="login-footer-col-heading">Support</div>
                <a href="#">Contact</a>
                <a href="#">FAQ</a>
              </div>
            </div>
            <p className="login-footer-copy">&copy; 2026 NySa FloW AI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LoginPage;
