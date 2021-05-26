using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Music.Data
{
    public class Artist
    {
        [Key]
        public int ArtistId { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string bio { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public ICollection<Song> Songs { get; set; }
    }
}
