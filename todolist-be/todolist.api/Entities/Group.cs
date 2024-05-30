namespace todolist.api.Entities;

public class Group
{
  public int Id { get; set;}

  public required string Name { get; set;}

  public ICollection<Todo> Todos { get; } = new List<Todo>();
}
