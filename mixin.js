const mixin = function (obj, mixins) {
    const newObj = obj;
    newObj.prototype = Object.create(obj.prototype);
    for (let prop of Object.keys(mixins)) {
        newObj.prototype[prop] = mixins[prop];
    }
    return newObj;
};

const BigMixin = {
    fly: () => console.log('I can fly')
}

const Big = function () {
    console.log('new big');
}

const FlyBig = mixin(Big, BigMixin);

const flyBig = new FlyBig();
flyBig.fly();