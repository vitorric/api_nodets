import { RemoveSpecialChars } from '@shared/helpers';

describe('Shared - RemoveSpecialChars', () => {
  it('should remove special characters (default)', () => {
    const input = 'Hello, World! @2024 #JS';
    const result = RemoveSpecialChars(input);

    expect(result).toBe('Hello World 2024 JS');
  });

  it('should remove \\r, \\n, and \\t characters (default)', () => {
    const input = 'Hello\nWorld\t!';
    const result = RemoveSpecialChars(input);

    expect(result).toBe('HelloWorld');
  });

  it('should remove symbols and non-ASCII characters when limited = true', () => {
    const input = 'Olá, mundo! 😊 — ç Ç ~ ª º';
    const result = RemoveSpecialChars(input, true);

    expect(result).toBe('Ol mundo');
  });

  it('should not alter string with no special characters', () => {
    const input = 'This is fine 123';
    const result = RemoveSpecialChars(input);

    expect(result).toBe(input);
  });

  it('should return the same value if string is empty', () => {
    const input = '';
    const result = RemoveSpecialChars(input);

    expect(result).toBe('');
  });

  it('should handle limited = true on clean string (no effect)', () => {
    const input = 'HelloWorld';
    const result = RemoveSpecialChars(input, true);

    expect(result).toBe('HelloWorld');
  });
});
