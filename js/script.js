
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview' +
        '?size=600x400&location=' + address + '&key=AIzaSyCFTUY3SQrwjehWvzwoJdQ6X2k-Dxh63G4';

    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    //NY Times api
    var nytimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nytimesUrl += '?' + $.param({
        'api-key': "fadb9c4afda741938d33e0859bb47f59",
        'q': cityStr
    });

    $.getJSON(nytimesUrl, function (data) {

        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        var articles = data.response.docs;

        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' +
                '<a href="' + article.web_url + '">' + article.headline.main +
                '</a>' +
                '<p>' + article.snippet + '</p>' +
                '</li>');
        };

    }).error(function(e) {
        $nytHeaderElem.text('New York Times Articles could not be loaded');
    });


    //Wikipedia api
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + 
    '&format=json&callback=wikiCallback';

    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text('Failed to get wikipedia resources');
    }, 8000); 

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        //jsonp: "callback",
        success: function(response) {   
            var articleList = response[1];

            for (var i = 0; i < articleList; i++) {
                var articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            }

            clearTimeout(wikiRequestTimeout);
        }
    })


    return false;
};

$('#form-container').submit(loadData);

window.onload = function() {

    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            console.log(JSON.parse(http.response));
        }
    };

    http.open('GET', '../data/file.json', true);
    http.send();

    console.log('test');

};

/*
//Ready states


0 - req not initialized
1 - req has been set up
2 - req has been sent
3 - req is in process
4 - req is complete


*/