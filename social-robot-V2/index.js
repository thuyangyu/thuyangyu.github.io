/*This function is called when the page is loaded*/
function handleLoadEvent() {
    window.addEventListener("touchstart", handleTouchEvent, false);
    window.addEventListener("touchend", handleTouchEvent, false);
    window.addEventListener("touchmove", handleTouchMoveEvent, false);
}

/*This function handles touch events*/
function handleTouchEvent(event) {
    /* Prevent the default browser action to touch events*/
    if (event.type === "touchstart") {
        event.preventDefault();
    }

    /* Get the list of all touches currently on the screen */
    var allTouches = event.touches;
    /* Get the length of the list*/
    var allTouchesLength = allTouches.length;
    /* Get a div element to display the number*/
    var messageDiv = document.getElementById("message");
    messageDiv.innerHTML = "# of touches:" + allTouchesLength;
}

/*This function handles touch moves*/
function handleTouchMoveEvent(event) {
    var messageDiv = document.getElementById("message");
    messageDiv.innerHTML = "touch moved to:" + event.touches[0].screenX.toFixed(2) + "," + event.touches[0].screenY.toFixed(2);
}

function getLocation() {
//    console.log("start getLocation function!");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            ltt = position.coords.latitude;
            lng = position.coords.longitude * -1;
            ltt = ltt.toString();
            lng = lng.toString();
            MY_STREET_VIEW_API_KEY = "AIzaSyAGhvkC_P_G_rvjF05tJFd31SM3Z4FPf2E";
            console.log("current ltt and lng are " + ltt + " " + lng);
            
            
            url = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + ltt + "," + lng + "&heading=151.78&pitch=-0.76&key="+MY_STREET_VIEW_API_KEY;
            
            //          url = 'https://www.google.com/maps/embed/v1/streetview?key='+key+'&location='+ltt+','+lng+'&heading=210&pitch=10&fov=35'
//            $('#map').attr({src:url,height:256,width:260})

            /* Get a reference to the map div */
            var mapDiv = document.getElementById("map");

            /* Plot a map with current location */
            mapDiv.innerHTML =
                '<img src=' + url + '>';

        });
    }else{
        console.log("failed open navigator.geolocation");
    }
}


function getWeather() {
    navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude
        lng = position.coords.longitude
        lat = lat.toString()
        lng = lng.toString()
        url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyD3N7NC_ztTEmHt8BugovKtg1sHCOyfs6Y'
        $.getJSON(url, function (res) {
            results = res['results']
            city = results[0]['address_components'][3]['long_name']
            url = "'http://openweathermap.org/data/2.5/weather?q=" + city + "&appid=b1b15e88fa797225412429c1c50c122a1'"
            $.getJSON('https://query.yahooapis.com/v1/public/yql', {
                q: "select * from json where url=" + url,
                format: 'json'
            }, function (data) {
                data = data.query.results.json
                city = data['name']
                    //description = data['weather'][0]['description']
                humidity = data['main']['humidity']
                pressure = data['main']['pressure']
                temp_avg = data['main']['temp']
                temp_max = data['main']['temp_max']
                temp_min = data['main']['temp_min']
                wind_direction = data['wind']['degree']
                wind_speed = data['wind']['speed']
                time = new Date(data['dt'] * 1000)
                year = time.getFullYear()
                months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                month = months[time.getMonth()]
                date = time.getDate()
                weatherText = 'city: ' + city + '<br>Date: ' + year + ' ' + month + ' ' + date + '<br>humidity: ' + humidity + '<br>pressure: ' + pressure + '<br>averate temperature: ' + temp_avg + '<br>max temperature: ' + temp_max + '<br>min temperature: ' + temp_min
                $('#weather').html(' <h1>Weather Info</h1>' + weatherText)
            })
        })
    })
}

function getNews() {
    var text = $('#category').text()
    if (text === 'Category' || text === 'Language') {
        alert('Please select news category and language')
        return
    }
    newsKey = '4e9089688f0a454c95b59f97f4b994d0'
    navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude
        lng = position.coords.longitude
        lat = lat.toString()
        lng = lng.toString()
        url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyD3N7NC_ztTEmHt8BugovKtg1sHCOyfs6Y'
        $.getJSON(url, function (res) {
            results = res['results']
            city = results[0]['address_components'][3]['long_name']
            country = results[0]['address_components'][6]['short_name']
                // get News  exp:  https://newsapi.org/v1/sources?language=en
            var language = null
            if ($('#language').text() === 'English') {
                language = 'en'
            } else if ($('#language').text() === 'French') {
                language = 'fr'
            } else {
                language = 'de'
            }
            category = $('#category').text()
            url = 'https://newsapi.org/v1/sources?language=' + language + '&category=' + category + '&country=us'
            $.getJSON(url, function (res) {
                newsSources = res['sources']
                newsList = $('#newsList')
                newsList.html('')
                for (var i = 0; i < newsSources.length; i++) {
                    name = newsSources[i].name
                    url = newsSources[i].url
                    newsDescriptions.push(newsSources[i].description)
                    id = "news" + i + ""
                    innerHtml = "<li><a href='" + url + "'>" + name + "</a>" + "<a class='play' href='#' id=" + id + " style='float:right'>play</div>"
                    newsList.append(innerHtml)
                }
                visualizeJson(res['sources'])
            })
        })
    })
}