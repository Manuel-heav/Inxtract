using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConversationsController : ControllerBase
    {
        private readonly ConversationsService _conversationsService;

        public ConversationsController(ConversationsService conversationsService)
        {
            _conversationsService = conversationsService;
        }

        [HttpPost]
        [Route("list")]
        public async Task<ActionResult<IEnumerable<Conversation>>> ListConversations(UserModel userModel)
        {
            if (string.IsNullOrWhiteSpace(userModel.UserId))
            {
                return BadRequest(new { message = "Invalid user id." });
            }


            Console.WriteLine("Fetching all conversations...");
            var response = await _conversationsService.GetAllConversationsAsync(userModel.UserId);

            Console.WriteLine("Conversations fetched successfully.");
            return response;
        }

        [HttpPost]
        [Route("get")]
        public async Task<ActionResult<Conversation>> GetConversationById(ConversationModel conversationModel)
        {
            if (string.IsNullOrWhiteSpace(conversationModel.Id))
            {
                return BadRequest(new { message = "Invalid conversation id." });
            }

            Console.WriteLine("Fetching conversation...");
            Conversation? conversation = await _conversationsService.GetConversationByIdAsync(conversationModel.Id);
            if (conversation == null)
            {
                Console.WriteLine("Conversation not found.");
                return NotFound(new { message = "Conversation not found" });
            }

            Console.WriteLine("Conversation fetched successfully.");
            return Ok(conversation);
        }

        [HttpDelete]
        [Route("")]
        public async Task<IActionResult> DeleteConversation(ConversationModel conversationModel)
        {
            if (string.IsNullOrWhiteSpace(conversationModel.Id))
            {
                return BadRequest(new { message = "Invalid conversation id." });
            }

            Console.WriteLine("Deleting conversation...");
            var deleted = await _conversationsService.DeleteConversationAsync(conversationModel.Id);
            if (!deleted)
            {
                Console.WriteLine("Conversation not found.");
                return NotFound(new { message = "Conversation not found." });
            }

            Console.WriteLine("Conversation deleted successfully.");
            return Ok(new { message = "Conversation deleted successfully." });
        }
    }
}
