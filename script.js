'use strict';

let buttons = [...document.querySelectorAll('.action')];
let input = document.querySelector('input');
let equality = document.querySelector('.equality');
let numb = 0;
let action = '';
let result = 0;

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
    numb = +input.value;
    result = getAction(result, numb, action);
    input.value = result;
}

buttons.forEach(item => {
    item.addEventListener('click', () => {
        if(!result) {
            result = +input.value;
            action = item['name'];
            input.value = '';
        } else {
            numb = +input.value;
            result = getAction(result, numb, action);
            action = item['name'];
            input.value = '';
        }

    })
})

equality.addEventListener('click',() => {
    getResult();
    result = 0;
});