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

        if(item['name'] === "changeSign") {
            if (!result) {
                result = -input.value;
            }
            numb = -input.value;
            input.value = numb;

        } else if(item['name'] === "clean") {
            result = 0;
            numb = 0;
            input.value = '0';

        } else if(item['name'] === "percent") {
            if (!result) {
               result = +input.value * 100 / result;
            }
            numb = +input.value * 100 / result;
            input.value = numb;

        } else {
            if(!result) {
                result = +input.value;
                action = item['name'];
                input.value = result;

            } else {
                numb = +input.value;
                result = getAction(result, numb, action);
                action = item['name'];
                input.value = result;
            }
        }




        console.log(result);
        // console.log(numb);
    })
})

equality.addEventListener('click',() => {
    getResult();
    result = 0;
    console.log(result);
    // console.log(numb);
});