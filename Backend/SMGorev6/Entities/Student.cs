using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace SMGorev6.Entities
{
    public class Student
    {    
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int SchoolNumber { get; set; }
        public string Lesson { get; set; }
    }
}
