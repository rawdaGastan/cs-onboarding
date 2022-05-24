const axios = require('axios');
import controller from './controllers/calc';

test('Add numbers 33 + 9 = 42', async() => {
    var answer = controller.calc(33, "+", 9);
    expect(answer).toBe(42);
})

test('Subtract numbers 33 - 9 = 24', async() => {
    var answer = controller.calc(33, "-", 9);
    expect(answer).toBe(24);
})

test('Divide numbers 36 / 6 = 6', async() => {
    var answer = controller.calc(36, "/", 6);
    expect(answer).toBe(6);
})

test('Multiply numbers 6 * 6 = 36', async() => {
    var answer = controller.calc(6, "*", 6);
    expect(answer).toBe(36);
})

test('Remainder numbers 6 % 4 = 2', async() => {
    var answer = controller.calc(6, "%", 4);
    expect(answer).toBe(2);
})

test('Power numbers 6 ^ 2 = 36', async() => {
    var answer = controller.calc(6, "^", 2);
    expect(answer).toBe(36);
})

/*
// corners 
test('Add numbers c + 9 = null', async() => {
    const res = await axios.post('https://localhost:3000/calc/', {
        "firstValue": 'c',
        "operator": "+",
        "secondValue": 9
    });

    var answer = res.data.answer;
    expect(answer).toBe(null);
})

// corners 
test('/ - c = null', async() => {
    const res = await axios.post('https://localhost:3000/calc/', {
        "firstValue": '/',
        "operator": "-",
        "secondValue": "c"
    });

    var answer = res.data.answer;
    expect(answer).toBe(null);
})

// local test
/*
test('Subtract numbers 33 - 9 = 24', async() => {
    const res = await axios.post('https://localhost:3000/calc/', {
        "firstValue": 33,
        "operator": "-",
        "secondValue": 9
    });

    var answer = res.data.answer;
    expect(answer).toBe(24);
})

test('Divide numbers 36 / 6 = 6', async() => {
    const res = await axios.post('https://localhost:3000/calc/', {
        "firstValue": 36,
        "operator": "/",
        "secondValue": 6
    });

    var answer = res.data.answer;
    expect(answer).toBe(6);
})

test('Multiply numbers 6 * 6 = 36', async() => {
    const res = await axios.post('https://localhost:3000/calc/', {
        "firstValue": 6,
        "operator": "*",
        "secondValue": 6
    });

    var answer = res.data.answer;
    expect(answer).toBe(36);
})

test('Remainder numbers 6 % 4 = 2', async() => {
    const res = await axios.post('https://localhost:3000/calc/', {
        "firstValue": 6,
        "operator": "%",
        "secondValue": 4
    });

    var answer = res.data.answer;
    expect(answer).toBe(2);
})

test('Power numbers 6 ^ 2 = 36', async() => {
    const res = await axios.post('https://localhost:3000/calc/', {
        "firstValue": 6,
        "operator": "^",
        "secondValue": 2
    });

    var answer = res.data.answer;
    expect(answer).toBe(36);
})

*/