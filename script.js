'use strict';

let buttons = [...document.querySelectorAll('.action')];
let input = document.querySelector('input');
let equality = document.querySelector('.equality');
let digits = [...document.querySelectorAll('.numb')];
let numb = 0;
let action = '';
let result = 0;
let changeSign = false;

function getAction(numb1, numb2, action) {
    switch (action) {
        case "sum": return numb1 + numb2;
        case "difference": return numb1 - numb2;
        case "multiplication": return numb1 * numb2;
        case "division": return numb1 / numb2;

    }
}

function getResult() {
    numb = +input.value;
    result = getAction(result, numb, action);
    input.value = result;
    console.log(result);
}

buttons.forEach(item => {
    item.addEventListener('click', () => {



        if(item['name'] === "changeSign") {
            if (!result) {
                result = -input.value;
                input.value = result;
                changeSign = true;
                console.log(numb, result,action);
            } else {
                numb = -input.value;
                input.value = numb;
            }


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
                if(changeSign){
                    action = item['name'];
                } else {
                    numb = +input.value;
                    result = getAction(result, numb, action);
                    action = item['name'];
                    input.value = result;
                }


            }
            input.value = '';
        }
        console.log(result);

    })
})

equality.addEventListener('click',() => {
    getResult();
    result = 0;
    console.log(result);
    // console.log(numb);
});

digits.forEach(item => {
    item.addEventListener('click', () => {
       if(input.value === '0') {
            input.value = item.textContent;
        } else {
            input.value += item.textContent;
        }
    })
})