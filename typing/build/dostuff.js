var Foo;
(function (Foo) {
    Foo[Foo["Bar"] = 0] = "Bar";
    Foo[Foo["Baz"] = 1] = "Baz";
    Foo[Foo["Qux"] = 2] = "Qux";
})(Foo || (Foo = {}));
console.log('Hello TypeScript world!');
console.log('BAR is', Foo.Bar);
console.log('BAZ is', Foo.Baz);
