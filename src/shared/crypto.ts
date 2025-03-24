import crypto from 'crypto';

const algorithm = 'AES-256-CTR';
const cryptoKeyDefault: string = process.env.CRYPTO_KEY_DEFAULT!;

const Encrypt = (text: string): string | null => {
  try {
    const key = crypto.scryptSync(cryptoKeyDefault, 'salt', 32);
    const iv = Buffer.alloc(16, 0);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  } catch (error) {
    console.log('encrypt', error);
    return null;
  }
};

const Decrypt = (cipher: string): string | null => {
  try {
    const key = crypto.scryptSync(cryptoKeyDefault, 'salt', 32);
    const iv = Buffer.alloc(16, 0); // Initialization vector.

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    const encrypted = cipher;

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.log('decrypt', error);
    return null;
  }
};

export { Encrypt, Decrypt };
