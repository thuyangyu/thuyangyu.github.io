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
    
    var speech = new SpeechSynthesisUtterance("hello, how are you");
    window.speechSynthesis.speak(speech);
}

/*This function handles touch moves*/
function handleTouchMoveEvent(event) {
    var messageDiv = document.getElementById("message");
    messageDiv.innerHTML = "touch moved to:" + event.touches[0].screenX.toFixed(2) + "," + event.touches[0].screenY.toFixed(2);
}


//Collect Sensor Data
/*This function is called when the page is loaded*/
function handleLoadEvent() {
  if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", handleDeviceMotionEvent);
  }
  else {
    var messageDiv = document.getElementById("message");
    messageDiv.innerHTML = "DeviceMotionEvent not supported"
  } 
}

/*This function handles deviceorientation events*/
function handleDeviceMotionEvent(event) {
  var messageDiv = document.getElementById("tablet-status");
  //alert("Device moved!");
  /*You can also use event.accelerationIncludingGravity which should have a constant downward acceleration*/
  
  var accX = event.acceleration.x;
  var accY = event.acceleration.y;
  var accZ = event.acceleration.z;

  //test print
  //console.log("Acc-X:" + accX.toFixed(1) + " m/s^2 <br>");


  messageDiv.innerHTML = "Acc-X:" + accX.toFixed(1) + " m/s^2 <br>";
  messageDiv.innerHTML += "Acc-Y:" + accY.toFixed(1) + " m/s^2 <br>";
  messageDiv.innerHTML += "Acc-Z:" + accZ.toFixed(1) + " m/s^2";
}




function getStreetView() {
    //    console.log("start getStreetView function!");

    MY_STREET_VIEW_API_KEY = "AIzaSyAGhvkC_P_G_rvjF05tJFd31SM3Z4FPf2E";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            //            ltt = position.coords.latitude;
            //            lng = position.coords.longitude;
            ltt = 40.720032;
            lng = -73.988354;
            ltt = ltt.toString();
            lng = lng.toString();
            console.log("current ltt and lng are " + ltt + " " + lng);

            url = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + ltt + "," + lng + "&key=" + MY_STREET_VIEW_API_KEY;

            var mapDiv = document.getElementById("street-view");
            mapDiv.innerHTML =
                '<img src=' + url + '>';
        });


    } else {
        console.log("failed open navigator.geolocation");
    }
}

function getLocation() {
    //    console.log("start getLocation function!");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            ltt = position.coords.latitude;
            lng = position.coords.longitude;

            var messageDiv = document.getElementById("message");
            messageDiv.innerHTML =
                "You are at " + ltt.toFixed(2) + "," + lng.toFixed(2);

            console.log("current ltt and lng are " + ltt + " " + lng);

            // Create a map object and specify the DOM element for display.
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: ltt,
                    lng: lng
                },
                zoom: 16
            });

            var marker = new google.maps.Marker({
                map: map,
                position: {
                    lat: ltt,
                    lng: lng
                },
                title: 'You are here!'
            });
        });

    } else {
        console.log("failed open navigator.geolocation");
    }
}


function getWeather() {
    navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude
        lng = position.coords.longitude
        lat = lat.toString()
        lng = lng.toString()


        MY_WEATHER_API_KEY = "b1b15e88fa797225412429c1c50c122a1";
        MY_GOOGLE_API = "AIzaSyAGhvkC_P_G_rvjF05tJFd31SM3Z4FPf2E";
        url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + MY_GOOGLE_API;

        console.log("start ajax to get weather");
        console.log(url);

        $.getJSON(url, function (res) {
            results = res['results'];
            city = results[0]['address_components'][3]['long_name'];
            //console.log(city);
            url = "https://openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + MY_WEATHER_API_KEY;
            console.log(url);
            $.getJSON(url, function (data) {
                //data = JSON.parse(data);
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

                console.log(weatherText);
                $('#weather').html(' <h2>Weather Info</h2>' + weatherText)
            })
        })
    })
}

function getNews() {
    newsKey = '4e9089688f0a454c95b59f97f4b994d0'
    navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude
        lng = position.coords.longitude
        lat = lat.toString()
        lng = lng.toString()

        url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyD3N7NC_ztTEmHt8BugovKtg1sHCOyfs6Y'
        console.log("city url here");
        console.log(url);

        $.getJSON(url, function (res) {
            results = res['results']
            city = results[0]['address_components'][3]['long_name']
            country = results[0]['address_components'][6]['short_name']
                // get News  exp:  https://newsapi.org/v1/sources?language=en
            
            category = "business";
            url = 'https://newsapi.org/v1/sources?language=en' + '&category=' + category + '&country=us'

            console.log("news url here");
            console.log(url);
            
            newsList = [];
            $.getJSON(url, function (res) {
                newsSources = res['sources']
                newsList = $('#newsList')
                newsList.html('')
                for (var i = 0; i < newsSources.length; i++) {
                    name = newsSources[i].name
                    url = newsSources[i].url
                    id = "news" + i + ""
                    innerHtml = "<a href=" + url + ">" + newsSources[i].description + "</a>"
                    newsList.push(innerHtml)
                }
                console.log("newsList");
                console.log(newsList);
                
                var news_text = '<h2>News Descriptions </h2>';
                for(var i = 0; i < newsList.length; i++){
                    news_text += newsList[i] + '<hr>';
                }
                $('#news').html(news_text);
            })
        })
    })
}