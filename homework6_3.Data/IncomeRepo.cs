using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace homework6_3.Data
{
    public class IncomeRepo
    {
        private readonly string _connectionString;
        public IncomeRepo(string connectionString)
        {
             _connectionString = connectionString;
        }

        public List<Income> GetAll()
        {
            var context = new MaaserTrackerDataContext(_connectionString);
            return context.Incomes.Include(i => i.Source).ToList();
        }

        public void AddIncome(Income income)
        {
            var context = new MaaserTrackerDataContext(_connectionString);
            context.Incomes.Add(income);
            context.SaveChanges();
        }

        public decimal GetTotalIncome()
        {
            var context = new MaaserTrackerDataContext (_connectionString);
            return context.Incomes.Sum(i => i.Amount);
        }
    }
}
