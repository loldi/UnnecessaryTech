var j5 = require("johnny-five");
var board = new j5.Board();
var request = require('request');
var cheerio = require('cheerio')
var url = "http://www.nfl.com/liveupdate/scorestrip/ss.json"

var gameNum = -1;


 
board.on("ready", function(){
  
  var btn = new j5.Button(6);
  var btn2 = new j5.Button(4);
  var lcd = new j5.LCD({  pins: [7,8,9,10, 11,12],
  backlight: 13,
  rows: 2,
  cols: 16 });

  btn.on("hit", function(){

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        // console.log(body) // Print the json response
        lcd.clear();

        board.wait(100, function(){

        if (gameNum < 13){
        gameNum = gameNum + 1;
    } else {
    	gameNum = 0;

    }
    	var a = body.gms[gameNum].hs;
    	var b = body.gms[gameNum].vs;

        lcd.print(body.gms[gameNum].hnn + ": " + a);

        lcd.cursor(1,0);
        lcd.print(body.gms[gameNum].vnn + ": " + b);

        lcd.cursor(0,15);
        lcd.print(body.gms[gameNum].q);

         })
 }   
	});
  });
  
btn2.on("hit", function(){

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        // console.log(body) // Print the json response
        lcd.clear();

        board.wait(100, function(){


        if (gameNum > 0){
        gameNum = gameNum - 1;
    } else {
    	gameNum = 13;

    }
    	var a = body.gms[gameNum].hs;
    	var b = body.gms[gameNum].vs;

        lcd.print(body.gms[gameNum].hnn + ": " + a);

        lcd.cursor(1,0);
        lcd.print(body.gms[gameNum].vnn + ": " + b);

        lcd.cursor(0,15);
        lcd.print(body.gms[gameNum].q);

         })
 }   
	});
  });  
 });