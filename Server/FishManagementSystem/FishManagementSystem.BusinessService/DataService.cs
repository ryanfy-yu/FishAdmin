using Autofac.Extras.DynamicProxy;
using FishManagementSystem.AOP;
using FishManagementSystem.DBModels.Utils;
using FishManagementSystem.IBussinessService;
using FishManagementSystem.IDBModels;
using Microsoft.Extensions.Configuration;
using SqlSugar;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace FishManagementSystem.BusinessService
{
    public class DataService : IDisposable, IDataService
    {

        protected readonly ISqlSugarClient _db;


        public DataService(string dbConnectionString)
        {
            _db = new SqlSugarSetup(dbConnectionString).getDB();
        }

        public int GetCount<T>() where T : IModel, new()
        {
            return _db.Queryable<T>().Where(o => o.IsDeleted != true).Count();
        }

        public int GetCount<T>(Expression<Func<T, bool>> exp) where T : IModel, new()
        {
            return _db.Queryable<T>().Where(o => o.IsDeleted != true).Where(exp).Count();
        }

        public T Get<T>(string id) where T : IModel, new()
        {
            return _db.Queryable<T>().Where(it => it.Id == id && it.IsDeleted != true).First();
        }

        public List<T> Get<T>() where T : IModel, new()
        {
            return _db.Queryable<T>().Where(it => it.IsDeleted != true).OrderByDescending(o => o.CreateDate).ToList();
        }

        public List<T> Get<T>(Expression<Func<T, bool>> exp) where T : IModel, new()
        {
            return _db.Queryable<T>().Where(it => it.IsDeleted != true).Where(exp).OrderByDescending(o => o.CreateDate).ToList();
        }


        public List<T> Get<T>(int pagenumber, int pageSize, ref int totalCount, ref int totalPage, List<IConditionalModel>? condList, List<OrderByModel>? orderbyModerList) where T : IModel, new()
        {

            List<T>? resultList = null;

            if (condList != null && condList.Count > 0)
            {
                if (orderbyModerList != null && orderbyModerList.Count > 0)
                {

                    List<OrderByModel> _orderbyModerList = orderbyModerList.OfType<OrderByModel>().ToList();

                    resultList = _db.Queryable<T>().Where(it => it.IsDeleted != true).Where(condList).OrderBy(_orderbyModerList).ToPageList(pagenumber, pageSize, ref totalCount, ref totalPage);

                }
                else
                {
                    resultList = _db.Queryable<T>().Where(it => it.IsDeleted != true).Where(condList).OrderBy(o => SqlFunc.Desc(o.CreateDate)).ToPageList(pagenumber, pageSize, ref totalCount, ref totalPage);
                }
            }
            else
            {
                if (orderbyModerList != null && orderbyModerList.Count > 0)
                {
                    List<OrderByModel> _orderbyModerList = orderbyModerList.OfType<OrderByModel>().ToList();

                    resultList = _db.Queryable<T>().Where(it => it.IsDeleted != true).OrderBy(_orderbyModerList).ToPageList(pagenumber, pageSize, ref totalCount, ref totalPage);

                }
                else
                {
                    resultList = _db.Queryable<T>().Where(it => it.IsDeleted != true).OrderBy(o => SqlFunc.Desc(o.CreateDate)).ToPageList(pagenumber, pageSize, ref totalCount, ref totalPage);
                }
            }

            return resultList;
        }


        public bool Add<T>(Dictionary<string, object> model) where T : IModel, new()
        {

            model.Add("CreateDate", DateTime.Now);
            model.Add("IsDeleted", false);
            return _db.Insertable<T>(model).ExecuteCommand() > 0;
        }

        public int Add<T>(List<Dictionary<string, object>> list) where T : IModel, new()
        {

            list.ForEach(o =>
            {
                o.Add("CreateDate", DateTime.Now);
                o.Add("IsDeleted", false);

            });
            return _db.Insertable(list).ExecuteCommand();
        }


        public bool Delete<T>(string id) where T : IModel, new()
        {

            return _db.Updateable<T>().SetColumns(o => new T { IsDeleted = true, UpdateDate = DateTime.Now }).Where(o => o.Id == id).ExecuteCommand() > 0;

        }

        public int Delete<T>(List<T> list) where T : IModel, new()
        {
            foreach (var item in list)
            {
                item.IsDeleted = true;
                item.UpdateDate = DateTime.Now;
            }
            return _db.Updateable<T>(list).ExecuteCommand();
        }

        public int Delete<T>(List<string> ids) where T : IModel, new()
        {

            return _db.Updateable<T>().SetColumns(o => new T { IsDeleted = true, UpdateDate = DateTime.Now }).Where(o => ids.Contains(o.Id)).ExecuteCommand();
        }


        public bool Update<T>(Dictionary<string, object> model) where T : IModel, new()
        {
            model.Add("UpdateDate", DateTime.Now);
            return _db.Updateable<T>(model).ExecuteCommand() > 0;
        }


        public bool Update<T>(T model) where T : IModel, new()
        {
            model.UpdateDate = DateTime.Now;
            return _db.Updateable<T>(model).ExecuteCommand() > 0;
        }

        public int Update<T>(List<Dictionary<string, object>> list) where T : IModel, new()
        {

            list.ForEach(o => o.Add("UpdateDate", DateTime.Now));
            return _db.Updateable<T>(list).ExecuteCommand();
        }


        public int Update<T>(List<T> list) where T : IModel, new()
        {

            list.ForEach(o => o.UpdateDate = DateTime.Now);
            return _db.Updateable<T>(list).ExecuteCommand();
        }

        public void Dispose()
        {

            _db.Dispose();

        }


    }
}
