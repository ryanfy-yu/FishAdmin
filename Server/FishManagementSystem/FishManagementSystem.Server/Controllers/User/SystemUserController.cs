﻿using AutoMapper;
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
    public class SystemUserController : FishControllerBase
    {
        public readonly ISystemUsersDataService _dataService;


        public SystemUserController(ISystemUsersDataService dataService, IMapper mapper, ILogger<SystemUserController> logger) : base(logger, mapper)
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
        public ApiResult Get([FromQuery] ReqPaginationDto dto)
        {

            try
            {

                int total = 0;
                int totalPages = 0;

                //排序
                List<OrderByModel> orderList = null;
                if (!string.IsNullOrEmpty(dto.OrderProp))
                {
                    orderList = OrderByModel.Create(
                      new OrderByModel() { FieldName = dto.OrderProp, OrderByType = dto.Orderby.Contains("desc") ? OrderByType.Desc : OrderByType.Asc }
                     );
                }

                //组装查询条件
                var conModels = new List<IConditionalModel>();
                if (dto.SearchBody != null)
                {
                    var dic = JsonConvert.DeserializeObject<Dictionary<string, string>>(dto.SearchBody);

                    foreach (var key in dic.Keys)
                    {
                        string value = dic[key];

                        conModels.Add(new ConditionalModel { FieldName = key, ConditionalType = ConditionalType.Like, FieldValue = value });

                    }
                }

                var data = _dataService.Get<TSystemUsers>(dto.CurrentPage, dto.PageSize, ref total, ref totalPages, conModels, orderList);

                return new ApiResult()
                {
                    Data = new { data = data, total = total, totalPages = totalPages },
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

        /// <summary>
        /// 提交数据
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [ApiExplorerSettings(GroupName = nameof(ApiVersion.v1))]
        public ApiResult Post(Dictionary<string, object> dto)
        {


            dto["password"] = Md5Helper.Md5_StringBuilder(dto["password"].ToString());

            var result = _dataService.Add<TSystemUsers>(dto);



            if (result)
            {
                return new ApiResult()
                {
                    IsSuccess = true,

                };
            }
            else
            {
                return new ApiResult()
                {
                    IsSuccess = false,

                };

            }

        }

        /// <summary>
        /// 更新数据
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        [ApiExplorerSettings(GroupName = nameof(ApiVersion.v1))]
        public ApiResult Put(Dictionary<string, object> dto)
        {
            var result = _dataService.Update<TSystemUsers>(dto);

            if (result)
            {
                return new ApiResult()
                {
                    IsSuccess = true,

                };
            }
            else
            {
                return new ApiResult()
                {
                    IsSuccess = false,

                };

            }

        }


        /// <summary>
        /// 刪除数据
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        [ApiExplorerSettings(GroupName = nameof(ApiVersion.v1))]
        public ApiResult Delete(string id)
        {
            var result = _dataService.Delete<TSystemUsers>(id);


            if (result)
            {
                return new ApiResult()
                {
                    IsSuccess = true,

                };
            }
            else
            {
                return new ApiResult()
                {
                    IsSuccess = false,

                };

            }



        }


    }
}
