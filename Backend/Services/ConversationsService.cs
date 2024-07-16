using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Backend.Services
{
    public class ConversationsService
    {
        IMongoCollection<Conversation> _conversations;

        public ConversationsService(IMongoDatabase database)
        {
            _conversations = database.GetCollection<Conversation>("Conversations");
        }

        public async Task<bool> CreateConversationAsync(Conversation conversation)
        {
            await _conversations.InsertOneAsync(conversation);
            return true;
        }

        public async Task<List<ConversationHeader>> GetAllConversationsAsync(string userid)
        {
            List<Conversation> conversations = await _conversations.Find(conversation => conversation.UserId == userid).ToListAsync();
            List<ConversationHeader> conversationHeaders = [];

            foreach (Conversation conversation in conversations)
            {
                conversationHeaders.Add(new ConversationHeader
                {
                    Id = conversation.Id,
                    Title = conversation.Title,
                });
            }

            return conversationHeaders;
        }

        public async Task<Conversation?> GetConversationByIdAsync(string id)
        {
            Guid guid = new(id);

            Conversation conversation = await _conversations.Find(c => c.Id == guid).FirstOrDefaultAsync();
            return conversation;
        }

        public async Task<bool> DeleteConversationAsync(string id)
        {
            Guid guid = new(id);

            DeleteResult result = await _conversations.DeleteOneAsync(c => c.Id == guid);
            return result.DeletedCount > 0;
        }
    }
}