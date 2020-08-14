$(document).ready(function(){

    function init() {
        mountHeaderAndFooter();
        buildPageOnRequest();
    };

    function mountHeaderAndFooter() {
        $("header").load("header.html");
        $("footer").load("footer.html");
    };

    var url = 'https://sky-frontend.herokuapp.com/movies';
    function buildPageOnRequest() {
        $.get(url, function(data){
            let highlightMovies = getHighlightMovies(data);
            let movieOptions = getMovieOptions(data);
            let actionMovies = getMoviesByCategory(movieOptions, 'Ação e Aventura');
            let suspenseMovies = getMoviesByCategory(movieOptions, 'Suspense');
            let comedyMovies = getMoviesByCategory(movieOptions, 'Comédia');
            
            appendHighlightCarousel(highlightMovies);
            appendMovieSectionByCategory(actionMovies, '#action', 'Ação e Aventura');
            appendMovieSectionByCategory(suspenseMovies, '#suspense', 'Suspense');
            appendMovieSectionByCategory(comedyMovies, '#comedy', 'Comédia');
            slickCarousels();
        })
    };

    function getHighlightMovies(data) {
        let selectedOption = getSelectedOption(data, 'highlights');
        return (selectedOption && selectedOption[0]) ? selectedOption[0].items : [];
    };

    function getMovieOptions(data) {
        let selectedOption = getSelectedOption(data, 'carousel-portrait');
        return (selectedOption && selectedOption[0]) ? selectedOption[0].movies : [];
    };

    function getSelectedOption(data, type) {
        return data.filter(function(option){
            return option.type == type;
        });
    };

    function getMoviesByCategory(options, category) {
        return options.filter(function(option){
            return option.categories.indexOf(category) >= 0;
        })
    };

    function appendHighlightCarousel(highlightMovies) {
        highlightMovies.forEach(function(highlight){
            let tile = buildHighlightTile(highlight);
            $("#highlight-carousel").append(tile);
        })
    };

    function buildHighlightTile(highlight) {
        let tile = '<div class="highlight-tile"><img src="' + 
            highlight.images[0].url + '"/></div>'
        return tile;
    };

    function appendMovieSectionByCategory(movies, id, category) {
        $(id).append('<h2>' + category + '</h2>');
        let carousel = buildMovieCarousel(movies);
        $(id).append(carousel);
    };

    function buildMovieCarousel(movies) {
        let carousel = '<div class="movie-carousel">';
        movies.forEach(function(movie){
            let tile = buildMovieTile(movie);
            carousel += tile;
        })
        return carousel + '</div>'
    };

    function buildMovieTile(movie) {
        let tile = '<div class="movie-tile"><img src="' + 
            movie.images[0].url + '"/></div>'
        return tile;
    };

    function slickCarousels() {
        $("#highlight-carousel").slick({
            dots: true,
            centerMode: true,
            centerPadding: '12.5vw',
            slidesToShow: 1,
            responsive: [
                {
                    breakpoint: 700,
                    settings: {
                        dots: false,
                        arrows: false,
                        centerMode: true,
                        centerPadding: '10px',
                        slidesToShow: 1
                    }
                }
            ]
        });
        $("#action").find(".movie-carousel").slick();
        $("#suspense").find(".movie-carousel").slick();
        $("#comedy").find(".movie-carousel").slick();
    }

    init();
});