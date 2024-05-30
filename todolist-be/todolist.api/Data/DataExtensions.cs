using Microsoft.EntityFrameworkCore;

namespace todolist.api.Data;

public static class DataExtensions
{
  public static async Task MigrateDbAsync(this WebApplication app)
  {
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<TodolistContext>();
    await dbContext.Database.MigrateAsync();
  }
}
