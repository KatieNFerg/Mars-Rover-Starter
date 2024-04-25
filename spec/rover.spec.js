const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts.", function(){
expect( function() { new Rover();}).toThrow(new Error('Rover position required.'));
  });

  test("response returned by recieveMessage contains the name of the message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message2 = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message2);
    expect(response.message).toEqual("Test message with two commands");
  });
  test("response returned by recieveMessage includes two results if two commands are sent in the message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(commands.length);
  });
  test("responds correctly to the status check command", function(){
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Rover check status', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    let roverStatus2 = { mode: (rover.mode), generatorWatts: (rover.generatorWatts), position: (rover.position)};
    expect(response.results[0].roverStatus).toEqual(roverStatus2);
  });
  test("responds correctly to the mode change command", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Changing mode to LOW_POWER', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(rover.mode).toEqual('LOW_POWER');
  });
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 98382)];
    let message = new Message('Can not move while at LOW_POWER', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[1]).toEqual({completed: false});
  });
  test("responds with the position for the move command", function(){
    let commands = [new Command('MOVE', 98382)];
    let message = new Message("Moving to the position 1200", commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(rover.position).toEqual(98382);
  });

});
