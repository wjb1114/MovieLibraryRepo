using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MovieLibrary.Models;

namespace MovieLibrary.Controllers
{

    public class MovieController : ApiController
    {
        ApplicationDbContext context;
        public MovieController()
        {
            context = new ApplicationDbContext();
        }
        public IHttpActionResult Get()
        {
            using (ApplicationDbContext context = new ApplicationDbContext())
            {
                try
                {
                    var movies = context.Movies.ToList();

                    return Ok(movies);
                }
                catch
                {
                    return BadRequest();
                }
            }
        }

        public IHttpActionResult Get(int MovieId)
        {
            using (ApplicationDbContext context = new ApplicationDbContext())
            {
                try
                {
                    var movies = context.Movies.Where(m => m.MovieId == MovieId).FirstOrDefault();

                    return Ok(movies);
                }
                catch
                {
                    return BadRequest();
                }
            }
            
        }

        public IHttpActionResult Get(string searchType, string searchText)
        {
            try
            {
                searchText = searchText.ToLower();
                searchType = searchType.ToLower();
                if (searchType == "title")
                {
                    var results = context.Movies.Where(m => m.Title.Contains(searchText)).ToList();

                    return Ok(results);
                }
                else if (searchType == "director")
                {
                    var results = context.Movies.Where(m => m.Director.Contains(searchText)).ToList();

                    return Ok(results);
                }
                else if (searchType == "genre")
                {
                    var results = context.Movies.Where(m => m.Genre.Contains(searchText)).ToList();

                    return Ok(results);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]Movie value)
        {
            try
            {
                if (value.Title != null && value.Genre != null && value.Director != null)
                {
                    context.Movies.Add(value);
                    context.SaveChangesAsync();
                    return Ok(value);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut]

        public IHttpActionResult Put(int id, [FromBody]Movie movie)
        {

            using (ApplicationDbContext context = new ApplicationDbContext())
            {
                try
                {
                    var movies = context.Movies.FirstOrDefault(m => m.MovieId == id);

                    movies.Title = movie.Title;
                    movies.Genre = movie.Genre;
                    movies.Director = movie.Director;
                    context.SaveChanges();
                    return Ok();
                }
                catch
                {
                    return BadRequest();
                }
            }  
        }

        public IHttpActionResult Delete(int id)
        {
            try
            {
                Movie movie = context.Movies.Where(m => m.MovieId == id).Single();
                context.Movies.Remove(movie);
                context.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}