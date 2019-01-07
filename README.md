# Chat server V.2

#### Purpose: 
Chat app with shared drawing board and other upcoming features. Also has voice
controls features that enable you to type with voice, change panels and display mode
(works on google chrome). Also has voice output capabilities. Im looking into 
tweaking this and making a complete voice controlled UI.

Updated UI design app is still under construction

#### Notes:
Say "dark" for night mode and "light" for light mode
Say name of panels to change panels
Click grey button to switch on microphone listening
You would need to download and install the following tools
Say "hello" and app will respond

- [nodejs(version 5 - 9)](https://nodejs.org/en/)
- [jQuery](https://jquery.com/)
- [npm](https://www.npmjs.com/)
- [p5js](https://p5js.org/)
- [annyangjs](https://www.talater.com/annyang/) (extends [webkitspeechrecognition](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API))
- [responsivevoicejs](https://responsivevoice.org/)

This app was designed to be used on a touch screen tablet (thats why the buttons are so big).

After getting all required files, to run type enter chatSever directory and use the command:

`node index.js` to run with HTTP

`node index-https.js` to run with HTTPS with a self signed key

You can chat with anyone on the same network (or WIFI) as you, just use command `ifconfig` to get the ip address that your
router gave to the computer that is running the server(localhost) then go to `<IPAddress>:<PortNumber>` example: `192.168.0.11:5000`



### New Layout 

![screenshot from 2018-09-11 20-38-20](https://user-images.githubusercontent.com/15314851/45395276-675b6480-b603-11e8-9fae-440a5ddf1b1f.png)

![screenshot from 2018-09-11 20-38-30](https://user-images.githubusercontent.com/15314851/45395285-7215f980-b603-11e8-9e35-90ec51cbcd61.png)

![screenshot from 2018-09-11 20-42-49](https://user-images.githubusercontent.com/15314851/45395293-7cd08e80-b603-11e8-8fd5-b6731311a801.png)

## Currently the app doesn't run two p5js scripts simultanuously you would have to comment out <script src="/paint.js"></script> and uncomment the brickbreaker scripts in index.html. However there's a way to make them work simultanuously still working on the app so ill add it later
![brickbreaker](https://user-images.githubusercontent.com/15314851/48819510-3ba0dd00-ed1e-11e8-8e36-af2df0fa024a.png)

### Win animation
![win](https://user-images.githubusercontent.com/15314851/48862010-04b8de80-ed93-11e8-8f5c-d2c529dba4ea.png)

