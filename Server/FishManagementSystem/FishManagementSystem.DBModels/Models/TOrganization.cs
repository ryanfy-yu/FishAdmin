using FishManagementSystem.DBModels.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishManagementSystem.DBModels.Models
{
    /// <summary>
    /// 组织架构表
    /// </summary>
    public class TOrganization : ModelBase
    {
        public string? ParentId { get; set; }

        public string NodeName { get; set; }

        /// <summary>
        /// 1公司或部门 2岗位
        /// </summary>
        public string NodeType { get; set; }


        public string Description { get; set; }


        public int? Status { get; set; }
    }
}
