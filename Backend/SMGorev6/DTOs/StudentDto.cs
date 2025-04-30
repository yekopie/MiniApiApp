using SMGorev6.Constants;
using System.ComponentModel.DataAnnotations;

namespace SMGorev6.DTOs
{
    public class StudentDto
    {
        [Required(ErrorMessage = Messages.Required)]
        [RegularExpression("^[a-zA-ZçÇğĞıİöÖşŞüÜ]+( [a-zA-ZçÇğĞıİöÖşŞüÜ]+)*$", ErrorMessage = Messages.OnlyLettersNoSpaces)]
        [MinLength(3, ErrorMessage = Messages.FirstNameMinLength)]
        [MaxLength(50, ErrorMessage = Messages.FirstNameMaxLength)]
        public string FirstName { get; set; }

        [Required(ErrorMessage = Messages.Required)]
        [RegularExpression("^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$", ErrorMessage = Messages.OnlyLettersNoSpaces)]
        [MinLength(2, ErrorMessage = Messages.LastNameMinLength)]
        [MaxLength(50, ErrorMessage = Messages.LastNameMaxLength)]
        public string LastName { get; set; }

        [Required(ErrorMessage = Messages.Required)]
        [Range(0, int.MaxValue)]
        public int SchoolNumber { get; set; }

        [Required(ErrorMessage = Messages.Required)]
        [RegularExpression("^[a-zA-ZçÇğĞıİöÖşŞüÜ0-9/-]+$", ErrorMessage = Messages.OnlyLettersNoSpaces)]
        [MinLength(3, ErrorMessage = Messages.ClassMinLength)]
        [MaxLength(10, ErrorMessage = Messages.ClassMaxLength)]
        public string Lesson { get; set; }
    }
}
