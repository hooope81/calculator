'use strict';

let buttons = [...document.querySelectorAll('.action')];
let input = document.querySelector('input');
let equality = document.querySelector('.equality');
let numb1 = 0;
let numb2 = 0;
let action = '';

function getAction(numb1, numb2, action) {
    switch (action) {
        case "sum": return numb1 + numb2;
        case "difference": return numb1 - numb2;
        case "multiplication": return numb1 * numb2;
        case "division": return numb1 / numb2;
        default: return  "error"
    }
}

function getResult() {
    numb2 = +input.value;
    input.value = getAction(numb1, numb2, action);
}

buttons.forEach(item => {
    item.addEventListener('click', () => {
        numb1 = +input.value;
        action = item['name'];
        input.value = '';
        console.log(numb1);
        console.log(action);
    })
})

equality.addEventListener('click', getResult);