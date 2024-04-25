class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = 'LOW_POWER';
      this.generatorWatts = 110;
      if (!position) {
         throw Error("Rover position required.");
      }
   }

      receiveMessage(message2) {
         let message = message2.name;
         let results = [];
         for (let i = 0; i < message2.commands.length; i++) {
            if (message2.commands[i].commandType === 'MOVE') {
               if (this.mode === 'LOW_POWER') {
                  results.push({completed: false});
               } else {
                  results.push({completed: true});
                  this.position = message2.commands[i].value;
               }
            
            } else if (message2.commands[i].commandType === 'MODE_CHANGE') {
               results.push({completed: true});
               this.position = message2.commands[i].value;
            } else if (message2.commands[i].commandType === 'STATUS_CHECK') {
               results.push({completed: true, roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position }});

            } else {
               throw Error("Command Type undefined.");
            }
         
         };
         return {message, results};
      }
   }
module.exports = Rover;