using AutoMapper;
using FishManagementSystem.Commons;
using FishManagementSystem.DBModels.Models;
using FishManagementSystem.DTO;
using FishManagementSystem.IBussinessService;
using FishManagementSystem.Mapping;
using FishManagementSystem.Server.ReqDto;
using FishManagementSystem.Server.Utils;
using FishManagementSystem.Swagger;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SqlSugar;
using System.Linq.Expressions;
using System.Reflection;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace FishManagementSystem.Server.Controllers.User
{
    /// <summary>
    /// 系统用户
    /// </summary>
    public class LoggedUserInfoController : FishControllerBase
    {
        public readonly ISystemUsersDataService _dataService;


        public LoggedUserInfoController(ISystemUsersDataService dataService, IMapper mapper, ILogger<LoggedUserInfoController> logger) : base(logger, mapper)
        {
            _dataService = dataService;

        }
        /// <summary>
        /// 获取列表数据
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        [HttpGet]
        [ApiExplorerSettings(GroupName = nameof(ApiVersion.v1))]
        public ApiResult Get()
        {

            try
            {
                var data = _dataService.Get<TSystemMenu>(o => o.MenuType != 3);

                return new ApiResult()
                {
                    Data = new { menus = data },
                    IsSuccess = true,
                };
            }
            catch (Exception ex)
            {
                return new ApiResult()
                {
                    Error = ex.Message,
                    IsSuccess = false,

                };
            }
        }








    }
}
