//*Написать приложение-калькулятор, используя подход BDD. Приложение должно состоять из четырёх методов для сложения, вычитания, умножения и деления. Каждый метод принимает на вход два аргумента и выполняет действие. При написании тестов учесть случаи, когда на вход подаются не числа, а строки, null или undefined.


function parse(z) {
    if (typeof (z) === 'string') {
        if (isNaN(Number.parseFloat(z))) {
            return undefined;
        } else {
            return Number.parseFloat(z);
        }
    }
    return z;
}

function isNotNumbers(x, y){
    if (x === undefined || x === null || y === undefined || y === null) {
        return true;
    }
    return false;
}

function addition(x, y) {
    x = parse(x);
    y = parse(y);
    if (isNotNumbers(x, y)) {
        return NaN;
    }
    return x + y;
};

function subtraction(x, y) {
    x = parse(x);
    y = parse(y);
    if (isNotNumbers(x, y)) {
        return NaN;
    }
    return x - y;
};

function multiplication(x, y) {
    x = parse(x);
    y = parse(y);
    if (isNotNumbers(x, y)) {
        return NaN;
    }
    return x * y;
};

function division(x, y) {
    x = parse(x);
    y = parse(y);
    if (isNotNumbers(x, y) || y == 0) {
        return NaN;
    }
    return x / y;
};

module.exports = {
    addition,
    subtraction,
    multiplication,
    division
}
