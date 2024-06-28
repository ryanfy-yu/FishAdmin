using System.Reflection;

namespace FishManagementSystem.Server.Utils
{
    public class ModuleHandle
    {
        public void GetTa()
        {


            //通过反射调用
            //var assembly = Assembly.Load("XX");//XX是GenericClass<T>所在的程序集名称
            //Type typeOpen = assembly.GetType("XX.GenericClass`1");//注意泛型类型名称
            //                                                      //通过MakeGenericType()方法创建泛型类型
            //Type typeClosed = typeOpen.MakeGenericType(new Type[] { typeof(int) });
            //object oGenRefl = Activator.CreateInstance(typeClosed);

            //MethodInfo mi = typeClosed.GetMethod("Show");//没有重载时可以不指定方法参数类型
            //MethodInfo mi2 = mi.MakeGenericMethod(new Type[] { typeof(string), typeof(DateTime) });
            //mi2.Invoke(oGenRefl, new object[] { 12, "12", DateTime.Now });//注意泛型类型的匹配
            //                                                              //输出结果如下：
            //t.type = Int32,w.type = String,x.type = DateTime














        }
    }
}
