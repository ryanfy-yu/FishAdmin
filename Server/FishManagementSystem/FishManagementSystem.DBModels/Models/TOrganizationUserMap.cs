using FishManagementSystem.DBModels.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishManagementSystem.DBModels.Models
{
    /// <summary>
    /// 组织架构-用户关联
    /// </summary>
    public class TOrganizationUserMap : ModelBase
    {
        public string OrgId { get; set; }

        public string UserId { get; set; }

        public int? Status { get; set; }

    }
}
