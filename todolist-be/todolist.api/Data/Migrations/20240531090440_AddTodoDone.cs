using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace todolist.api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddTodoDone : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Done",
                table: "Todos",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Done",
                table: "Todos");
        }
    }
}
