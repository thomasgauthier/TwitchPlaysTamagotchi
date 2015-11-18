var serialPort = require("serialport");


var buttonHandler = function(){

  this.serialPort = null;
  var that = this;
  serialPort.list(function (err, ports) {
    ports.forEach(function(port) {
      console.log(that.serialPort);
      if(that.serialPort == null && port.manufacturer.indexOf('Arduino') >= 0){
        console.log('opened ' + port.comName);
        console.log(that.serialPort);
        that.serialPort = new serialPort.SerialPort(port.comName, {
          baudrate: 9600
        }, false); // this is the openImmediately flag [default is true]
        that.serialPort.open(function (error) {
          if ( error ) {
            console.log('failed to open: '+error);
            process.exit(1);
          } else {
            console.log('port open');
            that.tilt(120)
          }
        });
      }
    }
  );
});
}

buttonHandler.prototype.sendKey = function(key){
var that = this;
  if (key == 'a'){
    this.pan(40);
    setTimeout(function(){
      that.press();
    },250);
  }
  if(key == 'b'){
    this.pan(65);
    setTimeout(function(){
    that.press();
  },250);
  }
  if (key == 'c'){
    this.pan(90);
    setTimeout(function(){
    that.press();
  },250);
  }
}

buttonHandler.prototype.press = function(){
  this.tilt(80);
  var that = this;
  setTimeout(function(){
    that.tilt(120);
  },700);
}

buttonHandler.prototype.pan = function(n){
  this.serialPort.write([1]);
  this.serialPort.write([n]);
}

buttonHandler.prototype.tilt = function(n){
  this.serialPort.write([0]);
  this.serialPort.write([n]);
}

module.exports = buttonHandler;
