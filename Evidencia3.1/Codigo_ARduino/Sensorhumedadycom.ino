const int sensorPin = A0;
int incomingByte = 0;
boolean newData = false;
   
void setup() 
{
  pinMode(13, OUTPUT);
  Serial.begin(9600);

}
 
void loop() 
{
      int humedad = analogRead(sensorPin);
      Serial.println(humedad);
      //incomingByte=Serial.read();
      //Serial.println(incomingByte);
      delay(500); 
  if ( Serial.available() > 0 && newData == false && Serial.read() !=0)
   {
      //int humedad = analogRead(sensorPin);
      //Serial.println(humedad);
      digitalWrite(13, LOW);
      newData = true;
      
    }
    else if ( Serial.available() != 0 && newData == true && Serial.read() !=0)
    {
      digitalWrite(13, HIGH);
      //int humedad = analogRead(sensorPin);
      //Serial.println(humedad);
      newData = false;
      }
      
}
      
