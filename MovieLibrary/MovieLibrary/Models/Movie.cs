using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MovieLibrary.Models
{
    public class Movie
    {
        public int MovieId { get; set; }
        public string Title { get; set; }
        public string Director { get; set; }
    }
}