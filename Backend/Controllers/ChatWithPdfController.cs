using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatWithPdfController : ControllerBase
    {
        private readonly ChatWithPdfService _chatWithPdfService;

        public ChatWithPdfController(ChatWithPdfService chatWithPdfService)
        {
            _chatWithPdfService = chatWithPdfService;
        }

        public async Task<string> getPdfText(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return "";
            }

            var filePath = Path.GetTempFileName();
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Extract text from the PDF
            string pdfText = _chatWithPdfService.ExtractTextFromPdf(filePath);

            // Delete the temporary file
            System.IO.File.Delete(filePath);

            return pdfText;
        }


        [HttpPost]
        [Route("chat")]
        public async Task<IActionResult> UploadPdfWithPrompt([FromForm] IFormFile file, [FromForm] string prompt)
        {
            // Extract text from the PDF
            string pdfText = await getPdfText(file);
            if (string.IsNullOrWhiteSpace(pdfText) || string.IsNullOrWhiteSpace(prompt))
            {
                return BadRequest(new { message = "Invalid file or prompt." });
            }

            // Call Gemini API with the extracted text and prompt
            string response = await _chatWithPdfService.CallGeminiApiAsync(pdfText, prompt);
            return Ok(response);
        }
    }
}

