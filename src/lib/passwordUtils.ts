// Password generation utilities
const CHARS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

export function generatePassword(
  length: number = 16,
  options = {
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  }
): string {
  let chars = '';
  if (options.uppercase) chars += CHARS.uppercase;
  if (options.lowercase) chars += CHARS.lowercase;
  if (options.numbers) chars += CHARS.numbers;
  if (options.symbols) chars += CHARS.symbols;

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Ensure at least one character from each selected type
  if (options.uppercase) password = ensureCharType(password, CHARS.uppercase);
  if (options.lowercase) password = ensureCharType(password, CHARS.lowercase);
  if (options.numbers) password = ensureCharType(password, CHARS.numbers);
  if (options.symbols) password = ensureCharType(password, CHARS.symbols);

  return password;
}

function ensureCharType(password: string, chars: string): string {
  const pos = Math.floor(Math.random() * password.length);
  const char = chars.charAt(Math.floor(Math.random() * chars.length));
  return password.substring(0, pos) + char + password.substring(pos + 1);
}

export function checkPasswordStrength(password: string): {
  score: number;
  feedback: string;
} {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 12) score += 2;
  else if (password.length >= 8) score += 1;
  else feedback.push("Password is too short");

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("Add uppercase letters");

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push("Add lowercase letters");

  if (/[0-9]/.test(password)) score += 1;
  else feedback.push("Add numbers");

  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else feedback.push("Add special characters");

  return {
    score: Math.min(5, score),
    feedback: feedback.join(". ") || "Strong password!"
  };
}