using todolist.api.Entities;

namespace todolist.api;

public record class GroupDetailsDto(
  int Id,
  string Name,
  ICollection<Todo> Todos
);
