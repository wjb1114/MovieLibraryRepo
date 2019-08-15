﻿using System;
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
        // GET api/movie
        public IHttpActionResult Get()
        {
          

            using (ApplicationDbContext context = new ApplicationDbContext())
            {

                var movies = context.Movies.ToList();

                return Ok(movies);
            }
        }

        // GET api/movie/5
        public IHttpActionResult Get(int MovieId)
        {
            using (ApplicationDbContext context = new ApplicationDbContext())
            {
                var movies = context.Movies.Where(m => m.MovieId == MovieId).FirstOrDefault();

                return Ok(movies);
            }

            
        }

        public IHttpActionResult Get(string searchType, string searchText)
        {
            if (searchType == "Title")
            {
                var results = context.Movies.Where(m => m.Title.Contains(searchText)).ToList();

                return Ok(results);
            }
            else if (searchType == "Director")
            {
                var results = context.Movies.Where(m => m.Director.Contains(searchText)).ToList();

                return Ok(results);
            }
            else if (searchType == "Genre")
            {
                var results = context.Movies.Where(m => m.Genre.Contains(searchText)).ToList();

                return Ok(results);
            }
            else
            {
                return BadRequest();
            }
        }

        // POST api/movie
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

        // PUT api/movie/5
        [HttpPut]

        public void Put(int id, [FromBody]Movie movie)
        {

            using (ApplicationDbContext context = new ApplicationDbContext())
            {
                var movies = context.Movies.FirstOrDefault(m => m.MovieId == id);

                movies.Title = movie.Title;
                movies.Genre = movie.Genre;
                movies.Director = movie.Director;
                context.SaveChanges();
            }
            // Update movie in db logic
        }

        // DELETE api/movie/5
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