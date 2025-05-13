using Bogus;
using SMGorev6.Entities;

namespace StudentsManagerApi.Data
{
    public static class SeedData
    {
        public static void Init(AppDbContext context)
        {
            if (context.Students == null || context.Students.Any()) return;

            var faker = new Faker<Student>()
                .RuleFor(s => s.FirstName, f => f.Name.FirstName())
                .RuleFor(s => s.LastName, f => f.Name.LastName())
                .RuleFor(s => s.Lesson, f => f.Hacker.Noun())
                .RuleFor(s => s.SchoolNumber, f => f.Random.Int(0, int.MaxValue));

            var fakeUsers = faker.Generate(224);
            context.Students.AddRange(fakeUsers);
            context.SaveChanges();
        }
    }
}
