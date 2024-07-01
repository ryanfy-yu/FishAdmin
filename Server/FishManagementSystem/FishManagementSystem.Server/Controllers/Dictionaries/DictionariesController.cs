using AutoMapper;
using FishManagementSystem.Commons;
using FishManagementSystem.DBModels.Models;
using FishManagementSystem.IBussinessService;
using FishManagementSystem.Server.ReqDto;
using FishManagementSystem.Server.Utils;
using FishManagementSystem.Swagger;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SqlSugar;

namespace FishManagementSystem.Server.Controllers.Dictionaries
{
    /// <summary>
    /// 系统用户
    /// </summary>
    public class DictionariesController : FishControllerBase
    {
        public readonly IDataService _dataService;


        public DictionariesController(IDataService dataService, IMapper mapper, ILogger<DictionariesController> logger) : base(logger, mapper)
        {
            _dataService = dataService;

        }
        /// <summary>
        /// 获取列表数据
        /// </summary>
        /// <param name="dto"></param>
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

                var data = _dataService.Get<TDictionaries>(dto.CurrentPage, dto.PageSize, ref total, ref totalPages, conModels, orderList);

                return new ApiResult()
                {
                    Data = new { data, total, totalPages },
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
            var result = _dataService.Add<TDictionaries>(dto);

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
            var result = _dataService.Update<TDictionaries>(dto);

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
            var result = _dataService.Delete<TDictionaries>(id);


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
