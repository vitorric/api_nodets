import { Encrypt, Decrypt } from '@shared/crypto';

describe('Shared - Crypto (Encrypt & Decrypt)', () => {
  const originalEnv: any = process.env;

  afterEach(() => {
    process.env = originalEnv;
  });

  beforeEach(() => {
    process.env.CRYPTO_KEY_DEFAULT = 'nova-chave-test';
    jest.resetModules();
  });

  it('should encrypt and decrypt text correctly', () => {
    const plainText = 'SensitiveData123';

    const encrypted = Encrypt(plainText);
    expect(encrypted).toBeDefined();
    expect(typeof encrypted).toBe('string');
    expect(encrypted).not.toBe(plainText);

    const decrypted = Decrypt(encrypted!);
    expect(decrypted).toBe(plainText);
  });

  it('should return null if encryption fails (invalid input)', () => {
    const encrypted = Encrypt(undefined as unknown as string);
    expect(encrypted).toBeNull();
  });

  it('should return null if decryption fails (wrong cipher)', () => {
    const result = Decrypt('invalid-cipher-text');
    expect(result).toBeNull();
  });

  it('should return null if CRYPTO_KEY_DEFAULT is missing', () => {
    process.env.CRYPTO_KEY_DEFAULT = '';
    const encrypted = Encrypt('test');
    expect(encrypted).toBeNull();

    const decrypted = Decrypt('anything');
    expect(decrypted).toBeNull();
  });
});
