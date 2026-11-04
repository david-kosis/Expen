import { useRef, useState } from 'react';
import Field from './Field.jsx';
import PasswordStrength from './PasswordStrength.jsx';
import { emailError, nameError, newPasswordError } from '../utils/validate.js';

export default function SignupForm({ onSubmit }) {
  const formRef = useRef(null);
  const [values, setValues] = useState({ name: '', email: '', password: '', terms: false });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const errors = {
    name: nameError(values.name),
    email: emailError(values.email),
    password: newPasswordError(values.password),
    terms: values.terms ? '' : 'Accept the terms to create your account.',
  };
  const shown = (name) => (touched[name] ? errors[name] : '');
  const hasErrors = Object.values(errors).some(Boolean);

  const change = (name) => (e) =>
    setValues((v) => ({
      ...v,
      [name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));
  const blur = (name) => () => setTouched((t) => ({ ...t, [name]: true }));

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, terms: true });

    if (hasErrors) {
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
      setServerError(err.message || 'We couldn’t create your account. Try again in a moment.');
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
        label="Full name"
        name="name"
        autoComplete="name"
        placeholder="Ada Okafor"
        value={values.name}
        onChange={change('name')}
        onBlur={blur('name')}
        error={shown('name')}
      />

      <Field
        label="Work email"
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
        autoComplete="new-password"
        placeholder="At least 8 characters"
        value={values.password}
        onChange={change('password')}
        onBlur={blur('password')}
        error={shown('password')}
      >
        <PasswordStrength value={values.password} />
      </Field>

      <div className="field">
        <label className="check">
          <input
            type="checkbox"
            checked={values.terms}
            onChange={change('terms')}
            onBlur={blur('terms')}
            aria-invalid={shown('terms') ? 'true' : undefined}
            aria-describedby={shown('terms') ? 'terms-error' : undefined}
          />
          <span className="check-box" aria-hidden="true" />
          <span>
            I agree to the <a className="text-link" href="/terms">Terms</a> and{' '}
            <a className="text-link" href="/privacy">Privacy Policy</a>
          </span>
        </label>
        {shown('terms') && (
          <p id="terms-error" className="msg msg-error" role="alert">
            {shown('terms')}
          </p>
        )}
      </div>

      <button className="btn primary" type="submit" disabled={loading} aria-busy={loading}>
        {loading ? (
          <>
            <span className="spinner" aria-hidden="true" />
            Creating account…
          </>
        ) : (
          'Create account'
        )}
      </button>
    </form>
  );
}
