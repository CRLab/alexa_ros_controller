'use strict';

var ROSLIB 		  = require('roslib');
var valid_phrases;

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
    name : '/CurrentOptions',
    messageType : 'api_ros_controller/CurrentOptions'
});

//callback function will update a var array holding valid phrases
phrases_listener.subscribe(function(message) {
    console.log('Current valid options from ' + phrases_listener.name + ': ' + message.data);
    valid_phrases = message.data; //.split(',')
    // console.log(valid_phrases)
    // listener.unsubscribe();
});



// Creating publisher
var command_publisher = new ROSLIB.Topic({
    ros : ros,
    name : '/ExecuteOption',
    messageType : 'std_msgs/String'
});

var currently_selected_publisher = new ROSLIB.Topic({
    ros : ros,
    name : '/CurrentlySelectedOption',
    messageType : 'std_msgs/String'
});

//
// var test = new ROSLIB.Message({
//     data : 'test_publish'
// });

// command_publisher.publish(test);

module.exports = {
    returnValidPhrases: function() {
        return valid_phrases;
    },
    publishCommand: function(command){
        var command_to_publish = new ROSLIB.Message({
            data : command
        });
        command_publisher.publish(command_to_publish);
    }
};
// //implement function that will return array of current valid phrases
// function returnValidPhrases(){
//     return valid_phrases;
// }
//
// // publishing command (called from lambda.js)
// function publishCommand(command){
//     var command_to_publish = new ROSLIB.Message({
//         data : command
//     });
//     command_publisher.publish(command_to_publish);
// }
//

