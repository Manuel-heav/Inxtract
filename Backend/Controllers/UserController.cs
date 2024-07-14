using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserService _userService;

    public UsersController(UserService userService)
    {
        _userService = userService;
    }

    // POST /api/users/register
    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser(RegisterModel registerModel)
    {
        var success = await _userService.RegisterUserAsync(registerModel);
        if (!success)
        {
            return Conflict(new { message = "User already exists." });
        }
        return Ok(new { message = "User registered successfully." });
    }

    // POST /api/users/login
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginModel loginModel)
    {
        var _user = await _userService.ValidateUserCredentialsAsync(loginModel.Username, loginModel.Password);
        if (_user == null)
        {
            return Unauthorized(new { message = "Invalid username or password." });
        }

        return Ok(new { message = "Login successful.", user = _user });
    }

    // GET /api/users/list
    [HttpGet("list")]
    public async Task<IActionResult> ListUsers()
    {
        var _users = await _userService.GetAllUsersAsync();
        return Ok(new { users = _users });
    }

    // DELETE /api/users/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        var deleted = await _userService.DeleteUserAsync(id);
        if (!deleted)
        {
            return NotFound(new { message = "User not found." });
        }
        return Ok(new { message = "User deleted successfully." });
    }
}

