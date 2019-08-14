function processForm(e) {
  var dict = {
    Title: this["Title"].value,
    Director: this["Director"].value,
    Genre: this["Genre"].value
  };

  $.ajax({
    url: 'https://localhost:44392/api/movie',
    dataType: 'json',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify(dict),
    success: function(data, textStatus, jQxhr) {
      $('#response pre').html(data);
    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });

  e.preventDefault();
}

function getMovies(e) {
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
        htmlValue += '<td><button type="submit" id="get-this-movie">Get Movie List</button></td></tr>\n';
      })

      $('#view-table-body').html(htmlValue);
    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });

  e.preventDefault();
}
