//This code uses prints out information from arduinos
// serial port using serialport.js 

var serialport = require("serialport");// version 4
var shell = require('shelljs');
var portName = "/dev/ttyACM0"; //specify your port name

var myPort = new serialport(portName, {
    baudRate: 9600,
    parser: new serialport.parsers.readline('\r\n')
});

myPort.on('open', function onOpen(){
    console.log('Open connections!');
});

myPort.on('data', function onData(data){
    var item = data.split(/\s+/g);
    console.log(item[1]);
     if(item[1] === "Airspin"){
        shell.exec("node index.js");
    }
});

myPort.on('error', function(err) {
  console.log('Error: ', err.message);
})



