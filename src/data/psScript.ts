import CryptoJS from 'crypto-js';

const secretKey = '2031c44d3fccc96938b308a8a66dad4b'; // Asegúrate de que la clave tenga 32 bytes
const iv = CryptoJS.lib.WordArray.random(16); // Genera un IV aleatorio de 16 bytes

interface EncryptedData {
  iv: string;
  password: string;
}

export const encryptPassword = (password: string): EncryptedData => {
  const encrypted = CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse(secretKey), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return {
    iv: iv.toString(CryptoJS.enc.Hex),
    password: encrypted.toString()
  };
};

