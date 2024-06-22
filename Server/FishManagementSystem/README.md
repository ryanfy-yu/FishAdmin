# 后台开发快速模板

# 使用 visual studio 2022 + visual studio Code 开发

# 前端使用 Vue 3 + element plus UI + axios

# 后端使用 Asp.net Core 8.0, Swagger, SqlSugar, log4net, nlog 双日志集成，Autofac, AutoMapper

#docker

SSO API： 
cd FishManagementSystem
docker build -t sso -f FishManagementSystem.SSO/Dockerfile .
docker run --restart=always -p 9080:8080 -p 9081:8081 -d sso


#常用命令
#删除未运行的容器
sudo docker container prune

