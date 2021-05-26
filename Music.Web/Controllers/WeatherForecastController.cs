using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Music.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Music.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, DataContext data)
        {
            _logger = logger;
            Console.WriteLine(data.ContextId);
            //var author = new Artist { FirstName = "", LastName = "", Name="The Police" };
            //data.Artists.Add(author);
            //data.SaveChanges();
            //var song = new Song { Title = "Everybreath you take", Artist= author };
            //data.Songs.Add(song);
            //data.SaveChanges();
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
