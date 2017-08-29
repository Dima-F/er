var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

app.on('ready',function(){
  var win = new BrowserWindow({
    width:1220,
    height:800,
    icon:__dirname+'/img/dollar.ico'
  });
  win.loadURL('file://'+__dirname+'/index.html');
});
