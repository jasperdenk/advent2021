import { readFileSync } from 'fs';

const advent01 = JSON.parse(readFileSync('files/1.json', 'utf8')); 

interface solver{
  previousNumber : null | number;
  count : number;
}

let initialValues:solver = {
  previousNumber : null,
  count : 0
}

interface solverB{
  previousNumbers : number[];
  count : number;
}

let initialValuesB:solverB = {
  previousNumbers : [],
  count : 0
}

const reducer = (carry:solver, value:number) => {
  if( carry.previousNumber != null && value > carry.previousNumber ) carry.count++;
  carry.previousNumber = value;
  return carry;     
};

const sum = (carry:number, value:number) => {
  return carry + value;     
};

const reducerB = (carry:solverB, value:number) => {

  const total = carry.previousNumbers.reduce( sum, 0 );
  
  
  carry.previousNumbers.push( value );

  if( carry.previousNumbers.length === 4 ){
    carry.previousNumbers.shift();
    const newTotal = carry.previousNumbers.reduce( sum, 0 );
    if( newTotal > total ) carry.count++;
  }
  return carry;     
};

const answer = advent01.reduce( reducer, initialValues )

const answerB = advent01.reduce( reducerB, initialValuesB );

console.log( answer )
console.log( answerB )