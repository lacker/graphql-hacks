// This is TypeScript
var Foo;
(function (Foo) {
    Foo[Foo["BAR"] = 0] = "BAR";
    Foo[Foo["BAZ"] = 1] = "BAZ";
    Foo[Foo["QUX"] = 2] = "QUX";
})(Foo || (Foo = {}));
;
console.log('Hello TypeScript world!');
console.log('BAR is', BAR);
console.log('BAZ is', BAZ);
