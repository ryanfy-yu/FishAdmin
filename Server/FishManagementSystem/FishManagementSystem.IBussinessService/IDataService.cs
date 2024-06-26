using FishManagementSystem.IDBModels;
using SqlSugar;
using System.Linq.Expressions;

namespace FishManagementSystem.IBussinessService
{
    public interface IDataService
    {

        public int GetCount<T>() where T : IModel, new();


        public int GetCount<T>(Expression<Func<T, bool>> exp) where T : IModel, new();


        public T Get<T>(string id) where T : IModel, new();

        public List<T> Get<T>(int pagenumber, int pageSize, ref int totalCount, ref int totalPage, List<IConditionalModel>? condList, List<OrderByModel>? orderbymoderList) where T : IModel, new();

        public List<T> Get<T>() where T : IModel, new();


        public List<T> Get<T>(Expression<Func<T, bool>> exp) where T : IModel, new();


        public bool Add<T>(Dictionary<string, object> model) where T : IModel, new();


        public int Add<T>(List<Dictionary<string, object>> list) where T : IModel, new();



        public bool Delete<T>(string id) where T : IModel, new();


        public int Delete<T>(List<string> ids) where T : IModel, new();


        public bool Update<T>(Dictionary<string, object> model) where T : IModel, new();

        public bool Update<T>(T model) where T : IModel, new();


        public int Update<T>(List<Dictionary<string,object>> list) where T : IModel, new();

        public int Update<T>(List<T> list) where T : IModel, new();
    }
}
