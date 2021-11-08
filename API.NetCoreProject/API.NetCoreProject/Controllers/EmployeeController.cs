using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.NetCoreProject.Models;
using API.NetCoreProject.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.NetCoreProject.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class EmployeeController : ControllerBase
    {

        IEmployeeCollectionService _employeeCollectionService;
        public EmployeeController(IEmployeeCollectionService employeeCollectionService)
        {
            _employeeCollectionService = employeeCollectionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            List<Employees> employees = await _employeeCollectionService.GetAll();
            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployees([FromBody] Employees employee)
        {
            if (employee == null)
            {
                return BadRequest("Note cannot be null");
            }

            if (await _employeeCollectionService.Create(employee))
            {
                return CreatedAtRoute("GetByEmployeeId", new { id = employee.Id.ToString() }, employee);
            }
            return NoContent();
            //return StatusCode(StatusCodes.Status500InternalServerError, "Error in processing the note");
        }

        [HttpGet("/id", Name = "GetByEmployeeId")]
        public async Task<IActionResult> GetByEmployeeId(Guid id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var employee = await _employeeCollectionService.Get(id);

            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        {

            if (id == null)
            {
                return BadRequest();
            }


            bool isRemoved = await _employeeCollectionService.Delete(id);

            if (!isRemoved)
            {
                return Ok();
            }

            return NotFound();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(Guid id, [FromBody] Employees employeeToUpdate)
        {
            if (employeeToUpdate == null)
            {
                return BadRequest("Note cannot be null");
            }

            bool isUpdated = await _employeeCollectionService.Update(id, employeeToUpdate);
            if (isUpdated)
            {
                return Ok();
            }
            return NoContent();

        }


    }
}
