using FishManagementSystem.DBModels.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishManagementSystem.DBModels.Models
{
    public class TDictionaries : ModelBase
    {

        public string GroupName { get; set; }

        public string Key { get; set; }

        public string Name { get; set; }

        public string Label { get; set; }

        public string? Value { get; set; }

        public string? Description { get; set; }

    }
}
