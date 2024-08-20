//Coded on Ardino by selecting board ESP8266 - nodemcu 
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
const int  LED  = D1;


const char* ssid = "cyrusbyte"; 
const char* password = "selvalaxm!"; 

const char* host = "script.google.com";//https://script.google.com/
const int httpsPort = 443;
const int analog = A0;


WiFiClientSecure client; 
String GAS_ID = "AKfycbwEBPSsztEVTv7N4LhYVUUv0G1ikeY-GwF-pfvZV3kkd5zpEKSjktVL_qiL7BKnZAM";
void setup() 
{
   
  Serial.begin(115200);
  pinMode(analog, INPUT);
  pinMode(LED, OUTPUT);  
  Serial.begin(115200);
  delay(500);
  WiFi.begin(ssid, password); 
  Serial.println("");    
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) 
  {
    Serial.print("connected");
    
   
  }
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  client.setInsecure();
}

void loop() 
{
   int  value = analogRead(analog);
  Serial.print("Gas Value: ");
  Serial.println(value);
  delay(10);
  if (value > 450) { // Adjust threshold value according to your requirement
    digitalWrite(LED, HIGH); // Turn on buzzer if gas level is above threshold
  } else {
    digitalWrite(LED, LOW); // Turn off buzzer if gas level is below threshold
  }

sen();
}
void sen()
{
// HTTPClient https;
  if (!client.connect(host, httpsPort))
  {
    Serial.println("connection failed");
    return;
  }
  int  gasValue = analogRead(analog);
  String location = "office";
  String url = "/macros/s/" + GAS_ID + "/exec?value1="+gasValue +"&value2="+location;;
  Serial.print("requesting URL: ");
  Serial.println(url);
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
         "Host: " + host + "\r\n" +
         "User-Agent: BuildFailureDetectorESP8266\r\n" +
         "Connection: close\r\n\r\n");

  Serial.println("request sent");
  delay(10);
  while (client.connected()) {
    String line = client.readStringUntil('\n');
    if (line == "\r") {
      Serial.println("headers received");
      break;
    }
  }
  String line = client.readStringUntil('\n');
  if (line.startsWith("{\"state\":\"success\"")) 
  {
    
  } 

}