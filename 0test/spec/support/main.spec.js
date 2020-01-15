const main = require('../main.js');
const addition = main.addition;
const subtraction = main.subtraction;
const multiplication = main.multiplication;
const division = main.division;

describe('Функция addition()', () => {
    //числа
    it('должна возвращать 5 при аргументах (3, 2)', () => {
        expect(addition(3, 2)).toBe(5);
    })
    //строки
    it(`должна возвращать NaN при аргументах (1, 'y')`, () => {
        expect(addition(1, 'y')).toBeNaN()
    })
    it(`должна возвращать NaN при аргументах ('x', 2)`, () => {
        expect(addition('x', 2)).toBeNaN()
    })
    //undefined
    it(`должна возвращать NaN при аргументах (1, undefined)`, () => {
        expect(addition(1, undefined)).toBeNaN()
    })
    it(`должна возвращать NaN при аргументах (undefined, 2)`, () => {
        expect(addition(undefined, 2)).toBeNaN()
    })
    //null
    it(`должна возвращать NaN при аргументах (1, null)`, () => {
        expect(addition(1, null)).toBeNaN()
    })
    it(`должна возвращать NaN при аргументах (null, 2)`, () => {
        expect(addition(null, 2)).toBeNaN()
    })
});

describe('Функция subtraction()', () => {
    //числа
    it('должна возвращать 5 при аргументах (3, 2)', () => {
        expect(subtraction(3, 2)).toBe(1);
    })
    //строки
    it(`должна возвращать NaN при аргументах (1, 'y')`, () => {
        expect(subtraction(1, 'y')).toBeNaN()
    })
    it(`должна возвращать NaN при аргументах ('x', 2)`, () => {
        expect(subtraction('x', 2)).toBeNaN()
    })
    //undefined
    it(`должна возвращать NaN при аргументах (1, undefined)`, () => {
        expect(subtraction(1, undefined)).toBeNaN()
    })
    it(`должна возвращать NaN при аргументах (undefined, 2)`, () => {
        expect(subtraction(undefined, 2)).toBeNaN()
    })
    //null
    it(`должна возвращать NaN при аргументах (1, null)`, () => {
        expect(subtraction(1, null)).toBeNaN()
    })
    it(`должна возвращать NaN при аргументах (null, 2)`, () => {
        expect(subtraction(null, 2)).toBeNaN()
    })
});

describe('Функция multiplication()', () => {
    //числа
    it('должна возвращать 6 при аргументах (3, 2)', () => {
        expect(multiplication(3, 2)).toBe(6);
    })
    //строки
    it(`должна возвращать NaN при аргументах (1, 'y')`, () => {
        expect(multiplication(1, 'y')).toBeNaN()
    })
    it(`должна возвращать NaN при аргументах ('x', 2)`, () => {
        expect(multiplication('x', 2)).toBeNaN()
    })
    //undefined
    it(`должна возвращать NaN при аргументах (1, undefined)`, () => {
        expect(multiplication(1, undefined)).toBeNaN()
    })
    it(`должна возвращать NaN при аргументах (undefined, 2)`, () => {
        expect(multiplication(undefined, 2)).toBeNaN()
    })
    //null
    it(`должна возвращать NaN при аргументах (1, null)`, () => {
        expect(multiplication(1, null)).toBeNaN()
    })
    it(`должна возвращать NaN при аргументах (null, 2)`, () => {
        expect(multiplication(null, 2)).toBeNaN()
    })
});

describe('Функция division()', () => {
    //числа
    it('должна возвращать 2 при аргументах (3, 2)', () => {
        expect(division(6, 3)).toBe(2);
    })
    it('должна возвращать NaN при аргументах (3, 0)', () => {
        expect(division(3, 0)).toBeNaN()
    })
    //строки
    it(`должна возвращать NaN при аргументах (1, 'y')`, () => {
        expect(division(1, 'y')).toBeNaN()
    })
    it(`должна возвращать NaN при аргументах ('x', 2)`, () => {
        expect(division('x', 2)).toBeNaN()
    })
    //undefined
    it(`должна возвращать NaN при аргументах (1, undefined)`, () => {
        expect(division(1, undefined)).toBeNaN()
    })
    it(`должна возвращать NaN при аргументах (undefined, 2)`, () => {
        expect(division(undefined, 2)).toBeNaN()
    })
    //null
    it(`должна возвращать NaN при аргументах (1, null)`, () => {
        expect(division(1, null)).toBeNaN()
    })
    it(`должна возвращать NaN при аргументах (null, 2)`, () => {
        expect(division(null, 2)).toBeNaN()
    })
});
