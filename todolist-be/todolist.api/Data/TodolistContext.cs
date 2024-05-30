using Microsoft.EntityFrameworkCore;
using todolist.api.Entities;

namespace todolist.api.Data;

public class TodolistContext(DbContextOptions<TodolistContext> options)
  : DbContext(options)
{
  public DbSet<Group> Groups => Set<Group>();
  
  public DbSet<Todo> Todos => Set<Todo>();
}
