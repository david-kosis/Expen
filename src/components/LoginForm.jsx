import { useRef, useState } from 'react';
import Field from './Field.jsx';
import { emailError } from '../utils/validate.js';

export default function LoginForm({ onSubmit }) {
  const formRef = useRef(null);
  const [values, setValues] = useState({ email: '', password: '', remember: true });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const errors = {
    email: emailError(values.email),
    password: values.password ? '' : 'Enter your password.',
  };
  const shown = (name) => (touched[name] ? errors[name] : '');

  const change = (name) => (e) =>
    setValues((v) => ({
      ...v,
      [name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));
  const blur = (name) => () => setTouched((t) => ({ ...t, [name]: true }));

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (errors.email || errors.password) {
      requestAnimationFrame(() =>
        formRef.current?.querySelector('[aria-invalid="true"]')?.focus()
      );
      return;
    }

    setLoading(true);
    setServerError('');
    try {
      await onSubmit(values);
    } catch (err) {
      setServerError(err.message || 'We couldn’t log you in. Check your details and try again.');
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="form">
      {serverError && (
        <p className="banner" role="alert">
          {serverError}
        </p>
      )}

      <Field
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="name@company.com"
        value={values.email}
        onChange={change('email')}
        onBlur={blur('email')}
        error={shown('email')}
      />

      <Field
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="Your password"
        value={values.password}
        onChange={change('password')}
        onBlur={blur('password')}
        error={shown('password')}
        action={
          <a className="text-link" href="/forgot-password">
            Forgot password?
          </a>
        }
      />

      <label className="check">
        <input
          type="checkbox"
          checked={values.remember}
          onChange={change('remember')}
        />
        <span className="check-box" aria-hidden="true" />
        <span>Keep me logged in on this device</span>
      </label>

      <button className="btn primary" type="submit" disabled={loading} aria-busy={loading}>
        {loading ? (
          <>
            <span className="spinner" aria-hidden="true" />
            Logging in…
          </>
        ) : (
          'Log in'
        )}
      </button>
    </form>
  );
}
