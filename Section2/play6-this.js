class NameField {
    constructor(name) {
        const field = document.createElement('li');
        field.textContent = name ;
        const nameListHook = document.querySelector('#names');
        nameListHook.appendChild(field);
    }
}

class NameGenerator {
    constructor (){
        const btn = document.querySelector('button');
        this.names = ['Max', 'Menu', 'Anna'];
        this.currentName = 0;
        console.log(this);
        //1**************************************************************
        // btn.addEventListener('click', this.addName.bind(this))

        //2**************************************************************
        // btn.addEventListener('click', function() {
        //     this.addName()
        // }.bind(this) );

        //3**************************************************************
        btn.addEventListener('click', ()=>{
            this.addName()
        })
    }

    addName(){
        console.log(this);
        const name = new NameField(this.names[this.currentName]);
        this.currentName++;
        if (this.currentName >= this.names.length) {
            this.currentName = 0;
        }

    }

}

const gen = new NameGenerator();