using FishManagementSystem.DBModels.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishManagementSystem.DBModels.Models
{
    public class TDataTable : ModelBase
    {
        //数据表，前端使用ID，匹配对应表，防止暴露表名字

        public string TableName { get; set; }


    }
}
