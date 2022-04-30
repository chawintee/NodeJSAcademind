// Primitive
let name = 'Max';
console.log(name);

let secondName = name ;
console.log(secondName);

name = 'Chris';
console.log(secondName);



// Reference
let person = {
    age: 28,
    name: 'Max',
    hobbies: ['Sports', 'Cooking'],
};

let thirdPerson = {
    age: 28,
    name: 'Max',
    hobbies: ['Sports', 'Cooking'],
};

console.log(person);

// let secondPerson = person;
let secondPerson = Object.assign({}, person);

console.log(secondPerson);

// let myHobbies = person.hobbies;
let myHobbies = person.hobbies.slice();

person.name = 'Chris';
person.hobbies.push('Reading');
console.log(secondPerson);

console.log(thirdPerson);

console.log(myHobbies);
