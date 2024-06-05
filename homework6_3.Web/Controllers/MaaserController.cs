using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using homework6_3.Data;

namespace homework6_3.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaaserController : ControllerBase
    {
        private readonly string _connectionString;
        public MaaserController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getall")]
        public List<Maaser> GetAll()
        {
            var repo = new MaaserRepo(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("addmaaser")]
        public void AddMaaser(Maaser maaser)
        {
            var repo = new MaaserRepo(_connectionString);
            repo.AddMaaser(maaser);
        }

        [HttpGet]
        [Route("gettotal")]
        public decimal GetTotal()
        {
            var repo = new MaaserRepo(_connectionString);
            return repo.GetTotalMaaser();
        }
    }
}
