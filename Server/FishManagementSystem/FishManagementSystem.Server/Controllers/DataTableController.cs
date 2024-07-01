using AutoMapper;
using FishManagementSystem.BusinessService;
using FishManagementSystem.Commons;
using FishManagementSystem.DBModels.Models;
using FishManagementSystem.IBussinessService;
using FishManagementSystem.Server.ReqDto;
using FishManagementSystem.Server.Utils;
using FishManagementSystem.Swagger;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SqlSugar;
using System.Collections;

namespace FishManagementSystem.Server.Controllers.Dictionaries
{
    /// <summary>
    /// 单表查询
    /// </summary>
    public class DataTableController : FishControllerBase
    {
        public readonly IDataService _dataService;


        public DataTableController(IDataService dataService, IMapper mapper, ILogger<DataTableController> logger) : base(logger, mapper)
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

                    var dic = JsonConvert.DeserializeObject<Dictionary<string, object>>(dto.SearchBody);


                    foreach (var key in dic.Keys)
                    {

                        if (dic[key].ToString().IndexOf("[") < 0)
                        {
                            dic[key] = $"['{dic[key]}']";
                        }


                        var value = JsonConvert.DeserializeObject<string[]>(dic[key].ToString());


                        if (value.Length > 1)
                        {

                            conModels.Add(new ConditionalModel { FieldName = key, ConditionalType = ConditionalType.GreaterThanOrEqual, FieldValue = value[0] });
                            conModels.Add(new ConditionalModel { FieldName = key, ConditionalType = ConditionalType.LessThanOrEqual, FieldValue = value[1] });
                        }
                        else
                        {
                            conModels.Add(new ConditionalModel { FieldName = key, ConditionalType = ConditionalType.Like, FieldValue = value[0].ToString() });

                        }

                    }
                }

                //  var data = _dataService.Get<TDictionaries>(dto.CurrentPage, dto.PageSize, ref total, ref totalPages, conModels, orderList);

                //獲取數據表名
                var entity = _dataService.Get<TDataTable>(dto.ModuleId);

                ReflectionDataService service = new ReflectionDataService(entity.TableName);


                var data = service.Get(_dataService, dto.CurrentPage, dto.PageSize, ref total, ref totalPages, conModels, orderList);


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
        public ApiResult Post(string moduleid, Dictionary<string, object> dto)
        {
            //var result = _dataService.Add<TDictionaries>(dto);


            //獲取數據表名
            var entity = _dataService.Get<TDataTable>(moduleid);

            ReflectionDataService service = new ReflectionDataService(entity.TableName);

            var result = service.Add(_dataService, dto);

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
        public ApiResult Put(string moduleid, Dictionary<string, object> dto)
        {
            //獲取數據表名
            var entity = _dataService.Get<TDataTable>(moduleid);

            ReflectionDataService service = new ReflectionDataService(entity.TableName);

            var result = service.Update(_dataService, dto);

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
        public ApiResult Delete(string moduleid, string id)
        {
            //獲取數據表名
            var entity = _dataService.Get<TDataTable>(moduleid);

            ReflectionDataService service = new ReflectionDataService(entity.TableName);

            var result = service.Delete(_dataService, id);

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
