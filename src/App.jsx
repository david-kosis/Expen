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
