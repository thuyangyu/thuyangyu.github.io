var status = 0;
var cityNameLabel = document.getElementById("cityName");
var weatherText = document.getElementById("weatherReading");
var displayText = document.getElementById("textInDialogBox");


var old_orientation_stat = -1;

$(document).ready(function() {
  $("#robot-face-normal").css("display", "initial");
  $("#step-1").css("display", "initial");
});

$("#submit-1").click(function(e) {
  $("#step-1").css("display", "none");
  $("#step-2").css("display", "initial");
  stress_value = $("#stress-range").val();
});

$("#submit-2").click(function(e) {
  $("#step-2").css("display", "none");
  energy_value = $("#energy-range").val();
  if (energy_value > 0 || stress_value > 0) {
    $("#robot-face-normal").css("display", "none");
    $("#robot-face-sad").css("display", "initial");
    $("#sad-suggestion").css("display", "initial");
    window.setTimeout(function() {
      $("#sad-suggestion").css("display", "none");
      $("#step-1").css("display", "initial");
      $("#robot-face-sad").css("display", "none");
      $("#robot-face-normal").css("display", "initial");
    }, 2800);
  } else {
    $("#robot-face-normal").css("display", "none");
    $("#robot-face-happy").css("display", "initial");
    $("#good-suggestion").css("display", "initial");
    window.setTimeout(function() {
      $("#good-suggestion").css("display", "none");
      $("#step-1").css("display", "initial");
      $("#robot-face-happy").css("display", "none");
      $("#robot-face-normal").css("display", "initial");
    }, 2800);
  }
});

$("#robot-face").click(function(e) {
  //show hi
  $("#say-hi").css("display", "initial");
  //hide hi
  window.setTimeout(function() {
    $("#say-hi").css("display", "none");
  }, 2800);
});

$("#zone-a").mousemove(function(e) {
  var offset = $(this).offset();
  var width = $(this).width();
  var height = $(this).height();
  var ratio_x = (e.pageX - offset.left - width / 2) / width * 2;
  var ratio_y = (e.pageY - offset.top - height / 2) / height * 2;
  // console.log(ratio_x);
  // console.log(ratio_y);

  var r_top = 193 + ratio_y * 25;
  var r_left = 704 + ratio_x * 25;
  var l_top = 193 + ratio_y * 25;
  var l_left = 216 + ratio_x * 25;
  $(".pupil-r").css("top", r_top);
  $(".pupil-r").css("left", r_left);
  $(".pupil-l").css("top", l_top);
  $(".pupil-l").css("left", l_left);
});

// Geo Sensor
function geoFindMe() {
  var cityNameLabel = document.getElementById("cityName");
  // if not supported
  if (!navigator.geolocation){
    cityNameLabel.textContent = "Geolocation is not supported by your browser";
    return;
  }
  // if succeeded in retrieving location
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    // parse the lat-lng with google reverse API
    var MY_GOOGLE_API = "AIzaSyCFRm__E7OuBJz0P2A4X_GEVa2nqu0rY00";
    // var MY_WEATHER_API_KEY = "a995b7ec6602c03853d099ff68923916";
    // var MY_WEATHER_API_KEY = "a995b7ec6602c03853d099ff68923916";
    var MY_WEATHER_API_KEY = "b1b15e88fa797225412429c1c50c122a1";
    url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + MY_GOOGLE_API;
    $.getJSON(url, function(res) {
      // console.log("inside getJSON");
      results = res['results'];
      city = results[0]['address_components'][3]['long_name'];  
      console.log(city);
      cityNameLabel.textContent = city;
      
      url = "https://openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + MY_WEATHER_API_KEY;
      console.log(url);
      $.getJSON(url, function(data) {
          //data = JSON.parse(data);
          city = data['name']
          //description = data['weather'][0]['description']
          weather = data['weather'][0]['main'];
          temp_avg = data['main']['temp'];
          weather_text_on_page = weather + " " + temp_avg + "°C";
          weatherText.textContent = weather_text_on_page;
          console.log(weather);
          // var synth = window.speechSynthesis;
          // var wooo = new SpeechSynthesisUtterance("Wooo!");
          // synth.speak(wooo);
          // var testoutput = document.getElementById("testoutput");
          // testoutput.innerHTML = "Good";
      })
      
  })}
  // if error
  function error() {
    cityNameLabel.textContent = "Geolocation is not supported by your browser";
  }

  cityNameLabel.textContent = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);
}


