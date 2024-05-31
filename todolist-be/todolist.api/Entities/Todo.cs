namespace todolist.api.Entities;

public class Todo
{
  public int Id { get; set; }

  public int GroupId { get; set; }

  public Group? Group { get; set; }

  public required string Name { get; set; }

  public string Description { get; set; } = "";

  public bool Done { get; set; } = false;
}
