FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY . .

RUN dotnet restore

RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app .

ENV MongoDB__ConnectionString=mongodb://root:example@mongo:27017
ENV MongoDB__DatabaseName=InxtractDB

ENTRYPOINT ["dotnet", "Backend.dll"]

EXPOSE 80
