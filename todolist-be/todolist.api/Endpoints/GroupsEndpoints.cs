using Microsoft.EntityFrameworkCore;
using todolist.api.Data;
using todolist.api.Dtos.Group;
using todolist.api.Dtos.Todo;
using todolist.api.Entities;
using todolist.api.Mapping;

namespace todolist.api.Endpoints;

public static class GroupsEndpoints
{
  const string GetGroupEndpointName = "GetGroup";

  public static RouteGroupBuilder MapGroupsEndpoints(this WebApplication app)
  {
    var mapGroup = app.MapGroup("groups")
                      .WithParameterValidation();

    // GET /groups
    mapGroup.MapGet("/", async (TodolistContext dbContext) =>
      await dbContext.Groups
                     .Select(group => group.ToGroupSummaryDto())
                     .AsNoTracking()
                     .ToListAsync());
    
    // GET /groups/1
    mapGroup.MapGet("/{id}", async (int id, TodolistContext dbContext) =>
    {
      Group? group = await dbContext.Groups.FindAsync(id);

      return group is null ?
        Results.NotFound() : Results.Ok(group.ToGroupDetailsDto());
    })
    .WithName(GetGroupEndpointName);

    // POST /groups
    mapGroup.MapPost("/", async (CreateGroupDto newGroup, TodolistContext dbContext) =>
    {
      Group group = newGroup.ToEntity();

      dbContext.Groups.Add(group);
      await dbContext.SaveChangesAsync();

      return Results.CreatedAtRoute(
        GetGroupEndpointName,
        new { id = group.Id },
        group.ToGroupSummaryDto()
      );
    });

    // PUT /groups/1
    mapGroup.MapPut("/{id}", async (int id, CreateGroupDto updatedGroup, TodolistContext dbContext) =>
    {
      var existingGroup = await dbContext.Groups.FindAsync(id);

      if (existingGroup is null)
        return Results.NotFound();

      dbContext.Entry(existingGroup)
               .CurrentValues
               .SetValues(updatedGroup.ToEntity(id));

      await dbContext.SaveChangesAsync();

      return Results.NoContent();
    });

    // DELETE /groups/1
    mapGroup.MapDelete("/{id}", async (int id, TodolistContext dbContext) =>
    {
      await dbContext.Todos
                     .Where(todo => todo.GroupId == id)
                     .ExecuteDeleteAsync();

      await dbContext.Groups
                     .Where(group => group.Id == id)
                     .ExecuteDeleteAsync();

      return Results.NoContent();
    });

    // POST groups/1
    mapGroup.MapPost("/{id}", async (int id, CreateTodoDto newTodo, TodolistContext dbContext) =>
    {
      Todo todo = newTodo.ToEntity(id);

      dbContext.Todos.Add(todo);
      await dbContext.SaveChangesAsync();

      return Results.CreatedAtRoute(
        TodosEndpoints.GetTodoEndpointName,
        new { id = todo.Id },
        todo.ToDto()
      );
    });

    // GET groups/1/todos
    mapGroup.MapGet("/{id}/todos", async (int id, TodolistContext dbContext) =>
      await dbContext.Todos
                     .Where(todo => todo.GroupId == id)
                     .Select(todo => todo.ToDto())
                     .AsNoTracking()
                     .ToListAsync());

    // PUT groups/1/todos/1
    mapGroup.MapPut("/{groupId}/todos/{todoId}", async (int groupId, int todoId, UpdateTodoDto updatedTodo, TodolistContext dbContext) =>
    {
      var existingTodo = await dbContext.Todos.FindAsync(todoId);

      if (existingTodo is null)
        return Results.NotFound();

      dbContext.Entry(existingTodo)
               .CurrentValues
               .SetValues(updatedTodo.ToEntity(todoId));

      await dbContext.SaveChangesAsync();

      return Results.NoContent();
    });

    return mapGroup;
  }
}
