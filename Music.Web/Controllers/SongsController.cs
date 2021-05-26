using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Music.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Music.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SongsController : Controller
    {
        DataContext data;
        private readonly IMemoryCache memoryCache;

        public SongsController(ILogger<SongsController> logger, DataContext data, IMemoryCache memoryCache) {
            this.data = data;
            this.memoryCache = memoryCache;
        } 

        [HttpGet]
        public object GetAll()
        {
            string value = string.Empty;
            if (memoryCache.TryGetValue("allsongs", out value))
            {
                return JsonSerializer.Deserialize<SongDTO[]>(value);
            }
            else {
                var songs=data.Songs.Select(s => new SongDTO() { SongId = s.SongId, Title = s.Title, artist = s.Artist.Name }).ToArray();


                memoryCache.Set("allsongs", JsonSerializer.Serialize(songs), DateTimeOffset.UtcNow.AddMinutes(10));
                return songs;
            }
        }


        [HttpGet("buyed")]
        public object GetBuyed()
        {
            var r = from songs in data.Songs
                    join userSongs in data.UserSongs on songs.SongId equals userSongs.SongId
                    select new { songs.SongId, songs.Title, artist = songs.Artist.Name };

            return r.ToArray();
        }

        [HttpGet]
        [Route("{id:int}")]
        public object GetById(int id)
        {
            //var song=data.Songs.Include(b=>b.Artist).FirstOrDefault();

            return data.Songs.Where(s=>s.SongId==id).Select(s => new SongDTO() { SongId= s.SongId, Title= s.Title, artist = s.Artist.Name }).ToArray();
        }


        [HttpPost("/songs/buy")]
        public IActionResult buySong([FromBody] BuySongDTO dto)
        {
            //var song=data.Songs.Include(b=>b.Artist).FirstOrDefault();
            var userSong = new UserSongs() { SongId = dto.songId, UserEmail = dto.userEmail};
            if (!data.UserSongs.Where(x => x.SongId == dto.songId && x.UserEmail == dto.userEmail).Any()) {
                data.UserSongs.Add(userSong);
                data.SaveChanges();
            }
            return Ok(true);
        }

    }
    public class SongDTO {
        public int SongId { get; set; }
        public string Title { get; set; }
        public string artist { get; set; }
    }
    public class BuySongDTO {
        public int songId { get; set; }
        public string userEmail { get; set; }
    }
}
