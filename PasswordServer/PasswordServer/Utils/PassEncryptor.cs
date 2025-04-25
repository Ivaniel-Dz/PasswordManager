using System.Security.Cryptography;
using System.Text;

namespace PasswordServer.Utils
{
    public class PassEncryptor
    {
        private readonly string key = "MiClaveSecretaDeCifrado!"; // Asegúrate de usar una clave de 16, 24 o 32 bytes
        private readonly byte[] iv = new byte[16]; // IV fijo o puedes usar uno aleatorio para mayor seguridad

        // Método para cifrar la contraseña
        public string Encrypt(string password)
        {
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = Encoding.UTF8.GetBytes(key);  // Clave de cifrado
                aesAlg.IV = iv; // Vector de inicialización (IV)

                using (ICryptoTransform encryptor = aesAlg.CreateEncryptor())
                using (MemoryStream ms = new MemoryStream())
                using (CryptoStream cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                {
                    // Escribe la contraseña cifrada
                    using (StreamWriter sw = new StreamWriter(cs))
                    {
                        sw.Write(password);
                    }
                    // Devuelve el texto cifrado en base64
                    return Convert.ToBase64String(ms.ToArray());
                }
            }
        }

        // Método para descifrar la contraseña
        public string Decrypt(string password)
        {
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = Encoding.UTF8.GetBytes(key);
                aesAlg.IV = iv;

                using (ICryptoTransform decryptor = aesAlg.CreateDecryptor())
                using (MemoryStream ms = new MemoryStream(Convert.FromBase64String(password)))
                using (CryptoStream cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                using (StreamReader sr = new StreamReader(cs))
                {
                    // Lee y devuelve la contraseña descifrada
                    return sr.ReadToEnd();
                }
            }
        }

    } // Fin Class
} // Fin namespace
