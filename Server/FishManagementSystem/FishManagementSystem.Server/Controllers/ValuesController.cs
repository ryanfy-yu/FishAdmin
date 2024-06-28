using AutoMapper;
using FishManagementSystem.BusinessService;
using FishManagementSystem.Commons;
using FishManagementSystem.DBModels.Models;
using FishManagementSystem.IBussinessService;
using FishManagementSystem.Server.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FishManagementSystem.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        public readonly IDataService _dataService;


        public ValuesController(IDataService dataService)
        {
            _dataService = dataService;

        }

        // GET: api/<ValuesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{moduleId}")]
        public ApiResult Get(string moduleId)
        {

            var entity = _dataService.Get<TDataTable>(moduleId);

            ReflectionDataService service = new ReflectionDataService(entity.TableName);


            int totalCount = 0;
            int pagetotal = 0;
            var data = service.Get(_dataService,1,20,ref totalCount,ref pagetotal,new List<SqlSugar.IConditionalModel>(),new List<SqlSugar.OrderByModel>());


            return new ApiResult()
            {
                IsSuccess = true,
                Data = data
            };


        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
