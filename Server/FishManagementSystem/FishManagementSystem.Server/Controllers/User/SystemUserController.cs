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
using SqlSugar;
using System.Linq.Expressions;
using System.Reflection;

namespace FishManagementSystem.Server.Controllers.User
{
    /// <summary>
    /// 系统用户
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class SystemUserController : FishControllerBase
    {
        public readonly ISystemUsersDataService _dataService;


        public SystemUserController(ISystemUsersDataService dataService, IMapper mapper, ILogger<SystemUserController> logger) : base(logger, mapper)
        {
            _dataService = dataService;

        }

        /// <summary>
        /// GetSystemUsers
        /// </summary>
        /// <returns></returns>
        //[HttpGet]
        //[ApiExplorerSettings(GroupName = nameof(ApiVersion.v1))]
        //public ApiResult Get()
        //{
        //    //_logger.LogInformation("i am here");
        //    var data = _dataService.GetSystemUserInfoList();

        //    //var dtoData = _mapper.Map<List<SystemUsersDTO>>(data);

        //    return new ApiResult()
        //    {
        //        Data = data,
        //        IsSuccess = true,

        //    };

        //}

        /// <summary>
        /// GetSystemUsers
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [ApiExplorerSettings(GroupName = nameof(ApiVersion.v1))]
        public ApiResult Post(ReqPaginationDto dto)
        {

            int total = 0;
            int totalPages = 0;

            List<OrderByModel> orderList = null;

            if (!string.IsNullOrEmpty(dto.OrderProp))
            {
                orderList = OrderByModel.Create(
                  new OrderByModel() { FieldName = dto.OrderProp, OrderByType = dto.Orderby.Contains("desc") ? OrderByType.Desc : OrderByType.Asc }
  );
            }

            //组装查询条件
            var conModels = new List<IConditionalModel>();
            if (dto.searchList != null && dto.searchList.Count > 0)
            {

                dto.searchList.ForEach(o =>
                {
                    conModels.Add(new ConditionalModel { FieldName = o.prop, ConditionalType = ConditionalType.Like, FieldValue = o.value });

                });

            }

            var data = _dataService.Get<TSystemUsers>(dto.CurrentPage, dto.PageSize, ref total, ref totalPages, conModels, orderList);

            return new ApiResult()
            {
                Data = new { data = data, total = total, totalPages = totalPages },
                IsSuccess = true,

            };

        }

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="users"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        //[HttpPost(Name = "AddSystemUser")]
        //public ApiResult AddSystemUser(string users, string password)
        //{
        //    _dataService.AddSystemUserInfo(users, password);


        //    var data = _dataService.GetSystemUserInfoList();

        //    var dtoData = _mapper.Map<List<SystemUsersDTO>>(data);

        //    return new ApiResult()
        //    {
        //        Data = dtoData,
        //        IsSuccess = true,

        //    };

        //}


    }
}
