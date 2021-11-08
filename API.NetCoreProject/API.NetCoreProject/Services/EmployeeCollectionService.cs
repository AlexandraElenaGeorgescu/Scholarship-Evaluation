using MongoDB.Driver;
using API.NetCoreProject.Models;
using API.NetCoreProject.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.NetCoreProject.Services
{
    public class EmployeeCollectionService : IEmployeeCollectionService
    {
        private readonly IMongoCollection<Employees> _employees;

        public EmployeeCollectionService(IMongoDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _employees = database.GetCollection<Employees>(settings.EmployeeCollectionName);
        }

        public async Task<List<Employees>> GetAll()
        {
            var result = await _employees.FindAsync(emplpyee => true);
            return result.ToList();
        }

        public async Task<bool> Create(Employees employee)
        {
            await _employees.InsertOneAsync(employee);
            return true;
        }

        public async Task<bool> Delete(Guid id)
        {
            var result = await _employees.DeleteOneAsync(employee => employee.Id == id);
            if (!result.IsAcknowledged && result.DeletedCount == 0)
            {
                return false;
            }
            return true;
        }

        public async Task<Employees> Get(Guid id)
        {
            return (await _employees.FindAsync(employee => employee.Id == id)).FirstOrDefault();
        }

        public async Task<bool> Update(Guid id, Employees employee)
        {
            employee.Id = id;
            var result = await _employees.ReplaceOneAsync(employee => employee.Id == id, employee);
            if (!result.IsAcknowledged && result.ModifiedCount == 0)
            {
                await _employees.InsertOneAsync(employee);
                return false;
            }

            return true;
        }

        public async Task<List<Employees>> GetEmployeesById(Guid Id)
        {
            return (await _employees.FindAsync(employee => employee.Id == Id)).ToList();
        }
    }
}
