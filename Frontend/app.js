    function addMovie( e ){
        var dict = {
        	Title : this["Title"].value,
        	Director: this["Director"].value,
					Genre: this["Genre"].value
        };

        $.ajax({
            url: 'https://localhost:44392/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
								getMovies();
            },
            error: function( jqXhr, textStatus, errorThrown, data ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

//  $('#new-movie').submit(addMovie);


function getMovies() {
  $.ajax({
    url: 'https://localhost:44392/api/movie',
    dataType: 'json',
    type: 'get',
    contentType: 'application/json',
    success: function(result) {
      var htmlValue = "";
      $('#view-table-body').html(htmlValue);
      $.each(result, function(key, value) {
        htmlValue += '<tr><td>' + value.Title + '</td><td>' + value.Director + '</td><td>' + value.Genre + '</td>';
        htmlValue += '<td><button type="submit" id="get-this-movie" onclick="getMovie('+ value.MovieId +')">Update</button></td></tr>\n';
      })

      $('#view-table-body').html(htmlValue);
    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
}

function addMovieForm() {

  $.ajax({
    url: 'https://localhost:44392/api/movie',
    dataType: 'json',
    type: 'post',
    contentType: 'application/json',
    success: function(result) {

      var htmlValue = "";
      $('#view-table-body').html(htmlValue);
      htmlValue += '<form id="new-movie"> ' +
	     '	<input id="new-movie-title" type="text" name="Title" placeholder="Title" /><br /> ' +
	      '	<input id="new-movie-director" type="text" name="Director" placeholder="Director" /><br /> ' +
	       '<input id="new-movie-genre" type="text" name="Genre" placeholder="Genre" />' +
		'<button type ="submit">Submit</button>'+
	'</form>'
    $('#view-table-body').html(htmlValue);
    $('#new-movie').submit(addMovie);
}
})

function getMovie(MovieId) {
  $.ajax({
    url: 'https://localhost:44392/api/movie?MovieId=' + MovieId,
    dataType: 'json',
    type: 'get',
    contentType : 'application/json',
    success: function(result) {
      var htmlValue = "";
      $('#view-table-body').html(htmlValue);

      htmlValue += '<tr><td>' + result.Title + '</td><td>' + result.Director + '</td><td>' + result.Genre + '</td>';

      $('#view-table-body').html(htmlValue);
    },

    error: function(jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
}

/*
(function($) {
  function updateMovie( e ){
    var dict = {
      Title: this["Title"].value,
      Director: this ["Director"].value,
      Genre: this ["Genre"].value,
      MovieId: this["MovieId"].value
    };

  $.ajax({
    url: 'http://localhost:44392/api/movie?MovieId=' + dict.MovieId,
    dataType: 'json',
    type: 'put',
    contentType: 'application/json',
    data: JSON.stringify(dict),
    success: function(data, textStatus, jQxhr) {
        $('#response pre').html(data);
        getMovies();
    },
    error: function(jqXhr, textStatus, errorThrown ){
      console.log(errorThrown);
    }
  });
    e.preventDefault();
  }
  $('#updateMovie').submit(updateMovie);
})(jQuery);
}
*/

(function($){
    function updateMovie( e ){
        var dict = {
        	Title : this["Title"].value,
        	Director: this["Director"].value,
					Genre: this["Genre"].value,
					MovieId: this["MovieId"].value
        };

        $.ajax({
            url: 'https://localhost:44392/api/movie?Id=' + dict.MovieId,
            dataType: 'json',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
								getMovies();
            },
            error: function( jqXhr, textStatus, errorThrown, data ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#updateMovie').submit( updateMovie );
})(jQuery);
}
