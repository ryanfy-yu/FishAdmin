﻿namespace FishManagementSystem.Server.ReqDto
{
    public class ReqPaginationDto
    {

        public string ModuleId { get; set; }

        public int CurrentPage { get; set; }

        public int PageSize { get; set; }

        public string? OrderProp { get; set; }

        public string? Orderby { get; set; }


        public string SearchBody { get; set; }
    }
}
