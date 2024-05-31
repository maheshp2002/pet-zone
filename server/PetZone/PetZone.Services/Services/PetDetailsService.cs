using Microsoft.EntityFrameworkCore;
using PetZone.Domain.Models;
using PetZone.Service.Data;
using PetZone.Services.Dto;

namespace talent_portal.Service.Services;

public class PetDetailsService
{
    private readonly ApplicationDbContext _db;

    public PetDetailsService(
    ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<ServiceResponse<List<PetDetailsViewDto>>> GetAllPetDetailsAsync()
    {
        var response = new ServiceResponse<List<PetDetailsViewDto>>();

        var result = await _db.PetDetails.Include(x => x.Seller).Include(x => x.Breed).Include(x => x.Category)
            .Select(c => new PetDetailsViewDto
            {
                PetId = c.Id,
                Age = c.Age,
                Breed = c.Breed!.Name,
                Sex = c.Sex,
                Color = c.Color,
                Availability = c.Availability,
                SellerId = c.SellerId,
                SellerName = c.Seller!.Name,
                SellerAddress = $"{c.Seller.BuildingName} {c.Seller.StreetAddress} {c.Seller.City} {c.Seller.State} {c.Seller.Country} \r\n Pincode: {c.Seller.PinCode}",
                Description = c.Description,
                Price = c.Price,
                Images = c.Images,
                Category = c.Category!.Name,
                Status = c.Status
            }).ToListAsync();

        response.Result = result;

        return response;
    }

    public async Task<ServiceResponse<PetDetailsViewDto>> GetPetDetailsByIdAsync(int id)
    {
        var response = new ServiceResponse<PetDetailsViewDto>();

        var petDetail = await _db.PetDetails
            .Include(x => x.Seller)
            .Include(x => x.Breed)
            .Include(x => x.Category)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (petDetail != null)
        {
            var result = new PetDetailsViewDto
            {
                PetId = petDetail.Id,
                Age = petDetail.Age,
                Breed = petDetail.Breed?.Name,
                Sex = petDetail.Sex,
                Color = petDetail.Color,
                Availability = petDetail.Availability,
                SellerId = petDetail.SellerId,
                SellerName = petDetail.Seller?.Name,
                SellerAddress = $"{petDetail.Seller?.BuildingName} {petDetail.Seller?.StreetAddress} {petDetail.Seller?.City} {petDetail.Seller?.State} {petDetail.Seller?.Country} \r\n Pincode: {petDetail.Seller?.PinCode}",
                Description = petDetail.Description,
                Price = petDetail.Price,
                Images = petDetail.Images,
                Category = petDetail.Category?.Name,
                Status = petDetail.Status
            };

            response.Result = result;
        }

        return response;
    }

    public async Task<ServiceResponse<int>> PetDetailsAsync(PetDetailsDto dto)
    {
        var response = new ServiceResponse<int>();

        if (!dto.Id.HasValue)
        {
            var result = new PetDetails
            {
                Age = dto.Age,
                Sex = dto.Sex,
                Color = dto.Color,
                Availability = dto.Availability,
                Description = dto.Description,
                Price = dto.Price,
                Images = await GetImageList(dto),
                BreedId = dto.Breed,
                CategoryId = dto.Category,
                SellerId = dto.SellerId,
                Status = dto.Status
            };

            _db.PetDetails.Add(result);

            response.Result = result.Id;
        } 
        else
        {
            var petDetails = await _db.PetDetails.FirstOrDefaultAsync(x => x.Id == dto.Id);
            if (petDetails == null)
            {
                response.AddError("No Pet Details Found", "No pet details found");
                return response;
            }

            if (petDetails.Images != null && petDetails.Images.Count() != 0)
            {
                foreach (var image in petDetails.Images)
                {
                    File.Delete(image);
                }
            }

            if (dto.Images != null && dto.Images.Count() != 0)
            {
                petDetails.Images = await GetImageList(dto);
            }

            petDetails.Age = dto.Age;
            petDetails.Sex = dto.Sex;
            petDetails.Color = dto.Color;
            petDetails.Availability = dto.Availability;
            petDetails.Description = dto.Description;
            petDetails.Price = dto.Price;
            petDetails.BreedId = dto.Breed;
            petDetails.CategoryId = dto.Category;
            petDetails.SellerId = dto.SellerId;
            petDetails.Status = dto.Status;

            _db.PetDetails.Add(petDetails);

            response.Result = petDetails.Id;
        }

        await _db.SaveChangesAsync();

        return response;
    }

    public async Task<List<string>> GetImageList(PetDetailsDto dto)
    {
        var images = new List<string>();

        foreach (var image in dto.Images)
        {
            string fileName = image.FileName;
            string fileExtension = Path.GetExtension(fileName).ToLower();

            string uniqueFileName = Guid.NewGuid().ToString() + fileExtension;
            string uploadsDir = Path.Join("Images", uniqueFileName);

            using (var fileStream = new FileStream(uploadsDir, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
            }

            images.Add(uploadsDir);
        }

        return images;
    }
}
