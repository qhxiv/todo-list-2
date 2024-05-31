using System.ComponentModel.DataAnnotations;

namespace todolist.api.Dtos.Todo;

public record class UpdateTodoDto(
  int GroupId,
  [Required] string Name,
  string Description,
  bool Done
);

