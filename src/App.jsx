<<<<<<< HEAD
import { useEffect, useState } from 'react';
import BrandPanel from './components/BrandPanel.jsx';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import SocialButtons from './components/SocialButtons.jsx';

const readMode = () => (window.location.hash === '#signup' ? 'signup' : 'login');

/**
 * Replace this with your real API call, e.g.
 *   const res = await fetch(`/api/auth/${mode}`, { method: 'POST', body: JSON.stringify(values), ... });
 *   if (!res.ok) throw new Error((await res.json()).message);
 *   return res.json();
 * Throwing an Error shows its message in the form's error banner.
 */
async function authenticate(mode, values) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { name: values.name || values.email.split('@')[0] };
}

const HEADINGS = {
  login: { title: 'Welcome back', sub: 'Log in to continue to your boards.' },
  signup: { title: 'Create your account', sub: 'Setting up takes about a minute.' },
};

export default function App() {
  const [mode, setMode] = useState(readMode);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const onHash = () => setMode(readMode());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const switchMode = (next) => {
    setMode(next);
    window.history.replaceState(null, '', `#${next}`);
  };

  const handleSubmit = async (values) => {
    const user = await authenticate(mode, values);
    setSession(user);
  };

  const heading = HEADINGS[mode];

  return (
    <div className="shell">
      <BrandPanel mode={mode} />

      <main className="stage">
        <div className="panel">
          {session ? (
            <section className="done" aria-live="polite">
              <span className="done-mark" aria-hidden="true">✓</span>
              <h1>{mode === 'signup' ? `You’re in, ${session.name}` : `Welcome back, ${session.name}`}</h1>
              <p>This is where your app’s dashboard would load.</p>
              <button className="btn ghost" type="button" onClick={() => setSession(null)}>
                Back to {mode === 'signup' ? 'sign up' : 'log in'}
              </button>
            </section>
          ) : (
            <>
              <div className="switch" role="tablist" aria-label="Account access" data-mode={mode}>
                <span className="switch-thumb" aria-hidden="true" />
                <button
                  role="tab"
                  type="button"
                  id="tab-login"
                  aria-selected={mode === 'login'}
                  aria-controls="auth-panel"
                  onClick={() => switchMode('login')}
                >
                  Log in
                </button>
                <button
                  role="tab"
                  type="button"
                  id="tab-signup"
                  aria-selected={mode === 'signup'}
                  aria-controls="auth-panel"
                  onClick={() => switchMode('signup')}
                >
                  Create account
                </button>
              </div>

              <div
                key={mode}
                id="auth-panel"
                role="tabpanel"
                aria-labelledby={`tab-${mode}`}
                className="swap"
              >
                <header className="heading">
                  <h1>{heading.title}</h1>
                  <p>{heading.sub}</p>
                </header>

                <SocialButtons mode={mode} />

                <div className="divider">
                  <span>or use email</span>
                </div>

                {mode === 'login' ? (
                  <LoginForm onSubmit={handleSubmit} />
                ) : (
                  <SignupForm onSubmit={handleSubmit} />
                )}

                <p className="swap-line">
                  {mode === 'login' ? 'New to Kora?' : 'Already have an account?'}{' '}
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
                  >
                    {mode === 'login' ? 'Create an account' : 'Log in'}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
=======
import { useState } from "react";
import { ArrowRight, ChartNoAxesCombined, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Smartphone, UserRound, UserRoundCheck, Zap } from "lucide-react";

const features = {
  login: [
    { icon: ShieldCheck, title: "Private by design", text: "Secure server-side sessions" },
    { icon: ChartNoAxesCombined, title: "See what matters", text: "Simple business insights" },
    { icon: Smartphone, title: "Works everywhere", text: "Built for desktop and mobile" }
  ],
  signup: [
    { icon: UserRoundCheck, title: "Email verified", text: "Account activation before access" },
    { icon: LockKeyhole, title: "Protected passwords", text: "Slow, salted password hashing" },
    { icon: Zap, title: "Fast setup", text: "Only the information we need" }
  ]
};

function Brand() {
  return <div className="brand"><div className="brand-mark">E</div><div><div className="brand-name">Expenso</div><div className="brand-subtitle">Business Manager</div></div></div>;
}

function FeatureList({ mode }) {
  return <div className="feature-list">{features[mode].map(({ icon: Icon, title, text }) => <div className="feature" key={title}><div className="feature-icon"><Icon size={24} strokeWidth={2.8} /></div><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>;
}

function Field({ label, type = "text", placeholder, icon: Icon, value, onChange, autoComplete, right, hint, name, required = true }) {
  return <div className="field"><label htmlFor={name}>{label}</label><div className="input-wrap"><Icon className="input-icon" size={21} /><input id={name} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} autoComplete={autoComplete} required={required} />{right}</div>{hint && <small className="field-hint">{hint}</small>}</div>;
}

export default function App() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState("success");
  const isSignup = mode === "signup";

  function switchMode(next) {
    setMode(next);
    setNotice("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setNotice("");
    if (isSignup) {
      if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
        setNoticeType("error");
        setNotice("Choose a password with 8+ characters, uppercase and lowercase letters, a number and a symbol.");
        return;
      }
      if (password !== confirmPassword) {
        setNoticeType("error");
        setNotice("Your passwords do not match. Please try again.");
        return;
      }
      if (!acceptedTerms) {
        setNoticeType("error");
        setNotice("Please agree to the terms and privacy practices to continue.");
        return;
      }
      setNoticeType("success");
      setNotice("The signup interface is ready. Connect your backend to create the account and send a verification email.");
    } else {
      setNoticeType("success");
      setNotice("The sign-in interface is ready. Connect your authentication API to securely sign in.");
    }
  }

  return <main className="page-shell">
    <section className="intro-panel">
      <div className="intro-inner">
        <Brand />
        <div className="eyebrow">{isSignup ? "START WITH A CLEAN SLATE" : "BUSINESS CONTROL CENTER"}</div>
        <h1>{isSignup ? <>Build a clearer<br /><span>business day.</span></> : <>Your business,<br /><span>under control.</span></>}</h1>
        <p className="intro-copy">{isSignup ? "Set up your workspace once, then keep your customers, inventory and cash flow organized." : "Customers, inventory, suppliers, transactions and reports in one focused workspace."}</p>
        <FeatureList mode={mode} />
        <footer className="intro-footer">© 2026 Expenso · Built for growing businesses</footer>
      </div>
    </section>

    <section className="form-panel">
      <div className="auth-card">
        <div className="form-eyebrow">{isSignup ? "CREATE ACCOUNT" : "WELCOME BACK"}</div>
        <h2>{isSignup ? "Start using Expenso" : "Sign in to Expenso"}</h2>
        <p className="form-description">{isSignup ? "It takes less than a minute to set up your account." : "Continue to your business dashboard."}</p>

        <form onSubmit={handleSubmit}>
          {isSignup && <Field label="Full name" name="full-name" placeholder="Your name" icon={UserRound} value={name} onChange={e => setName(e.target.value)} autoComplete="name" />}
          <Field label="Email address" name="email" type="email" placeholder="you@example.com" icon={Mail} value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
          <div className="field">
            <div className="label-row"><label htmlFor="password">Password</label>{!isSignup && <button type="button" className="text-button" onClick={() => { setNoticeType("error"); setNotice("Password recovery needs to be connected to your authentication backend."); }}>Forgot password?</button>}</div>
            <div className="input-wrap"><LockKeyhole className="input-icon" size={21} /><input id="password" name="password" type={showPassword ? "text" : "password"} placeholder={isSignup ? "Create a strong password" : "Enter your password"} value={password} onChange={e => setPassword(e.target.value)} autoComplete={isSignup ? "new-password" : "current-password"} required minLength={isSignup ? 8 : undefined} /><button type="button" className="icon-button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={22} /> : <Eye size={22} />}</button></div>
            {isSignup && <><div className="strength-track"><span className={password.length >= 8 ? "strength-fill active" : "strength-fill"} /></div><small className="field-hint">Too weak · Use 8+ characters, upper/lowercase, number and symbol.</small></>}
          </div>

          {isSignup ? <Field label="Confirm password" name="confirm-password" type={showConfirm ? "text" : "password"} placeholder="Repeat your password" icon={LockKeyhole} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="new-password" right={<button type="button" className="icon-button" aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"} onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <EyeOff size={22} /> : <Eye size={22} />}</button>} /> : <label className="check-row"><input type="checkbox" checked={keepSignedIn} onChange={e => setKeepSignedIn(e.target.checked)} /><span>Keep me signed in on this device</span></label>}

          {isSignup && <label className="check-row terms-row"><input type="checkbox" checked={acceptedTerms} onChange={e => setAcceptedTerms(e.target.checked)} /><span>I agree to the Expenso terms and privacy practices.</span></label>}
          {notice && <div role="status" className={`notice ${noticeType}`}>{notice}</div>}
          <button className="submit-button" type="submit">{isSignup ? "Create account" : "Sign in"} <ArrowRight size={23} strokeWidth={3} /></button>
        </form>

        <div className="separator"><span />{isSignup ? "ALREADY HAVE AN ACCOUNT?" : "NEW TO EXPENSO?"}<span /></div>
        <button className="switch-button" onClick={() => switchMode(isSignup ? "login" : "signup")}>{isSignup ? "Sign in instead" : "Create a business account"}</button>
        <p className="privacy-note">{isSignup ? "You’ll need to verify your email before you can access the dashboard." : "Authentication uses a protected HttpOnly session cookie; credentials are not kept in browser localStorage."}</p>
      </div>
    </section>
  </main>;
}
>>>>>>> 9a907874306ca1d4ddb9a4117e0fad4d71039a3b
