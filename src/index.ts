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

const reducer = (carry:solver, value:number) => {
  if( carry.previousNumber != null && value > carry.previousNumber ) carry.count++;
  carry.previousNumber = value;
  return carry;     
};

const answer = advent01.reduce( reducer, initialValues )
console.log( answer )