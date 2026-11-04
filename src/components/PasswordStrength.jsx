import { passwordLabel, passwordScore } from '../utils/validate.js';

export default function PasswordStrength({ value }) {
  const score = passwordScore(value);
  if (!score) return null;

  return (
    <div className="strength" data-score={score}>
      <div className="strength-bars" aria-hidden="true">
        {[1, 2, 3, 4].map((n) => (
          <span key={n} className={n <= score ? 'on' : ''} />
        ))}
      </div>
      <span className="strength-label" aria-live="polite">
        Password strength: {passwordLabel[score].toLowerCase()}
      </span>
    </div>
  );
}
