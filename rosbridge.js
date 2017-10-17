'use strict';

var ROSLIB 		  = require('roslib');
// const eventemitter    = require('eventemitter2');


var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
});

ros.on('connection', function() {
    console.log('Connected to websocket server.');
});
 
ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});

// ros.on('close', function() {
//     console.log('Connection to websocket server closed.');
// });


// Creating subscriber
var phrases_listener = new ROSLIB.Topic({
    ros : ros,
    name : '/AlexaValidPhrases',
    messageType : 'std_msgs/String'
});

//callback function will update a var array holding valid phrases
phrases_listener.subscribe(function(message) {
    console.log('Updating valid phrases from ' + listener.name + ': ' + message.data);
    var valid_phrases = message.data.split(',');
    // listener.unsubscribe();
});

//implement function that will return array of current valid phrases
function returnValidPhrases(){
    return valid_phrases;
}

// Creating publisher
var command_publisher = new ROSLIB.Topic({
    ros : ros,
    name : '/AlexaDetectedPhrases',
    messageType : 'std_msgs/String'
});


// publishing command (called from lambda.js)
function publishCommand(command){
    var command_to_publish = new ROSLIB.Message({
        data : command
    });
    command_publisher.publish(command_to_publish);
}


