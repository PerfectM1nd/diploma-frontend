import CryptoJS from 'crypto-js';

export function encryptStringAES(word: string, key: string) {
  const encJson = CryptoJS.AES.encrypt(JSON.stringify(word), key).toString();
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
}

export function decryptStringAES(word: string, key: string) {
  const decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8);
  const bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8);
  return JSON.parse(bytes);
}

export function generateRSAPrivateKey(passPhrase: string, bits = 1024) {
  return cryptico.generateRSAKey(passPhrase, bits);
}

export function generateRSAPublicKey(privateKey: string) {
  return cryptico.publicKeyString(privateKey);
}

export function encryptStringRSA(text: string, publicKey: string) {
  return cryptico.encrypt(text, publicKey);
}

export function decryptStringRSA(text: string, privateKey: string) {
  return cryptico.decrypt(text, privateKey);
}
