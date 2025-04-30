using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace SMGorev6.Entities
{
    public class Student
    {
        
        public static int Counter = 0;
        public int Id { get;}
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required int SchoolNumber { get; set; }
        public required string Lesson { get; set; }

        public Student()
        {
            this.Id = ++Counter;
        }
    }
}
