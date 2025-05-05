using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SMGorev6.Constants;
using SMGorev6.DTOs;
using SMGorev6.Entities;

namespace SMGorev6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        public static List<Student> _students = new()
        {
            new Student { FirstName = "Ali", LastName = "Kaya", Lesson = "12/A", SchoolNumber = 33 },
            new Student { FirstName = "Ayşe", LastName = "Yılmaz", Lesson = "11/B", SchoolNumber = 45 },
            new Student { FirstName = "Mehmet", LastName = "Demir", Lesson = "10/C", SchoolNumber = 27 },
            new Student { FirstName = "Zeynep", LastName = "Çelik", Lesson = "9/D", SchoolNumber = 12 },
            new Student { FirstName = "Ahmet", LastName = "Şahin", Lesson = "12/B", SchoolNumber = 56 },
            new Student { FirstName = "Elif", LastName = "Arslan", Lesson = "11/A", SchoolNumber = 39 },
            new Student { FirstName = "Hasan", LastName = "Koç", Lesson = "10/B", SchoolNumber = 18 },
            new Student { FirstName = "Fatma", LastName = "Kurt", Lesson = "9/A", SchoolNumber = 7 },
            new Student { FirstName = "Emre", LastName = "Öztürk", Lesson = "12/C", SchoolNumber = 61 },
            new Student { FirstName = "Hülya", LastName = "Aydın", Lesson = "11/C", SchoolNumber = 42 },
            new Student { FirstName = "Burak", LastName = "Erdoğan", Lesson = "10/D", SchoolNumber = 25 }
        };

        public StudentsController() { }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute]int id)
        {
            var result = _students.FirstOrDefault(x => x.Id == id);
            if (result == null) return NotFound(Messages.StudentNotFound);

            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            if (!_students.Any())
                return NoContent();

            return Ok(_students);
        }

        [HttpPost]
        public IActionResult CreateStudent([FromBody] StudentDto student)
        {
            if(_students.Any(s => s.SchoolNumber == student.SchoolNumber ))
                return new CreatedResult { StatusCode = 201, Value = Messages.SchoolNumbersAldreadyExist };

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var CreateToStudent = new Student
            {
                FirstName = student.FirstName,
                LastName = student.LastName,
                Lesson = student.Lesson,
                SchoolNumber = student.SchoolNumber
            };
            _students.Add(CreateToStudent);

            return Ok(Messages.CreatedSuccesfully);
        }
        [HttpPut("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] StudentDto student)
        {
            if (_students.Any(s => s.SchoolNumber == student.SchoolNumber && s.Id != id))
                return new CreatedResult { StatusCode = 201, Value = Messages.SchoolNumbersAldreadyExist };


            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var UpdateToStudent = _students.FirstOrDefault(x => x.Id == id);
            if (UpdateToStudent == null) return NotFound(Messages.StudentNotFound);

            UpdateToStudent.FirstName = student.FirstName;
            UpdateToStudent.LastName = student.LastName;
            UpdateToStudent.Lesson = student.Lesson;
            UpdateToStudent.SchoolNumber = student.SchoolNumber;



            return Ok(Messages.UpdatedSuccesfully);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var deleteToStudent = _students.FirstOrDefault(x => x.Id == id);

            if (deleteToStudent == null) 
                return NotFound(Messages.StudentNotFound);

            _students.Remove(deleteToStudent);

            return Ok(Messages.DeletedSuccesfully);
        }       
    }
}
