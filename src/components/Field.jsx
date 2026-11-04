import { useId, useState } from 'react';

export default function Field({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  hint,
  action,
  children,
  ...rest
}) {
  const id = useId();
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === 'password';
  const messageId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className="field">
      <div className="field-top">
        <label htmlFor={id}>{label}</label>
        {action}
      </div>

      <div className="control" data-invalid={error ? 'true' : undefined}>
        <input
          id={id}
          type={isPassword && revealed ? 'text' : type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={messageId}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            className="reveal"
            onClick={() => setRevealed((r) => !r)}
            aria-pressed={revealed}
            aria-label={revealed ? 'Hide password' : 'Show password'}
          >
            {revealed ? 'Hide' : 'Show'}
          </button>
        )}
      </div>

      {error ? (
        <p id={`${id}-error`} className="msg msg-error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="msg">
          {hint}
        </p>
      ) : null}

      {children}
    </div>
  );
}
