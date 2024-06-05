using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace homework6_3.Data
{
    public class MaaserRepo
    {
        private readonly string _connectionString;
        public MaaserRepo(string connectionString)
        {
             _connectionString = connectionString;
        }

        public List<Maaser> GetAll()
        {
            var context = new MaaserTrackerDataContext(_connectionString);
            return context.Maaser.ToList();
        }

        public void AddMaaser(Maaser maaser)
        {
            var context = new MaaserTrackerDataContext(_connectionString);
            context.Maaser.Add(maaser);
            context.SaveChanges();
        }

        public decimal GetTotalMaaser()
        {
            var context = new MaaserTrackerDataContext(_connectionString);
            return context.Maaser.Sum(m => m.Amount);
        }
    }
}
