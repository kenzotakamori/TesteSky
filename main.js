$(document).ready(function(){
    $("header").load("header.html")
    $("footer").load("footer.html")
    var url = 'https://sky-frontend.herokuapp.com/movies'
    $.get(url, function(data){
        console.log('data', data);
    })
});