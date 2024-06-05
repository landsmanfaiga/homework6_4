using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace homework6_3.Data
{
    public class Income
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int SourceId { get; set; }
        public Source Source { get; set; }
    }

    public class Maaser
    {
        public int Id { get; set; }
        public string Recipient { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }

    public class Source
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public List<Income> Incomes { get; set; }
    }
}
