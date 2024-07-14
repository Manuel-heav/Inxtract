using Backend.Models;
using MongoDB.Driver;

namespace Backend.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IMongoDatabase database)
        {
            _users = database.GetCollection<User>("Users");
        }

        public async Task<bool> RegisterUserAsync(RegisterModel registerModel)
        {
            var existingUser = await _users.Find(u => u.Username == registerModel.Username).FirstOrDefaultAsync();
            if (existingUser != null)
            {
                // User already exists
                return false;
            }

            User newUser = new User();
            newUser.Username = registerModel.Username;
            newUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerModel.Password);
            newUser.Email = registerModel.Email;

            await _users.InsertOneAsync(newUser);
            return true;
        }

        public async Task<User> ValidateUserCredentialsAsync(string username, string password)
        {
            // Find the user by username
            var user = await _users.Find(u => u.Username == username).FirstOrDefaultAsync();

            // Verify password if user is found
            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return user; // Password is correct
            }

            return null; // User not found or password incorrect
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _users.Find(_ => true).ToListAsync();
        }

        public async Task<bool> DeleteUserAsync(string id)
        {
            Guid guid;
            try
            {
                guid = new(id);
            }
            catch (Exception e)
            {
                return false;
            }

            var result = await _users.DeleteOneAsync(u => u.Id.Equals(guid));
            return result.DeletedCount > 0;
        }
    }
}