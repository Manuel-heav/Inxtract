using Backend.Models;
using MongoDB.Driver;

namespace Backend.Data
{

    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("MongoDb"));
            _database = client.GetDatabase(configuration["InxtractDB"]);
        }

        public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
    }
}