export const emailError = (value) => {
  if (!value.trim()) return 'Enter your email address.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    return 'Enter a valid email, like name@company.com.';
  }
  return '';
};

export const nameError = (value) =>
  value.trim().length < 2 ? 'Enter your name.' : '';

// 0 (empty) to 4 (strong)
export const passwordScore = (value) => {
  if (!value) return 0;
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value) || value.length >= 14) score += 1;
  return Math.max(score, 1);
};

export const passwordLabel = ['', 'Too weak', 'Fair', 'Good', 'Strong'];

export const newPasswordError = (value) => {
  if (!value) return 'Create a password.';
  if (value.length < 8) return 'Use at least 8 characters.';
  if (passwordScore(value) < 2) return 'Add numbers or mixed-case letters.';
  return '';
};
