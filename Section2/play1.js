const person = {
    name: 'Max',
    age: 29,

    // not work
    greet0: () => {
        console.log(`Hi, I am ${this.name}`);
    },

    // work1
    greet1: function(){
        console.log(`Hi, I am ${this.name}`);
    },

    //work2
    greet2(){
        console.log(`Hi, I am ${this.name}`);
    }


}


// person.greet0();
// person.greet1();
person.greet2();