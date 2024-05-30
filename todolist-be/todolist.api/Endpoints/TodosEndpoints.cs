using Microsoft.EntityFrameworkCore;
using todolist.api.Data;
using todolist.api.Dtos.Todo;
using todolist.api.Entities;
using todolist.api.Mapping;

namespace todolist.api.Endpoints;

public static class TodosEndpoints
{
  public const string GetTodoEndpointName = "GetTodo";

  public static RouteGroupBuilder MapTodosEndpoints(this WebApplication app)
  {
    var group = app.MapGroup("todos")
                   .WithParameterValidation();

    // GET /todos
    group.MapGet("/", async (TodolistContext dbContext) =>
      await dbContext.Todos
                     .Select(todo => todo.ToDto())
                     .AsNoTracking()
                     .ToListAsync());

    // GET /todos/1
    group.MapGet("/{id}", async (int id, TodolistContext dbContext) =>
    {
      Todo? todo = await dbContext.Todos.FindAsync(id);

      return todo is null ?
        Results.NotFound() : Results.Ok(todo.ToDto());
    })
    .WithName(GetTodoEndpointName);

    // DELETE /todos/1
    group.MapDelete("/{id}", async (int id, TodolistContext dbContext) =>
    {
      await dbContext.Todos
                     .Where(todo => todo.Id == id)
                     .ExecuteDeleteAsync();

      return Results.NoContent();
    });

    return group;
  }
}
