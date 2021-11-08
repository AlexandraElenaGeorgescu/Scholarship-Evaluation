using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.NetCoreProject.Models
{
    public class Employees
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }

        public string Position { get; set; }

        public Employees()
        {

        }
        public Employees(Guid id, string name, int age, string position)
        {
            Id = id;
            Name = name;
            Age = age;
            Position = position;
        }
    }
}
