using FishManagementSystem.DBModels.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishManagementSystem.DBModels.Models
{
    public class TSystemMenu : ModelBase
    {
        /// <summary>
        /// 上级菜单
        /// </summary>
        public string? ParentId { get; set; }

        public int? Index { get; set; }

        public bool Closable { get; set; }

        public string MenuName { get; set; }

        public string MenuCode { get; set; }

        public int? MenuType { get; set; }

        public string? Icon { get; set; }

        /// <summary>
        /// http地址
        /// </summary>
        public string Url { get; set; }


        /// <summary>
        /// 视图文件地址
        /// </summary>
        public string ViewUrl { get; set; }

        public int? Sort { get; set; }

        public int? Status { get; set; }


    }
}
