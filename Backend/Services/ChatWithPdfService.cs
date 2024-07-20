using System.Net;
using System.Text;
using System.Text.Json;
using Backend.Controllers;
using iTextSharp.text.pdf;
using iTextSharp.text.pdf.parser;

namespace Backend.Services
{
    public class ChatWithPdfService
    {
        public string ExtractTextFromPdf(string filePath)
        {
            using PdfReader reader = new(filePath);
            StringBuilder text = new();

            for (int page = 1; page <= reader.NumberOfPages; ++page)
            {
                ITextExtractionStrategy strategy = new SimpleTextExtractionStrategy();
                string curPage = PdfTextExtractor.GetTextFromPage(reader, page, strategy);
                curPage = Encoding.UTF8.GetString(ASCIIEncoding.Convert(Encoding.Default, Encoding.UTF8, Encoding.Default.GetBytes(curPage)));

                text.Append(curPage);
            }

            return text.ToString();
        }

        public async Task<string> CallGeminiApiAsync(string text, string prompt)
        {
            using var client = new HttpClient();
            var requestBody = new
            {
                contents = new
                {
                    parts = new
                    {
                        text = prompt + "\n" + text
                    }
                }
            };

            string apiKeyFilePath = "API_KEYS/gemini.txt";
            string apiKey;
            if (File.Exists(apiKeyFilePath))
            {
                apiKey = File.ReadAllText(apiKeyFilePath);
            }
            else
            {
                apiKey = Environment.GetEnvironmentVariable("API_KEY_GEMINI") ?? "";
            }

            if (string.IsNullOrEmpty(apiKey))
            {
                Console.WriteLine("Error: API key not found!");
                return "";
            }

            Console.WriteLine("API key: '" + apiKey + "'");

            var jsonContent = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + apiKey, content);
            if (response.StatusCode != HttpStatusCode.OK)
            {
                Console.WriteLine("Error: " + response.StatusCode);
                Console.WriteLine("Response: " + await response.Content.ReadAsStringAsync());
                return "";
            }


            string responseBody = await response.Content.ReadAsStringAsync();

            var parsedResponse = JsonSerializer.Deserialize<JsonElement>(responseBody);

            var responseText = parsedResponse.GetProperty("candidates")[0].GetProperty("content").GetProperty("parts")[0].GetProperty("text").GetString();

            return responseText;
        }
    }
}