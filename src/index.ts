const fs = require('fs');

interface Position{
  horizontal:number;
  depth:number;
}

interface Submarine{
  aim:number;
  position:Position;
  createNavigator( this:Submarine ): (units:number, direction:string) => void;
  createGunsman( this:Submarine ): (units:number, direction:string) => void;
}


const createSubmarine = ():Submarine => {
  return{  
    aim:0,
    position:{
      horizontal: 0,
      depth: 0,
    },
    createNavigator: function (this: Submarine ) {
      return ( units:number, direction:string ) => {
        switch( direction ){
          case 'forward': this.position.horizontal += units; break;
          case 'down': this.position.depth += units; break;
          case 'up': this.position.depth -= units; break;
        }
        return;
      };
    },
    createGunsman: function (this: Submarine ) {
      return ( units:number, direction:string ) => {
        switch( direction ){
          case 'forward':
            this.position.horizontal += units; 
            this.position.depth += ( this.aim * units );
          break;
          case 'down': this.aim += units; break;
          case 'up': this.aim-= units; break;
        }
        return;
      };
    },
  }
}

let submarineA = createSubmarine(); 
let submarineB = createSubmarine(); 

const navigate  = submarineA.createNavigator();
const aim       = submarineB.createGunsman();

// read commands
fs.readFile( './files/2.txt', 'utf8', ( err:any, data:string ) => {
  data.split(/\r?\n/).forEach(
    (command:string) => {
      const directionAndUnits = command.split(' ');
      const direction         = directionAndUnits[0];
      const units             = parseInt( directionAndUnits[1]);
      navigate( units, direction );
      aim( units, direction );
    }
  )

  const answerA = submarineA.position.horizontal * submarineA.position.depth;
  const answerB = submarineB.position.horizontal * submarineB.position.depth;
  console.log( answerA );
  console.log( answerB );
})

