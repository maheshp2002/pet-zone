using Microsoft.AspNetCore.SignalR;
using PetZone.Services.Dto;

namespace PetZone.Services.Services;

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public async Task NotifyNewMessage(int chatId, MessageViewDto message)
    {
        await Clients.All.SendAsync("NewMessage", chatId, message);
    }

    public async Task NotifyMessageRemoved(int messageId)
    {
        await Clients.All.SendAsync("MessageRemoved", messageId);
    }

    public async Task NotifyChatBlocked(int chatId)
    {
        await Clients.All.SendAsync("ChatBlocked", chatId);
    }

    public async Task NotifyChatUnblocked(int chatId)
    {
        await Clients.All.SendAsync("ChatUnblocked", chatId);
    }
}
