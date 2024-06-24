using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FishManagementSystem.JWT
{
    public class JwtToken
    {

        private readonly IConfiguration _Configuration;

        private readonly JwtSecurityTokenHandler _JwtSecurityTokenHandler;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="configuration"></param>
        public JwtToken(IConfiguration configuration)
        {
            _Configuration = configuration;

            _JwtSecurityTokenHandler = new JwtSecurityTokenHandler();


        }

        /// <summary>
        /// GetToken
        /// </summary>
        /// <param name="tokenType"></param>
        /// <param name="username"></param>
        /// <param name="_expired"></param>
        /// <returns></returns>
        public string CreateToken(TokenType tokenType, string username)
        {

            var jwtConfig = _Configuration.GetSection("JwtConfig");
            string _secretKey = jwtConfig.GetValue<string>("SecretKey") ?? string.Empty;
            string _issuer = jwtConfig.GetValue<string>("Issuer") ?? string.Empty;
            string _audience = jwtConfig.GetValue<string>("Audience") ?? string.Empty;

            int _expired = 0;

            if (TokenType.Access == tokenType)
            {
                _expired = jwtConfig.GetValue<int>("Access_Expired");

            }
            else
            {
                _expired = jwtConfig.GetValue<int>("Refresh_Expired");

            }


            // 1. 定义需要使用到的Claims
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Iss,_issuer),
                new Claim(JwtRegisteredClaimNames.Aud,_audience),
                new Claim("Guid",Guid.NewGuid().ToString("D")),
                new Claim("user",username),
                new Claim("type",nameof(tokenType)),
                new Claim(ClaimTypes.Role,nameof(tokenType)),
                //new Claim(ClaimTypes.Role,"admin"),
             };

            // 2. 从 appsettings.json 中读取SecretKey
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));

            // 3. 选择加密算法
            var algorithm = SecurityAlgorithms.HmacSha256;

            // 4. 生成Credentials
            var signingCredentials = new SigningCredentials(secretKey, algorithm);



            // 5. 根据以上，生成token
            var jwtSecurityToken = new JwtSecurityToken(
                _issuer,     //Issuer
                _audience,   //Audience
                claims,                          //Claims,
                DateTime.Now,                    //notBefore
                DateTime.Now.AddMinutes(_expired),//expires
                signingCredentials               //Credentials
            );

            // 6. 将token变为string
            var token = _JwtSecurityTokenHandler.WriteToken(jwtSecurityToken);

            return token;
        }


        /// <summary>
        /// ;验证并返回user
        /// </summary>
        /// <param name="token"></param>
        /// <param name="overMinutes"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public bool ValidateToken(string token, int overMinutes, ref string user)
        {
            var jwtConfig = _Configuration.GetSection("JwtConfig");
            string _secretKey = jwtConfig.GetValue<string>("SecretKey") ?? string.Empty;
            string _issuer = jwtConfig.GetValue<string>("Issuer") ?? string.Empty;
            string _audience = jwtConfig.GetValue<string>("Audience") ?? string.Empty;


            JwtSecurityToken securityToken = _JwtSecurityTokenHandler.ReadJwtToken(token);

            TimeSpan ts = securityToken.ValidFrom - DateTime.Now;
            int TimeConsuming = Convert.ToInt32(ts.TotalMinutes);

            if (TimeConsuming > overMinutes) return false;

            if (securityToken.Issuer == _issuer) return false;

            if (!securityToken.Audiences.Any(o => o == _audience)) return false;


            user = securityToken.Claims.FirstOrDefault(o => o.Type == "user").Value ?? string.Empty;


            return true;


        }
    }
}
