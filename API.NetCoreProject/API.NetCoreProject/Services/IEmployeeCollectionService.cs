using API.NetCoreProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.NetCoreProject.Services
{
    public interface IEmployeeCollectionService : ICollectionService<Employees>
    {
        Task<List<Employees>> GetEmployeesById(Guid Id);
    }
}
