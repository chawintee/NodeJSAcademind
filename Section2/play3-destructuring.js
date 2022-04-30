const person = {
    name: 'Max',
    age: 29,
    greet() {
        console.log(`Hi, I am ${this.name}`);
    }
}

const prinName = (personData) => {
    console.log(personData.name);
}

prinName(person)
const prinName1 = ({name}) => {
    console.log(name);
}

prinName1(person)


const { name, age } = person ;
console.log(name,age);


const hobbies = ['Sports', 'Cooking'];
const [hobby1,hobby2] = hobbies;
console.log(hobby1,hobby2);
