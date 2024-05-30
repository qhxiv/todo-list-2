namespace todolist.api.Dtos.Todo;

public record class TodoDto(
  int Id,
  int GroupId,
  string Name,
  string Description
);
