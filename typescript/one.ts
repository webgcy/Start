// 接口
interface Person {
    firstName: string,
    lastName: string
}

// 类


function greeter(person: Person) {
    return "Hello, " + person.firstName + person.lastName;
}

let user = { firstName: 'jane', lastName: 'moni' };

document.body.innerHTML = greeter(user);