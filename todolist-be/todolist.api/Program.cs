using todolist.api.Data;
using todolist.api.Endpoints;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
var connString = builder.Configuration.GetConnectionString("todolist");

builder.Services.AddSqlServer<TodolistContext>(connString);
builder.Services.AddCors(options =>
{
  options.AddPolicy(name: MyAllowSpecificOrigins,
                    policy =>
                    {
                      policy.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
});

var app = builder.Build();

app.MapGroupsEndpoints();
app.MapTodosEndpoints();

app.UseCors(MyAllowSpecificOrigins);

await app.MigrateDbAsync();

app.Run();