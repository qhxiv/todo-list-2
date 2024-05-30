using System.ComponentModel.DataAnnotations;

namespace todolist.api.Dtos.Todo;

public record class CreateTodoDto(
  [Required] string Name,
  string Description
);
