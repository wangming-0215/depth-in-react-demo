const name = 'window';

const person1 = {
    name: 'person1',
    show1: function show1() {
        console.log(this.name);
    },
    show2: () => console.log(this.name),
    show3: function show3() {
        return function showName() {
            console.log(this.name);
        }
    },
    show4: function show4() {
        return () => console.log(this.name);
    }
};

const person2 = { name: 'person2' };

person1.show1();
person2.show1.call(person2);

person1.show2();
person2.show2.call(person2);

person1.show3()();
person1.show3().call(person2);
person1.show3.call(person2)();

person1.show4()();
person1.show4().call(person2);
person1.show4.call(person2)();