//Function Speech
var synth = window.speechSynthesis;
var wooo = new SpeechSynthesisUtterance("Wooo!");
var wow = new SpeechSynthesisUtterance("Wow!");

function speak_wow() {
    var amISpeaking = synth.speaking;
    if (amISpeaking == false) {
        synth.speak(wow);
    }
}

function speak_wooo() {
    var amISpeaking = synth.speaking;
    if (amISpeaking == false) {
        synth.speak(wooo);
    }
}

function handleLoadEvent() {
    window.addEventListener("touchstart", handleTouchEvent, false);
    window.addEventListener("touchend", handleTouchEvent, false);
    //window.addEventListener("touchmove", handleTouchMoveEvent, false);
    window.addEventListener("deviceorientation", handleDeviceOrientationEvent);
    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", handleDeviceMotionEvent, false);
    } else {
        var messageDiv = document.getElementById("message");
        messageDiv.innerHTML = "DeviceMotionEvent not supported"
    }
}

function handleDeviceMotionEvent(event) {
    //alert("DeviceMotionEventTriggered!"); 
    /*You can also use event.accelerationIncludingGravity which should have a constant downward acceleration*/

    var accX = event.acceleration.x;
    var accY = event.acceleration.y;
    var accZ = event.acceleration.z;
    var acceleration = Math.sqrt((accX * accX + accY * accY + accZ * accZ) / 3);

    // var testoutput = document.getElementById("testoutput");
    // testoutput.innerHTML = "Acc-X:" + accX.toFixed(1) + " m/s^2 <br>";
    // testoutput.innerHTML += "Acc-Y:" + accY.toFixed(1) + " m/s^2 <br>";
    // testoutput.innerHTML += "Acc-Z:" + accZ.toFixed(1) + " m/s^2 <br>";
    if (parseFloat(acceleration).toFixed(1) > parseFloat("3").toFixed(1)) {
        speak_wow();
    }
    //testoutput.innerHTML = "Good";
}

/*This function handles device orientation event */
function handleDeviceOrientationEvent(event) {
//     var messageDiv = document.getElementById("tablet-orientation");


    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;

    var orientation_stat = 1;
    // messageDiv.innerHTML = "alpha:" + alpha.toFixed(1) + " deg <br>";
    // messageDiv.innerHTML += "beta:" + beta.toFixed(1) + " deg <br>";
    // messageDiv.innerHTML += "gamma:" + gamma.toFixed(1) + " deg<br>";

 
    if(beta < 45.0 && beta > -45.0 && gamma < 22.5 && gamma > -22.5)
        old_orientation_stat = 1;// "FACE UP"
    else if((beta < -135.0 || beta > 135.0) && (gamma < 22.5 && gamma > -22.5))
        old_orientation_stat = 2;// "FACE DOWN"
    else
        old_orientation_stat = 3;//"STANDING UP";
    
    if((old_orientation_stat != -1) && (old_orientation_stat != orientation_stat)
      speak_wooo();

    old_orientation_stat = orientation_stat;

        
}


/*This function handles touch events*/
function handleTouchEvent(event) {
    /* Prevent the default browser action to touch events*/
//     if (event.type == "touchstart") {
//         event.preventDefault();
//         return;
//     }
//     //if event.type = touchend
//     var hello = new SpeechSynthesisUtterance("hello, how are you");
//     window.speechSynthesis.speak(hello);
}

