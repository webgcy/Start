// 类
function greeter(person) {
    return "Hello, " + person.firstName + person.lastName;
}
var user = { firstName: 'jane', lastName: 222 };
document.body.innerHTML = greeter(user);
