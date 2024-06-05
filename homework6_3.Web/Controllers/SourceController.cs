using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using homework6_3.Data;

namespace homework6_3.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SourceController : ControllerBase
    {
        private readonly string _connectionString;
        public SourceController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getall")]
        public List<Source> GetAll()
        {
            var repo = new SourceRepo(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("addsource")]
        public void AddSource(Source source)
        {
            var repo = new SourceRepo(_connectionString);
            repo.AddSource(source);
        }

        [HttpPost]
        [Route("deletesource")]
        public void DeleteSource(Source source)
        {
            var repo = new SourceRepo(_connectionString);
            repo.RemoveSource(source);
        }

        [HttpPost]
        [Route("updatesource")]
        public void UpdateSource(Source source)
        {
            var repo = new SourceRepo(_connectionString);
            repo.EditSource(source);
        }
    }
}
