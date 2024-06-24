using AutoMapper;
using FishManagementSystem.Commons;
using FishManagementSystem.DBModels.Models;
using FishManagementSystem.IBussinessService;
using FishManagementSystem.JWT;
using FishManagementSystem.SSO.ReqDto;
using FishManagementSystem.Swagger;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FishManagementSystem.SSO.Controllers
{
    /// <summary>
    /// 登录
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TokenValidController : ControllerBase
    {
        public readonly IDataService _dataService;
        public readonly ILogger<TokenValidController> _logger;
        public readonly IMapper _mapper;

        public readonly JwtToken _jwtToken;


        /// <summary>
        /// 构造方法
        /// </summary>
        /// <param name="dataService"></param>
        /// <param name="logger"></param>
        /// <param name="mapper"></param>
        public TokenValidController(IDataService dataService, ILogger<TokenValidController> logger, IMapper mapper, JwtToken jwtToken)
        {
            _dataService = dataService;
            _logger = logger;
            _mapper = mapper;
            _jwtToken = jwtToken;
        }

        /// <summary>
        /// 验证token是否可用
        /// </summary>
        /// <param name="usernameOrEmail"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpGet]
        [Authorize]
        [ApiExplorerSettings(GroupName = nameof(ApiVersion.v1))]
        public ApiResult Get()
        {
            return new ApiResult()
            {
                IsSuccess = true,
            };

        }

    }
}
