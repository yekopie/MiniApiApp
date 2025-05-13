using Microsoft.AspNetCore.Mvc;

namespace StudentsManagerApi.Models
{
    public class ApiResponse 
    {
        public int StatusCode { get; set; }
        public string? Message { get; set; }
        public object? Data { get; set; }

        public static ApiResponse Success(object? data = null, string? message = null, int statusCode = 200)
        {
            return new ApiResponse { StatusCode = statusCode, Message = message, Data = data };
        }

        public static ApiResponse Error(string message, int statusCode = 400)
        {
            return new ApiResponse { StatusCode = statusCode, Message = message, Data = null };
        }
    }
}
