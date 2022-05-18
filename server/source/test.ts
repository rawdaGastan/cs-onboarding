const axios = require('axios');


test('Add numbers 33 + 9 = 42', async() => {
    const res = await axios.post('http://192.168.1.14:3000/calc/', {
        "firstValue": 33,
        "operator": "+",
        "secondValue": 9
    });

    var answer = res.data.answer;
    expect(answer).toBe(42);
})

test('Subtract numbers 33 - 9 = 24', async() => {
    const res = await axios.post('http://0.0.0.0:3000/calc/', {
        "firstValue": 33,
        "operator": "-",
        "secondValue": 9
    });

    var answer = res.data.answer;
    expect(answer).toBe(24);
})

test('Divide numbers 36 / 6 = 6', async() => {
    const res = await axios.post('http://0.0.0.0:3000/calc/', {
        "firstValue": 36,
        "operator": "/",
        "secondValue": 6
    });

    var answer = res.data.answer;
    expect(answer).toBe(6);
})

test('Multiply numbers 6 * 6 = 36', async() => {
    const res = await axios.post('http://0.0.0.0:3000/calc/', {
        "firstValue": 6,
        "operator": "*",
        "secondValue": 6
    });

    var answer = res.data.answer;
    expect(answer).toBe(36);
})

test('Remainder numbers 6 % 4 = 2', async() => {
    const res = await axios.post('http://0.0.0.0:3000/calc/', {
        "firstValue": 6,
        "operator": "%",
        "secondValue": 4
    });

    var answer = res.data.answer;
    expect(answer).toBe(2);
})

test('Power numbers 6 ^ 2 = 36', async() => {
    const res = await axios.post('http://0.0.0.0:3000/calc/', {
        "firstValue": 6,
        "operator": "^",
        "secondValue": 2
    });

    var answer = res.data.answer;
    expect(answer).toBe(36);
})
