using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetZone.Services.Migrations
{
    public partial class UpdatedPetDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SerializedImages",
                table: "PetDetails",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SerializedImages",
                table: "PetDetails");
        }
    }
}
