
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

    // var http = new XMLHttpRequest();

    // http.onreadystatechange = function() {
    //     if(http.readyState == 4 && http.status == 200) {
    //         console.log(JSON.parse(http.response));
    //     }
    // };

    // http.open('GET', '../data/file.json', true);
    // http.send();

    // console.log('test');

    // /**  ASYNCHRONOUS CALLBACKS */
    // $.get('../data/file.json', function(data) {
    //     console.log(data);
    // });
    // console.log('test');


    // /**** SYNCHRONOUS CALLBACKS */

    // var fruits = ['apple', 'banana', 'mango'];

    // /**** INLINE CALLBACKS */
    
    // // fruits.forEach(function(val) {
    // //     console.log(val);
    // // });

    // var callback = function(val) {
    //     console.log(val);
    // }
    // fruits.forEach(callback);
    // console.log('done');




    /** CALLBACK HELL SOLUTION SYNCHRONOUS WAY */

    // function errorHandler(jqXHR, textStatus, error) {
    //     console.log(error);
    // }

    // $.ajax({
    //     type: "GET",
    //     url: "../data/file.json",
    //     success: cbTweets,
    //     error: errorHandler
    // });

    // function cbTweets (data) {
    //     console.log(data);

    //     $.ajax({
    //         type: "GET",
    //         url: "../data/friends.json",
    //         success: cbFriends,
    //         error: errorHandler
    //     });
    // }

    // function cbFriends (data) {
    //     console.log(data);

    //     $.ajax({
    //         type: "GET",
    //         url: "../data/videos.json",
    //         success: cbVideos,
    //         error: errorHandler
    //     });
    // }

    // function cbVideos (data) {
    //     console.log(data);
    // }
    


    /*** XMLHTTP req PROMISES */

    // function get(url) {
    //     return new Promise(function (resolve, reject) {
    //         var xhttp = new XMLHttpRequest();
    //         xhttp.open('GET', url, true);
    //         xhttp.onload = function() {
    //             if (xhttp.status == 200) {
    //                 resolve(JSON.parse(xhttp.response));
    //             } else {
    //                 reject(xhttp.statusText);
    //             }
    //         };
    //         xhttp.onerror = function() {
    //             reject(xhttp.statusText);
    //         }
    //         xhttp.send();
    //     });
    // }      

    // var promise = get('../data/file.json');
    // promise.then(function(tweets) {
    //     console.log(tweets);
    //     return get('../data/friends.json');
    // }).then(function(friends) {
    //     console.log(friends);
    //     return get('../data/videos.json');
    // }).then(function(videos) {
    //     console.log(videos);
    // }).catch(function(error) {
    //     console.log(error);
    // });







    /****JQUERY PROMISES */
    // $.get('../data/file.json').then(function(data) {
    //     console.log(data);
    //     return $.get('../data/videos.json').then(function(data) {
    //         console.log(data);
    //         return $.get('../data/videos.json').then(function(data) {
    //             console.log(data);
    //         })
    //     })
    // })






    /*** GENERATORS */

    function* gen() {
        // yield console.log('pear'); // JS goes from right to left in a statement. prints pear. pauses on yield !
        // yield console.log('apple');
        // yield console.log('banana');
        // console.log('done all');
        
        // yield "pear";
        // yield "apple";
        // yield "banana";
        // return "done all";

        // var x = yield "pear";
        // var y = yield "apple";
        // var z = yield "banana";
        // return x + y + z;

        var x = yield 10;
        console.log(x);
    }

    var generated = gen();
    // generated.next();
    // generated.next();
    // generated.next();

    // console.log(generated.next());
    // console.log(generated.next());
    // console.log(generated.next());
    // console.log(generated.next());

    // console.log(generated.next());
    // console.log(generated.next(5)); // takes value of var x
    // console.log(generated.next(10)); // takes value of var y
    // console.log(generated.next(20)); // takes value of var z

    console.log(generated.next());
    console.log(generated.next());


    genWrapper(function* generator() {
    // Q.async(function* generator() {
    // bluebird.async(function* generator() {

        var tweets = yield $.getJSON('../data/file.json');
        console.log(tweets);

        var friends = yield $.getJSON('../data/friends.json');
        console.log(friends);
        
        var videos = yield $.getJSON('../data/videos.json');
        console.log(videos);
        
    });



    function genWrapper(generator) {

        // set up generator / iterator
        var myGen = generator();

        // create fn to handle yielded value
        function handle(yielded) {
            if(!yielded.done) {
                yielded.value.then(function(data) {
                    return handle(myGen.next(data));
                });
            }
        }//end handle

        // return handle fn, passing in myGen.next
        return handle(myGen.next());

    }//end genWrapper




};

/*
//Ready states


0 - req not initialized
1 - req has been set up
2 - req has been sent
3 - req is in process
4 - req is complete

*/


/*

callbacks - good
promises - better
generators - awesome

*/
