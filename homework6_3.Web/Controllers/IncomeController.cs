using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using homework6_3.Data;

namespace homework6_3.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeController : ControllerBase
    {
        private readonly string _connectionString;

        public IncomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getall")]
        public List<Income> GetAll()
        {
            var repo = new IncomeRepo(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("addincome")]
        public void AddIncome(Income income)
        {
            var repo = new IncomeRepo(_connectionString);
            repo.AddIncome(income);
        }

        [HttpGet]
        [Route("gettotal")]
        public decimal GetTotal()
        {
            var repo = new IncomeRepo(_connectionString);
            return repo.GetTotalIncome();
        }
    }
}
