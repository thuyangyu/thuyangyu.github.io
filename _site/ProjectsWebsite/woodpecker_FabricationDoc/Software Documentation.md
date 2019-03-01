### Software Documentation



#### Code for pecker

```c
//Attribution List
//macro define, setup(), loop() are written by Ivan.
//Adafruit driver h file, colorSet(), chase() functions are referenced from the NeoPixel framework example code.

#include <Adafruit_NeoPixel.h>

//define pin number
#define PIN      2
#define N_LEDS   5
#define Button_Input 0
const int xmitPin = 1;
const int recvPin = 3;


Adafruit_NeoPixel strip = Adafruit_NeoPixel(N_LEDS, PIN, NEO_GRB + NEO_KHZ800);

void setup() {


  strip.begin();
  strip.show();
  //define pin mode
  pinMode(recvPin, INPUT_PULLUP);
  pinMode(Button_Input, INPUT_PULLUP);
  pinMode(xmitPin, OUTPUT);
  //itPin = HIGH;
}

void loop() {
  //if communication wires are connected
  digitalWrite(xmitPin, LOW);// send a low voltage signal
  //define variable
  int recvVal = digitalRead(recvPin);
  int buttonInputVal = digitalRead(Button_Input);
  if (recvVal == LOW) {


    chase(strip.Color(255, 0, 0)); // Red
    chase(strip.Color(0, 255, 0)); // Green
    chase(strip.Color(0, 0, 255)); // Blue

  }
  else {
    //if communication wires are not connected
    //if button is not pressed
    if (buttonInputVal == LOW) {
      colorSet(strip.Color(255, 0, 0, 255)); // White
    }
    else {
      //if button is pressed
      chase(strip.Color(255, 255, 0, 255)); // Yellow
    }
  }
}

//sample neopixels code
static void chase(uint32_t c) {
  for (uint16_t i = 0; i < strip.numPixels() + 4; i++) {
    strip.setPixelColor(i  , c); // Draw new pixel
    strip.setPixelColor(i - 4, 0); // Erase pixel a few steps back
    strip.show();
    delay(25);
  }
}

void colorSet(uint32_t c) {
  for (uint16_t i = 0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, c);
  }
  // update once
  strip.show();

}


```



#### Code for Tree

```c
//Attribution List
//macro define, setup(), loop() are written by Darren.
//Adafruit driver h file, colorWipe(), rainbow(), theaterChase(), Wheel() functions are referenced from the NeoPixel framework example code.


#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
#include <avr/power.h>
#endif

#define LED_SIGNAL_PIN 8

#define COMMUNICATION_OUTPUT 7
#define COMMUNICATION_INPUT 4
#define BUTTON_GREEN_INPUT 13
#define BUTTON_YELLOW_INPUT 12
#define BUTTON_BLUE_INPUT 11

// Parameter 1 = number of pixels in strip
// Parameter 2 = Arduino pin number (most are valid)
// Parameter 3 = pixel type flags, add together as needed:
//   NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
//   NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
//   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
//   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
//   NEO_RGBW    Pixels are wired for RGBW bitstream (NeoPixel RGBW products)
Adafruit_NeoPixel strip = Adafruit_NeoPixel(18, LED_SIGNAL_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  pinMode(COMMUNICATION_OUTPUT, OUTPUT);
  pinMode(COMMUNICATION_INPUT, INPUT_PULLUP);
  pinMode(BUTTON_GREEN_INPUT, INPUT_PULLUP);
  pinMode(BUTTON_YELLOW_INPUT, INPUT_PULLUP);
  pinMode(BUTTON_BLUE_INPUT, INPUT_PULLUP);
  strip.begin();
  strip.show(); // Initialize all pixels to 'off'
}

void loop() {
  
  //give a signal low to bird when connected.
  digitalWrite(COMMUNICATION_OUTPUT, LOW);
  //receive signal from the bird, if == LOW, show rainbow color.
  int communicationInputVal = digitalRead(COMMUNICATION_INPUT);

  //get input signal from 3 button
  int buttonGreenInputVal = digitalRead(BUTTON_GREEN_INPUT);
  int buttonYellowInputVal = digitalRead(BUTTON_YELLOW_INPUT);
  int buttonBlueInputVal = digitalRead(BUTTON_BLUE_INPUT);

  if (communicationInputVal == LOW) {
    //show rainbow if connected.
    rainbow(18);
  }
  else {
    if (buttonGreenInputVal == LOW)
      theaterChase(strip.Color(0, 255, 0), 50); // Hold button Green, show green chase
    else if (buttonYellowInputVal == LOW)
      theaterChase(strip.Color(255, 255, 0), 50); // Hold button Yellow, show yellow chase
    else if (buttonBlueInputVal == LOW)
      theaterChase(strip.Color(0, 0, 255), 50); // Hold button Blue, show blue chase
    else colorWipe(strip.Color(255, 255, 255, 0), 50); // Show default White Static;
  }
}


// Fill the dots one after the other with a color
void colorWipe(uint32_t c, uint8_t wait) {
  for (uint16_t i = 0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, c);
    strip.show();
    delay(wait);
  }
}


void rainbow(uint8_t wait) {
  uint16_t i, j;

  for (j = 0; j < 256; j++) {
    for (i = 0; i < strip.numPixels(); i++) {
      strip.setPixelColor(i, Wheel((i + j) & 255));
    }
    strip.show();
    delay(wait);
  }
}


//Theatre-style crawling lights.
void theaterChase(uint32_t c, uint8_t wait) {
  for (int j = 0; j < 10; j++) { //do 10 cycles of chasing
    for (int q = 0; q < 3; q++) {
      for (uint16_t i = 0; i < strip.numPixels(); i = i + 3) {
        strip.setPixelColor(i + q, c);  //turn every third pixel on
      }
      strip.show();

      delay(wait);

      for (uint16_t i = 0; i < strip.numPixels(); i = i + 3) {
        strip.setPixelColor(i + q, 0);      //turn every third pixel off
      }
    }
  }
}

// Input a value 0 to 255 to get a color value.
// The colours are a transition r - g - b - back to r.
uint32_t Wheel(byte WheelPos) {
  WheelPos = 255 - WheelPos;
  if (WheelPos < 85) {
    return strip.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  }
  if (WheelPos < 170) {
    WheelPos -= 85;
    return strip.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
  WheelPos -= 170;
  return strip.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
}
```

