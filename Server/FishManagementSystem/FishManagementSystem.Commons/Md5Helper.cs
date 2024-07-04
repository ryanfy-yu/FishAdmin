using System.Security.Cryptography;
using System.Text;

namespace FishManagementSystem.Commons
{
    public static class Md5Helper
    {
        public static string Md5_StringBuilder(string input)
        {
            using var md5 = MD5.Create();
            var inputBytes = Encoding.UTF8.GetBytes(input);
            var hashBytes = md5.ComputeHash(inputBytes);
            var sb = new StringBuilder();
            foreach (var hashByte in hashBytes)
            {
                sb.Append(hashByte.ToString("X2"));
            }
            return sb.ToString();
        }
    }
}
