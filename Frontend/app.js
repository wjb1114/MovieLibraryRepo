(function($){
    function processForm( e ){
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
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#new-movie').submit( processForm );
})(jQuery);