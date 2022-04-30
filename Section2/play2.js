const person = {
    name: 'Max',
    age: 29,
    greet(){
        console.log(`Hi, I am ${this.name}`);
    }
}

const copiedPerson = {...person};
console.log(copiedPerson);


const hobbies = ['Sport', 'Cooking']

// for (let hobby of hobbies){
//     console.log(hobby);
// }
// console.log(hobbies.map(hobby => `Hobby: ${hobby}`));
// console.log(hobbies);
// hobbies.push('Programming');
// console.log(hobbies);
const copiedArray1 = hobbies.slice();
const copiedArray2 = [...hobbies];
console.log(copiedArray1);
console.log(copiedArray2);

const toArray = (arg1,arg2,arg3) => {
    return [arg1,arg2,arg3];
}

console.log(toArray(1,2,3));

const toArray1 = (...args) => args

console.log(toArray1(1,2,3,4,5));
