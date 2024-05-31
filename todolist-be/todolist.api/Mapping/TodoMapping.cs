using todolist.api.Dtos.Todo;
using todolist.api.Entities;

namespace todolist.api.Mapping;

public static class TodoMapping
{
  public static Todo ToEntity(this CreateTodoDto dto, int groupId)
  {
    return new Todo()
    {
      GroupId = groupId,
      Name = dto.Name,
      Description = dto.Description,
      Done = false
    };
  }

  public static Todo ToEntity(this UpdateTodoDto dto, int id)
  {
    return new Todo()
    {
      Id = id,
      GroupId = dto.GroupId,
      Name = dto.Name,
      Description = dto.Description,
      Done = dto.Done
    };
  }

  public static TodoDto ToDto(this Todo todo)
  {
    return new (
      todo.Id,
      todo.GroupId,
      todo.Name,
      todo.Description,
      todo.Done
    );
  }
}
