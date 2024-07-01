using FishManagementSystem.DBModels.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishManagementSystem.DBModels.Models
{
    /// <summary>
    /// 组织架构-角色 关联
    /// </summary>
    public class TOrganizationRoleMap : ModelBase
    {
        public string OrgId { get; set; }

        public string RoleId { get; set; }

        public int? Status { get; set; }

    }
}
