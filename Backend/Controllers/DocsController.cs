using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocsController : ControllerBase
    {
        private readonly DocsService _DocsService;

        public DocsController(DocsService DocsService)
        {
            _DocsService = DocsService;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateDoc(CreateDocModel createDocModel)
        {
            var success = await _DocsService.CreateDocAsync(createDocModel);
            if (!success)
            {
                return Conflict(new { message = "Doc already exists." });
            }
            return Ok(new { message = "Doc created successfully." });
        }
    }
}
