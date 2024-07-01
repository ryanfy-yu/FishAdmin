﻿using AutoMapper;
using FishManagementSystem.Commons;
using FishManagementSystem.DBModels.Models;
using FishManagementSystem.IBussinessService;
using FishManagementSystem.Server.Utils;
using FishManagementSystem.Swagger;
using Microsoft.AspNetCore.Mvc;

namespace FishManagementSystem.Server.Controllers.Dictionaries
{
    /// <summary>
    /// Selection
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class SelectionController : FishControllerBase
    {
        public readonly IDataService _dataService;


        public SelectionController(IDataService dataService, IMapper mapper, ILogger<SelectionController> logger) : base(logger, mapper)
        {
            _dataService = dataService;

        }
        /// <summary>
        /// 获取字典Group数据
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        [HttpGet]
        [ApiExplorerSettings(GroupName = nameof(ApiVersion.v1))]
        public ApiResult Get()
        {


            var data = _dataService.Get<TDictionaries>();

            return new ApiResult()
            {
                Data = data,
                IsSuccess = true,
            };

        }




    }
}