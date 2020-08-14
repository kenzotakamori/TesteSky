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
    var catalog = [
        {
            id:'#action',
            category: 'Ação e Aventura',
            movies: []
        },
        {
            id:'#suspense',
            category: 'Suspense',
            movies: []
        },
        {
            id:'#drama',
            category: 'Drama',
            movies: []
        }
    ];
    function buildPageOnRequest() {
        $.get(url, function(data){
            let highlightMovies = getHighlightMovies(data);
            let movieOptions = getMovieOptions(data);

            appendHighlightCarousel(highlightMovies);
            catalog.forEach(function(item){
                getMoviesByCategory(movieOptions, item);
                appendMovieSectionByCategory(item);
            })
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

    function getMoviesByCategory(options, item) {
        item.movies = options.filter(function(option){
            return option.categories.indexOf(item.category) >= 0;
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

    function appendMovieSectionByCategory(item) {
        $(item.id).append('<h2>' + item.category + '</h2>');
        let carousel = buildMovieCarousel(item.movies);
        $(item.id).append(carousel);
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
        slickHighlightCarousel();
        catalog.forEach(function(item){
            slickMovieCarousel(item.id);
        })
    };

    function slickHighlightCarousel() {
        $("#highlight-carousel").slick({
            dots: true,
            centerMode: true,
            centerPadding: '10vw',
            infinite: true,
            slidesToShow: 1,
            responsive: [
                {
                    breakpoint: 700,
                    settings: {
                        dots: false,
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        });
    };

    function slickMovieCarousel(id) {
        $(id).find(".movie-carousel").slick({
            arrows: true,
            centerMode: true,
            slidesToShow: 6,
            slidesToScroll: 6,
            responsive: [
                {
                    breakpoint: 700,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });
    };

    init();
});