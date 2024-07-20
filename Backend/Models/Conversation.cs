namespace Backend.Models
{
    public class Conversation
    {
        public Conversation(string response)
        {
            AIResponse = response;

            if (string.IsNullOrWhiteSpace(response))
            {
                return;
            }

            string baseTitle = response.Split(' ')[0] + " " + response.Split(' ')[1];
            Title = baseTitle + DateTime.Now.ToString("yyyy_MM_dd_HH:mm:ss");
        }

        public Guid Id { get; set; }
        public string Title { get; set; }
        public string UserId { get; set; }
        public string Text { get; set; }
        public string Prompt { get; set; }
        public string AIResponse { get; set; }
    }
}