#include <Servo.h>

const int ultraSon1 = 7;
const int ultraSon2_out = 3; // TRIG
const int ultraSon2_in = 4; // ECHO
const int servoPin = 9;

Servo servo;

void setup() {
  Serial.begin(9600);
  servo.attach(servoPin);
}

void loop() {
  Serial.println("S");
  record180deg();
  Serial.println("E");
  //delay(1000);
}

//print the angle and distance record on 180 deg
void record180deg()
{ 
  servo.write(0);
  delay(1000);
  
  for(int angle = 0; angle <= 180; angle ++)
  {
    servo.write(angle);
    delay(50);//give time to the motor to go where it need to go
    
    int dist1 = getDistance(ultraSon1);
    int dist2 = getDistance_2(ultraSon2_out, ultraSon2_in);

     Serial.println(String(angle) + ", " + String(dist1) + ", " + String(180 + angle) + ", " + String(dist2));
  }
}

//return a distance in cm
int getDistance(int pingPin)
{
  pinMode(pingPin, OUTPUT);
  
  digitalWrite(pingPin, LOW);
  delayMicroseconds(3);
  digitalWrite(pingPin, HIGH);
  delayMicroseconds(5);
  digitalWrite(pingPin, LOW);
  
  pinMode(pingPin, INPUT);
  int duration = pulseIn(pingPin, HIGH);
  int distance = duration / 29 / 2;

  return distance;  
}

//return a distance in cm for 4 pins Ultrasonic sensor
int getDistance_2(int pingPin_out, int pingPin_in)
{
  pinMode(pingPin_out, OUTPUT);
  
  digitalWrite(pingPin_out, LOW);
  delayMicroseconds(3);
  digitalWrite(pingPin_out, HIGH);
  delayMicroseconds(5);
  digitalWrite(pingPin_out, LOW);
  
  pinMode(pingPin_in, INPUT);
  int duration = pulseIn(pingPin_in, HIGH);
  int distance = duration / 29 / 2;

  return distance;  
}