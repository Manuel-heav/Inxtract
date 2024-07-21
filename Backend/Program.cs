using Backend;
using Backend.Data;
using Backend.Services;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

Console.WriteLine($"Mongo Connection String: {Environment.GetEnvironmentVariable("MongoSettings__ConnectionString")}");
Console.WriteLine($"API Key: {Environment.GetEnvironmentVariable("API_KEY_GEMINI")}");


// Add services to the container.
builder.Services.AddControllers();

// Register MongoDB client and database
builder.Services.AddSingleton<IMongoClient, MongoClient>(sp =>
{
    var settings = builder.Configuration.GetSection("MongoSettings").Get<MongoSettings>();
    return new MongoClient(settings.ConnectionString);
});

builder.Services.AddScoped<IMongoDatabase>(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    var settings = builder.Configuration.GetSection("MongoSettings").Get<MongoSettings>();
    return client.GetDatabase(settings.DatabaseName);
});

// Register UserService
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<ConversationsService>();
builder.Services.AddTransient<ChatWithPdfService>();
builder.Services.AddHealthChecks();

var app = builder.Build();

app.UseMiddleware<LoggingMiddleware>();
app.UseHealthChecks("/api/health");

// Enable CORS
app.UseCors(builder =>
{
    builder.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod();
});

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllers();

app.Run();
