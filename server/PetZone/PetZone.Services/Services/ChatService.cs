using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using PetZone.Domain.Models;
using PetZone.Service.Data;
using PetZone.Services.Dto;
using PetZone.Services.Services;

namespace talent_portal.Service.Services;

public class ChatService
{
    private readonly ApplicationDbContext _db;
    private readonly IHubContext<ChatHub> _hubContext;

    public ChatService(ApplicationDbContext db, IHubContext<ChatHub> hubContext)
    {
        _db = db;
        _hubContext = hubContext;
    }

    public async Task<ServiceResponse<List<ChatViewDto>>> GetAllChatsAsync(string userId)
    {
        var response = new ServiceResponse<List<ChatViewDto>>();

        var result = await _db.Chats
            .Include(x => x.PetDetails)
            .ThenInclude(x => x.Breed)
            .Include(x => x.PetDetails)
            .ThenInclude(x => x.Category)
            .Include(x => x.User)
            .Where(x => !(x.IsBlocked && x.BlockedBy != userId)
            && !(x.IsRemoved && x.RemovedBy == userId))
            .Select(c => new ChatViewDto
            {
                Id = c.Id,
                CreatedAt = c.CreatedAt,
                ChatName = $"{c.PetDetails.Breed.Name} {c.PetDetails.Category.Name} {c.User.Name} {c.Seller.Name}",
                Icon = $"https://localhost:7224/{c.Icon}",
                IsBlocked = c.IsBlocked,
                IsRemoved = c.IsRemoved
            }).ToListAsync();

        response.Result = result;

        return response;
    }

    public async Task<ServiceResponse<int>> CreateChatsAsync(string userId, CreateChatDto dto)
    {
        var response = new ServiceResponse<int>();

        var chat = _db.Chats.FirstOrDefault(x => x.User.Id == userId && x.Seller.Id == dto.SellerId && x.PetDetails.Id == dto.PetDetailsId);
        var petIcon = _db.PetDetails.FirstOrDefault(x => x.Id == dto.PetDetailsId);

        if (chat != null)
        {
            response.AddError("Chat Already Exists", "Chat already exists");
            return response;
        }

        var result = new Chat
        {
            CreatedAt = DateTime.Now.ToString(),
            SellerId = dto.SellerId,
            UserId = userId,
            IsBlocked = false,
            IsRemoved = false,
            RemovedBy = "",
            BlockedBy = "",
            PetDetailsId = dto.PetDetailsId,
            Icon = petIcon?.Images?[0]
        };

        await _db.Chats.AddAsync(result);

        await _db.SaveChangesAsync();

        response.Result = result.Id;

        return response;
    }

    public async Task<ServiceResponse<int>> BlockChatsAsync(string userId, BlockOrRemoveChatDto dto)
    {
        var response = new ServiceResponse<int>();

        var result = _db.Chats.FirstOrDefault(x => x.User.Id == userId && x.Seller.Id == dto.SellerId && x.PetDetails.Id == dto.PetDetailsId);

        if (result == null)
        {
            response.AddError("Chat Does Not Exists", "Chat does not exists");
            return response;
        }

        result.IsBlocked = dto.IsBlockedOrRemoved;
        result.BlockedBy = userId;

        await _db.Chats.AddAsync(result);

        await _db.SaveChangesAsync();

        response.Result = result.Id;

        return response;
    }

    public async Task<ServiceResponse<int>> RemoveChatsAsync(string userId, BlockOrRemoveChatDto dto)
    {
        var response = new ServiceResponse<int>();

        var result = _db.Chats.FirstOrDefault(x => x.User.Id == userId && x.Seller.Id == dto.SellerId && x.PetDetails.Id == dto.PetDetailsId);

        if (result == null)
        {
            response.AddError("Chat Does Not Exists", "Chat does not exists");
            return response;
        }

        result.IsRemoved = dto.IsBlockedOrRemoved;
        result.RemovedBy = userId;

        await _db.Chats.AddAsync(result);

        await _db.SaveChangesAsync();

        response.Result = result.Id;

        return response;
    }

    public async Task<ServiceResponse<List<MessageViewDto>>> GetMessageAsync(string userId, int chatId)
    {
        var response = new ServiceResponse<List<MessageViewDto>>();

        var result = await _db.Messages
            .Where(x => x.ChatId == chatId && !x.IsDeleted)
            .OrderBy(x => x.Time)
            .Select(c => new MessageViewDto
            {
                Id = c.Id,
                Time = c.Time.HasValue ? c.Time.Value.ToString("yyyy-MM-dd") : "", // Format Time as "2020-02-02"
                Date = c.Time.HasValue ? c.Time.Value.ToString("ddd-MMM-dd") : "", // Format Date as "Thu-Mar-20"
                Content = c.IsFile ? $"https://localhost:7224/{c.Content}" : c.Content,
                IsSenderUser = c.SenderId == userId ? true : false,
                IsDeleted = c.IsDeleted,
                IsFile = c.IsFile
            })
            .ToListAsync();

        response.Result = result;

        return response;
    }

    public async Task<ServiceResponse<int>> AddMessageAsync(string userId, AddMessageDto dto)
    {
        var response = new ServiceResponse<int>();

        string? content;

        if (dto.IsFile)
        {
            string fileName = dto.File!.FileName;
            string fileExtension = Path.GetExtension(fileName).ToLower();

            string uniqueFileName = Guid.NewGuid().ToString() + fileExtension;
            string uploadsDir = Path.Join("ChatImages", uniqueFileName);

            using (var fileStream = new FileStream(uploadsDir, FileMode.Create))
            {
                await dto.File!.CopyToAsync(fileStream);
            }

            content = uploadsDir;
        }
        else
        {
            content = dto.Content;
        }

        var result = new Message
        {
            Time = DateTime.Now,
            Content = content,
            ChatId = dto.ChatId,
            SenderId = userId,
            IsDeleted = false,
            IsFile = dto.IsFile
        };

        await _db.Messages.AddAsync(result);

        await _db.SaveChangesAsync();

        var messageDto = new MessageViewDto
        {
            Id = result.Id,
            Time = result.Time.HasValue ? result.Time.Value.ToString("yyyy-MM-dd") : "",
            Date = result.Time.HasValue ? result.Time.Value.ToString("ddd-MMM-dd") : "",
            Content = result.IsFile ? $"https://localhost:7224/{result.Content}" : result.Content,
            IsSenderUser = result.SenderId == userId,
            IsDeleted = result.IsDeleted,
            IsFile = result.IsFile
        };

        await _hubContext.Clients.All.SendAsync("NewMessage", dto.ChatId, messageDto);

        response.Result = result.Id;

        return response;
    }

    public async Task<ServiceResponse<int>> RemoveMessageAsync(AddMessageDto dto)
    {
        var response = new ServiceResponse<int>();

        var result = _db.Messages.FirstOrDefault(x => x.ChatId == dto.ChatId);

        if (result == null)
        {
            response.AddError("Message Does Not Exists", "Message does not exists");
            return response;
        }

        _db.Messages.Remove(result);

        await _db.SaveChangesAsync();

        // Notify clients
        await _hubContext.Clients.All.SendAsync("MessageRemoved", result.Id);

        response.Result = result.Id;

        return response;
    }
}
