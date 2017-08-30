const Container = function(x) {
    this._value = x;
};

Container.of = function(x) {
    return new Container(x);
};

Container.prototype.map = function(fun) {
    return Container.of(fun(this._value));
};

console.log(
    Container.of(3).map(function(x) {
        return x + 2;
    })
);

const Maybe = function(x) {
    this._value = x;
};

Maybe.of = function(x) {
    return new Maybe(x);
};

Maybe.prototype.isNothing = function() {
    return this._value === null || this._value === undefined;
};

Maybe.prototype.map = function(f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this._value));
};
