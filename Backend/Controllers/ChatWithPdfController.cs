using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatWithPdfController : ControllerBase
    {
        private readonly ChatWithPdfService _chatWithPdfService;
        private readonly ConversationsService _conversationsService;

        public ChatWithPdfController(ChatWithPdfService chatWithPdfService, ConversationsService conversationsService)
        {
            _chatWithPdfService = chatWithPdfService;
            _conversationsService = conversationsService;
        }

        [HttpPost]
        [Route("gettext")]
        public async Task<IActionResult> ExtractText([FromForm] IFormFile file)
        {

            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "Invalid File" });
            }

            Console.WriteLine("Extracting text from PDF...");

            var filePath = Path.GetTempFileName();
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Extract text from the PDF
            string pdfText = _chatWithPdfService.ExtractTextFromPdf(filePath);

            // Delete the temporary file
            System.IO.File.Delete(filePath);

            Console.WriteLine("Text extracted successfully.");
            return Ok(new { text = pdfText });
        }

        [HttpPost]
        [Route("summary")]
        public async Task<IActionResult> SummarizeText(TextModel textModel)
        {
            if (string.IsNullOrWhiteSpace(textModel.Text))
            {
                return BadRequest(new { message = "Invalid text." });
            }

            if (string.IsNullOrWhiteSpace(textModel.UserId))
            {
                return BadRequest(new { message = "Invalid userid." });
            }

            Console.WriteLine("Summarizing text...");
            // Prompt to summarize text
            string prompt = "Summarize the following text. Do not write anything else. Do not say something like -here is the summary-, just return the summary";


            Console.WriteLine("Sending text to Gemini API for summarization...");
            // Call Gemini API with the text and prompt
            string response = await _chatWithPdfService.CallGeminiApiAsync(textModel.Text, prompt);

            Conversation conversation = new(response)
            {
                Text = textModel.Text,
                Prompt = "Summarize the text",
                UserId = textModel.UserId
            };

            Console.WriteLine("Saving conversation to database...");
            await _conversationsService.CreateConversationAsync(conversation);

            Console.WriteLine("Text summarized successfully.");
            return Ok(new { text = response });
        }

        [HttpPost]
        [Route("chat")]
        public async Task<IActionResult> ChatWithAI(TextModel textModel)
        {
            if (string.IsNullOrWhiteSpace(textModel.Text) ||
             string.IsNullOrWhiteSpace(textModel.Prompt))
            {
                return BadRequest(new { message = "Invalid text or prompt." });
            }

            if (string.IsNullOrWhiteSpace(textModel.UserId))
            {
                return BadRequest(new { message = "Invalid userid." });
            }

            Console.WriteLine("Chatting with AI...");
            // Call Gemini API with the text and prompt

            Console.WriteLine("Sending text to Gemini API for chat...");
            string response = await _chatWithPdfService.CallGeminiApiAsync(textModel.Text, textModel.Prompt);

            // Create a new conversation object
            Conversation conversation = new(response)
            {
                Text = textModel.Text,
                Prompt = textModel.Prompt,
                UserId = textModel.UserId
            };

            Console.WriteLine("Saving conversation to database...");
            await _conversationsService.CreateConversationAsync(conversation);

            Console.WriteLine("Chat completed successfully.");
            return Ok(new { text = response });
        }

        [HttpPost]
        [Route("topic")]
        public async Task<IActionResult> GetTopic(TextModel textModel)
        {
            if (string.IsNullOrWhiteSpace(textModel.Text))
            {
                return BadRequest(new { message = "Invalid text." });
            }

            if (string.IsNullOrWhiteSpace(textModel.UserId))
            {
                return BadRequest(new { message = "Invalid userid." });
            }

            Console.WriteLine("Chatting with AI...");
            // Call Gemini API with the text and prompt

            Console.WriteLine("Sending text to Gemini API for chat...");
            string prompt = "What is a good title for the provided text? Do not write anything else. Do not say something like -here is the title-, just return the title";
            string response = await _chatWithPdfService.CallGeminiApiAsync(textModel.Text, prompt);

            Console.WriteLine("Chat completed successfully.");
            return Ok(new { text = response });
        }
    }
}
