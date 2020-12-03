using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplikasjonerOppgave3.DAL;
using WebApplikasjonerOppgave3.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebApplikasjonerOppgave3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LikeController : ControllerBase
    {

        private IFaqRepository _db;
        private ILogger<LikeController> _log;

        public LikeController(IFaqRepository db, ILogger<LikeController> log)
        {
            _db = db;
            _log = log;
        }

        
        [HttpPost("like")]
        public async Task<ActionResult> Like([FromBody] int id)
        {
            bool returOK = await _db.Like(id);
            if (!returOK)
            {
                _log.LogInformation("Like kunne ikke lagres!");
                return BadRequest();
            }
            return Ok();

        }

        [HttpPost("dislike")]
        public async Task<ActionResult> Dislike([FromBody] int id)
        {
            bool returOK = await _db.Dislike(id);
            if (!returOK)
            {
                _log.LogInformation("Dislike kunne ikke lagres!");
                return BadRequest();
            }
            return Ok();

        }

    }
}
