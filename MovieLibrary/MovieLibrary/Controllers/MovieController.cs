using System;
using System.Collections.Generic;
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
        // GET api/movie
        public IEnumerable<string> Get()
        {
            // Retrieve all movies from db logic
            return new string[] { "movie1 string", "movie2 string" };
        }

        // GET api/movie/5
        public string Get(int id)
        {
            // Retrieve movie by id from db logic
            return "value";
        }

        // POST api/movie
        public IHttpActionResult Post([FromBody]Movie value)
        {
            try
            {
                if (value.Title != null && value.Genre != null && value.Director != null)
                {
                    context.Movies.Add(value);
                    context.SaveChangesAsync();
                    return Ok();
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
            // Create movie in db logic


        // PUT api/movie/5
        public void Put(int id, [FromBody]string value)
        {
            // Update movie in db logic
        }

        // DELETE api/movie/5
        public void Delete(int id)
        {
            // Delete movie from db logic
        }
    }

}