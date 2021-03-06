$(document).ready(function() {
  $('#search input').on('input', function(e) {
    e.preventDefault();
    searchMoviesByName($(this).val());
    isNotFoundMovies();
  });

  $('#categories').on('change', function(e) {
    e.preventDefault();
    searchMovieByCategory($(this).val());
    isNotFoundMovies();
});

  $('#search input').on('input',function() {
    if($(this).val().length > 0) {
        $('#search button span').text('Clear');
        $('#search button').addClass('clear-search-field');
        $('#search button i').removeClass('fas fa-search');
        $('#search button i').addClass('fas fa-times');
        return;
    } 
    $('#search button').trigger('click');    
  });

  $('#search button').on('click', function() {
    if($(this).hasClass('clear-search-field')) {
      $('#search input').val('');
      $('#search button').removeClass('clear-search-field');
      $('#search button span').text('Search');
      $('#search button i').removeClass('fas fa-times');
      $('#search button i').addClass('fas fa-search');    
      searchMoviesByName('');
      isNotFoundMovies();
      jQuery('.not-found').hide(300);
    }
  });

  function searchMoviesByName(keyword) {
    keyword = keyword.toLowerCase();
    let foundMovies = allMovies.movies.filter(function(movie) {
	    let movieName = movie.original.name.toLowerCase();
      return movieName.indexOf(keyword) !== -1;
    });
    loopMoviesAndAppendToHtml(foundMovies);
  }

  function searchMovieByCategory(keyword) {
    keyword = keyword.toLowerCase();
    let foundMovies = allMovies.movies.filter(function(movie) {
        let isKeywordEqualsGenre = false;
        movie.original.genres.some(function(genre) {
            let genreName = genre.name.toLowerCase();
            isKeywordEqualsGenre = genreName.indexOf(keyword) !== -1;
            return isKeywordEqualsGenre;
        });
        return isKeywordEqualsGenre;
    });
    if(keyword === 'all') {
        foundMovies = allMovies.movies;
    } 
    loopMoviesAndAppendToHtml(foundMovies);
  }

 function isNotFoundMovies() {
    if(jQuery('.movies').children().length === 0) {
        jQuery('.not-found').show(300);
        return;
    }
    jQuery('.not-found').hide(300);
  }
});