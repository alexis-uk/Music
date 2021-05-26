using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Music.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<UserSongs> UserSongs { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // configures one-to-many relationship
            modelBuilder.Entity<Song>()
                .HasOne<Artist>(s => s.Artist)
                .WithMany(g => g.Songs)
                .HasForeignKey(s => s.ArtistId);
            modelBuilder.Entity<UserSongs>()
            .HasKey(o => new { o.SongId, o.UserEmail });

            modelBuilder.Entity<Artist>().HasData(
                new Artist
                {
                    ArtistId = 1,
                    Name = "The Cure",
                    FirstName = "",
                    LastName = ""
                }
            );
            modelBuilder.Entity<Artist>().HasData(
                new Artist
                {
                    ArtistId = 2,
                    Name = "The Police",
                    FirstName = "",
                    LastName = ""
                }
            );
            modelBuilder.Entity<Song>().HasData(
                new Song
                {
                    ArtistId = 1,
                    Title = "A forest",
                    SongId=1
                }
            );
            modelBuilder.Entity<Song>().HasData(
                new Song
                {
                    ArtistId = 2,
                    Title = "Synchronicity",
                    SongId = 2
                }
            );
            modelBuilder.Entity<Song>().HasData(
                new Song
                {
                    ArtistId = 2,
                    Title = "Contact",
                    SongId = 3
                }
            );
            modelBuilder.Entity<Song>().HasData(
                new Song
                {
                    ArtistId = 2,
                    Title = "Darkness",
                    SongId = 4
                }
            );
        }
    }


}
