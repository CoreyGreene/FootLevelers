using Microsoft.AspNetCore.Mvc;

namespace FootLevelers.Controllers
{
    [Route("api/[controller]")]
    public class ApiController : Controller
    {
        [HttpGet("ping/{message}")]
        public IActionResult Ping(string message)
        {
            var originalMessage = message;
            var isNumericalMessage = int.TryParse(message, out _);

            if (isNumericalMessage)
            {
                var responseData = new
                {
                    response = "pong",
                    message = originalMessage
                };

                return Ok(responseData);

            }
            else
            {
                var responseData = new
                {
                    response = "pong",
                    message = originalMessage
                };

                return BadRequest(responseData);
            }
        }
    }
}
