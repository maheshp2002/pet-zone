using Microsoft.EntityFrameworkCore;
using PetZone.Domain.Models;
using PetZone.Service.Data;
using PetZone.Services.Dto;

namespace talent_portal.Service.Services;

public class MasterService
{
    private readonly ApplicationDbContext _db;

    public MasterService(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<ServiceResponse<MasterDto>> GetAllMasterDataAsync()
    {
        var response = new ServiceResponse<MasterDto>();

        var breeds = await _db.Breeds
            .Select(c => new MasterDataDto
            {
                Id = c.Id,
                Name = c.Name
            }).ToListAsync();

        var categories = await _db.Categories
            .Select(c => new MasterDataDto
            {
                Id = c.Id,
                Name = c.Name
            }).ToListAsync();

        var result = new MasterDto
        {
            Breeds = breeds,
            Categories = categories,
        };

        response.Result = result;

        return response;
    }

    public async Task<ServiceResponse<int>> AddBreed(MasterDataDto dto)
    {
        var response = new ServiceResponse<int>();

        var breed = _db.Breeds.FirstOrDefault(x => x.Name == dto.Name);

        if (breed != null)
        {
            response.AddError("Breed exists", "This breed already exists");
            return response;
        }

        var result = new Breed
        {
            Name = dto.Name
        };

        _db.Breeds.Add(result);

        response.Result = result.Id;

        await _db.SaveChangesAsync();

        return response;
    }

    public async Task<ServiceResponse<int>> AddCategory(MasterDataDto dto)
    {
        var response = new ServiceResponse<int>();

        var category = _db.Categories.FirstOrDefault(x => x.Name == dto.Name);

        if (category != null)
        {
            response.AddError("Category exists", "This category already exists");
            return response;
        }

        var result = new Category
        {
            Name = dto.Name
        };

        _db.Categories.Add(result);

        response.Result = result.Id;

        await _db.SaveChangesAsync();

        return response;
    }
}
