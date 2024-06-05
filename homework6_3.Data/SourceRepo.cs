using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace homework6_3.Data
{
    public class SourceRepo
    {
        private readonly string _connectionString;
        public SourceRepo(string connectionString)
        {
             _connectionString = connectionString;
        }

        public List<Source> GetAll()
        {
            var context = new MaaserTrackerDataContext(_connectionString);
            return context.Sources.ToList();
        }
        public void AddSource(Source source)
        {
            var context =new MaaserTrackerDataContext(_connectionString);
            context.Sources.Add(source);
            context.SaveChanges();
        }

        public void RemoveSource(Source source)
        {
            var context = new MaaserTrackerDataContext(_connectionString);
            var bremoved =context.Incomes.Where(x => x.SourceId == source.Id).ToList();
            context.Incomes.RemoveRange(bremoved);
            context.Sources.Remove(source);
            context.SaveChanges();
        }

        public void EditSource(Source source)
        {
            var context = new MaaserTrackerDataContext(_connectionString);
            context.Sources.Update(source);
            context.SaveChanges();
        }
    }
}
