using AutoMapper;
using FishManagementSystem.Commons;
using FishManagementSystem.IBussinessService;
using FishManagementSystem.JWT;
using FishManagementSystem.SSO.ReqDto;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FishManagementSystem.SSO.Controllers
{
    /// <summary>
    /// 更新令牌
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class RefreshTokenController : ControllerBase
    {
        public readonly IDataService _dataService;
        public readonly ILogger<RefreshTokenController> _logger;
        public readonly IMapper _mapper;

        public readonly JwtToken _jwtToken;

        /// <summary>
        /// 构造方法
        /// </summary>
        /// <param name="dataService"></param>
        /// <param name="logger"></param>
        /// <param name="mapper"></param>
        public RefreshTokenController(IDataService dataService, ILogger<RefreshTokenController> logger, IMapper mapper, JwtToken jwtToken)
        {
            _dataService = dataService;
            _logger = logger;
            _mapper = mapper;
            _jwtToken = jwtToken;
        }


        /// <summary>
        /// 更新令牌
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        public ApiResult Post(ReqTokenDto reqTokenDto)
        {

            return null;

        }

      
    }
}
