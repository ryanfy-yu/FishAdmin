using FishManagementSystem.DBModels.Utils;
using FishManagementSystem.IBussinessService;
using FishManagementSystem.IDBModels;
using SqlSugar;
using SqlSugar.DistributedSystem.Snowflake;
using SqlSugar.Extensions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace FishManagementSystem.BusinessService
{
    public class ReflectionDataService
    {

        private Type _serviceType;
        private Type _modelType;

        public ReflectionDataService(string dataTableName)
        {

            var modelPath = Path.Combine(AppContext.BaseDirectory, "FishManagementSystem.DBModels.dll");
            Assembly mockAssembly = Assembly.LoadFrom(modelPath);
            _modelType = mockAssembly.GetTypes().Where(x => x.BaseType == typeof(ModelBase) && String.Equals(x.Name, dataTableName, StringComparison.CurrentCultureIgnoreCase)).FirstOrDefault();



        }


        public object? Get(IDataService service, string id)
        {

            _serviceType = service.GetType();

            var doWorkMethod = _serviceType.GetMethods().Where(o => o.Name == "Get" && o.GetParameters().Length == 1).FirstOrDefault();

            if (_modelType.IsClass && !_modelType.IsAbstract)
            {
                MethodInfo curMethod = doWorkMethod.MakeGenericMethod(_modelType);
                var result = curMethod.Invoke(service, [id]);

                return result;
            }

            return null;

        }


        public object? Get(IDataService service, int pagenumber, int pageSize, ref int totalCount, ref int totalPage, List<IConditionalModel>? condList, List<OrderByModel>? orderbyModerList)
        {

            _serviceType = service.GetType();

            var doWorkMethod = _serviceType.GetMethods().Where(o => o.Name == "Get" && o.GetParameters().Length == 6).FirstOrDefault();

            object[] param = new object[] { pagenumber, pageSize, totalCount, totalPage, condList, orderbyModerList };




            if (_modelType.IsClass && !_modelType.IsAbstract)
            {
                MethodInfo curMethod = doWorkMethod.MakeGenericMethod(_modelType);

                var result = curMethod.Invoke(service, param);

                pageSize = param[1].ObjToInt();

                totalCount = param[2].ObjToInt();

                return result;
            }

            return null;

        }


        public bool Add(IDataService service, Dictionary<string, object> model)
        {

            _serviceType = service.GetType();

            var doWorkMethod = _serviceType.GetMethods().Where(o => o.Name == "Add" && o.GetParameters().Length == 1).FirstOrDefault();

            if (_modelType.IsClass && !_modelType.IsAbstract)
            {
                MethodInfo curMethod = doWorkMethod.MakeGenericMethod(_modelType);
                var result = (bool)curMethod.Invoke(service, [model]);

                return result;
            }

            return false;

        }

        public bool Update(IDataService service, Dictionary<string, object> model)
        {

            _serviceType = service.GetType();

            var doWorkMethod = _serviceType.GetMethods().Where(o => o.Name == "Update" && o.GetParameters().Length == 1).FirstOrDefault();

            if (_modelType.IsClass && !_modelType.IsAbstract)
            {
                MethodInfo curMethod = doWorkMethod.MakeGenericMethod(_modelType);
                var result = (bool)curMethod.Invoke(service, [model]);

                return result;
            }

            return false;

        }

        public bool Delete(IDataService service, string id)
        {

            _serviceType = service.GetType();

            var doWorkMethod = _serviceType.GetMethods().Where(o => o.Name == "Delete" && o.GetParameters().Length == 1).FirstOrDefault();

            if (_modelType.IsClass && !_modelType.IsAbstract)
            {
                MethodInfo curMethod = doWorkMethod.MakeGenericMethod(_modelType);
                var result = (bool)curMethod.Invoke(service, [id]);

                return result;
            }

            return false;

        }

    }
}
