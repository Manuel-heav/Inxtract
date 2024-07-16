namespace Backend.Models
{
    public class Conversation
    {
        public Conversation()
        {
            Title = "Conversation_" + DateTime.Now.ToString("yyyy_MM_dd_HH:mm:ss");
        }

        public Guid Id { get; set; }
        public string Title { get; set; }
        public string UserId { get; set; }
        public string Text { get; set; }
        public string Prompt { get; set; }
        public string AIResponse { get; set; }
    }
}