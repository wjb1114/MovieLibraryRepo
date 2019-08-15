    function addMovie( e ){
      var id = document.getElementById("addMovie-id");
    	console.log(id);
        var dict = {
        	Title : document.getElementById("addMovie-title").value,
        	Director: document.getElementById("addMovie-director").value,
    			Genre: document.getElementById("addMovie-genre").value,
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

      var htmlValue = "";
      $('#view-table-body').html(htmlValue);
      htmlValue += '<form id="new-movie"> ' +
	     '	<input id="addMovie-title" type="text" name="Title" placeholder="Title" /><br /> ' +
	      '	<input id="addMovie-director" type="text" name="Director" placeholder="Director" /><br /> ' +
	       '<input id="addMovie-genre" type="text" name="Genre" placeholder="Genre" />' +
		'<button type ="submit" id = "addMovie-button">Submit</button>'+
	'</form>'
    $('#view-table-body').html(htmlValue);
    var thisButton = document.getElementById("addMovie-button");
    thisButton.addEventListener("click", addMovie);
}


function getMovie(MovieId) {
  $.ajax({
    url: 'https://localhost:44392/api/movie?MovieId=' + MovieId,
    dataType: 'json',
    type: 'get',
    contentType : 'application/json',
    success: function(result) {
      var htmlValue = "";
      $('#view-table-body').html(htmlValue);

      htmlValue += '<tr><td>' + result.Title + '</td><td>' + result.Director + '</td><td>' + result.Genre + '</td></tr>';
			htmlValue += '<tr><td><button type="submit" onclick="updateMovieForm(' + result.MovieId + ')">Update</button></td></tr>';

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

function updateMovie( e ){
	var id = document.getElementById("updateMovie-id");
	console.log(id);
    var dict = {
    	Title : document.getElementById("updateMovie-title").value,
    	Director: document.getElementById("updateMovie-director").value,
			Genre: document.getElementById("updateMovie-genre").value,
			MovieId: document.getElementById("updateMovie-id").value
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

function updateMovieForm (MovieId) {
	$.ajax({
    url: 'https://localhost:44392/api/movie?MovieId=' + MovieId,
    dataType: 'json',
    type: 'get',
    contentType : 'application/json',
    success: function(result) {
      var htmlValue = "";
      $('#view-table-body').html(htmlValue);

      htmlValue += '<form id="updateMovie">'
			htmlValue += '<input id="updateMovie-title" type="text" name="Title" placeholder="Title" value=\"' + result.Title + '\"/><br />\n';
			htmlValue += '<input id="updateMovie-director" type="text" name="Director" placeholder="Director" value=\"' + result.Director + '\"/><br />\n';
			htmlValue += '<input id="updateMovie-genre" type="text" name="Genre" placeholder="Genre" value=\"' + result.Genre + '\"/><br />\n';
			htmlValue += '<input id="updateMovie-id" type="text" name="MovieId" placeholder="MovieId" value=\"' + result.MovieId + '\" hidden /><br />\n';
			htmlValue += '<button type="submit" id="updateMovie-button">Update</button>\n';
			htmlValue += '</form>';
      $('#view-table-body').html(htmlValue);

			var thisButton = document.getElementById("updateMovie-button");
			thisButton.addEventListener("click", updateMovie);
    },

    error: function(jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
}

  // $('#updateMovie').submit( updateMovie );
