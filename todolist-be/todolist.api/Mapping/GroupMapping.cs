using todolist.api.Dtos.Group;
using todolist.api.Entities;

namespace todolist.api.Mapping;

public static class GroupMapping
{
  public static GroupSummaryDto ToGroupSummaryDto(this Group group)
  {
    return new(
      group.Id,
      group.Name
    );
  }

  public static GroupDetailsDto ToGroupDetailsDto(this Group group)
  {
    return new(
      group.Id,
      group.Name,
      group.Todos
    );
  }

  public static Group ToEntity(this CreateGroupDto dto)
  {
    return new Group()
    {
      Name = dto.Name
    };
  }

  public static Group ToEntity(this CreateGroupDto dto, int id)
  {
    return new Group()
    {
      Id = id,
      Name = dto.Name
    };
  }
}
