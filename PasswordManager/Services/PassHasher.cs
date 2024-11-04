using System.Security.Cryptography;
using System.Text;

namespace PasswordManager.Services
{
    public class PassHasher
    {
        // Confirmado que este método es correcto para hashing simple sin sal.
        public string EncryptPass(string texto)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(texto));
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

    }
}
