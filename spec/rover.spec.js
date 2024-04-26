const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts.", function(){
expect( function() { new Rover();}).toThrow(new Error('Rover position required.'));
let rover = new Rover(1000);
expect(rover.position).toEqual(1000);
expect(rover.mode).toEqual('NORMAL'||'LOW_POWER');
expect(rover.generatorWatts).toEqual(110);
  });

  test("response returned by recieveMessage contains the name of the message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message2 = new Message('Test message with two commands', commands);
    let rover = new Rover(1000);
    let response = rover.receiveMessage(message2).message;
    expect(response).toEqual(message2.name);
  });
  test("response returned by recieveMessage includes two results if two commands are sent in the message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message2 = new Message('Test message with two commands', commands);
    let rover = new Rover(1000);
    let response = rover.receiveMessage(message2);
    expect(response.results.length).toEqual(commands.length);
  });
  test("responds correctly to the status check command", function(){
    let commands = [new Command('STATUS_CHECK')];
    let message2 = new Message('Rover check status', commands);
    let rover = new Rover(1000);
    let response = rover.receiveMessage(message2);
    let roverStatus2 = { mode: (rover.mode), generatorWatts: (rover.generatorWatts), position: (rover.position)};
    expect(response.results[0].roverStatus).toEqual(roverStatus2);
  });
  test("responds correctly to the mode change command", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message2 = new Message('Changing mode to LOW_POWER', commands);
    let rover = new Rover(1000);
    let response = rover.receiveMessage(message2).results[0];
    expect(rover.mode).toEqual('LOW_POWER');
    expect(response).toEqual({completed: true});
  });
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 3), new Command('STATUS_CHECK')];
    let message2 = new Message('Can not move while at LOW_POWER', commands);
    let rover = new Rover(1000);
    let response = rover.receiveMessage(message2)
    console.log(response);
    expect(response.results[1]).toEqual({completed: false});
    expect(rover.position).toEqual(1000);
  });
  test("responds with the position for the move command", function(){
    let commands = [new Command('MOVE', 3), new Command ('STATUS_CHECK')];
    let message2 = new Message("Moving to the position 3", commands);
    let rover = new Rover(1000);
    let response = rover.receiveMessage(message2).results[1].roverStatus.position;
    expect(response).toEqual(3);
  });

});
