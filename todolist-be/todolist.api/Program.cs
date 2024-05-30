using todolist.api.Data;
using todolist.api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration.GetConnectionString("todolist");
builder.Services.AddSqlServer<TodolistContext>(connString);

var app = builder.Build();

app.MapGroupsEndpoints();
app.MapTodosEndpoints();

await app.MigrateDbAsync();

app.Run();