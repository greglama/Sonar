# Sonar

## How do I setup everything ?

Just place go on the nodeJs server folder and type :

`$ npm install`

Then you have to put the Arduino code inside an actual Arduino and keep the serial connection.
In order to record data you have to plug a servo motor on pin 9 and the two ultrasonic sensors 
on pin 7 for the first one (it has only 3 pins) and on pin 3 and 4 for the second one (with 4 pins)
pin 3 is the trig and pin 4 the echo.
When everything is ready just type in the terminal :

`$ npm start`

This will run the server and it will listen to the serial connection of the arduino.
The server will also listen to port 3000. You can then connect to it and look at the sonar's graphic.
