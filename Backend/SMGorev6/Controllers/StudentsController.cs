using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SMGorev6.Constants;
using SMGorev6.DTOs;
using SMGorev6.Entities;
using StudentsManagerApi.Data;
using StudentsManagerApi.Models;
using System.Threading.Tasks;

namespace SMGorev6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute]int id)
        {
            var result = await _context.Students.FindAsync(id);
            if (result == null)
                return new ObjectResult(ApiResponse.Error(Messages.StudentNotFound, 404));

            return new ObjectResult(ApiResponse.Success(result, null, 200));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int page = 1, int pageSize = 25)
        {
            if (!_context.Students.Any())
                return NoContent();

            var totalRecords =await _context.Students.CountAsync();
            // (int)Math.Ceiling olarak kullanılabilir.
            var totalPages = (int)Math.Ceiling((double)totalRecords / pageSize);

            // Örn: 5. sayfayı çekeceğiz,
            // 4*25 atlayacak 100'den sonraki ilk 25 veriyi getirecek
            var students = await _context.Students
                .OrderBy(s => s.Id) // Id'ye göre sırala, Default A-Z, Küçükten büyüğe
                .Skip((page - 1)*pageSize) // atla (page - 1)*pageSize = toplam satır sayısı
                .Take(pageSize) // Getir
                .ToListAsync(); // Listele
            
            return Ok(new
            {
                TotalRecords = totalRecords,
                TotalPages = totalPages,
                CurrentPage = page,
                Students = students
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateStudentAsync([FromBody] StudentDto student)
        {
            if (!ModelState.IsValid)
                return new ObjectResult(ApiResponse.Error(Messages.ValidationError));

            if (_context.Students.Any(s => s.SchoolNumber == student.SchoolNumber ))
                return new ObjectResult(ApiResponse.Error(Messages.SchoolNumbersAldreadyExist,201));

            var CreateToStudent = new Student
            {
                FirstName = student.FirstName,
                LastName = student.LastName,
                Lesson = student.Lesson,
                SchoolNumber = student.SchoolNumber
            };
            await _context.Students.AddAsync(CreateToStudent);
            await _context.SaveChangesAsync();
            return new ObjectResult(ApiResponse.Success(CreateToStudent));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] StudentDto student)
        {
            if (!ModelState.IsValid)
                return new ObjectResult(ApiResponse.Error(Messages.ValidationError));

            if (await _context.Students.AnyAsync(s => s.SchoolNumber == student.SchoolNumber && s.Id != id))
                return new ObjectResult(ApiResponse.Error(Messages.SchoolNumbersAldreadyExist, 201));

            var UpdateToStudent = await _context.Students.FindAsync(id);
            if (UpdateToStudent == null) 
                return new ObjectResult(ApiResponse.Error(Messages.StudentNotFound, 404));

            UpdateToStudent.FirstName = student.FirstName;
            UpdateToStudent.LastName = student.LastName;
            UpdateToStudent.Lesson = student.Lesson;
            UpdateToStudent.SchoolNumber = student.SchoolNumber;
            await _context.SaveChangesAsync();


            return new ObjectResult(ApiResponse.Success(UpdateToStudent, Messages.UpdatedSuccesfully));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var deleteToStudent = await _context.Students.FindAsync(id);

            if (deleteToStudent == null)
                return new ObjectResult(ApiResponse.Error(Messages.StudentNotFound, 404));

            _context.Remove(deleteToStudent);

            return new ObjectResult(ApiResponse.Success(deleteToStudent, Messages.DeletedSuccesfully, 200));
        }       
    }

}
