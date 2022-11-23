'use strict';

let buttons = [...document.querySelectorAll('.action')];
let input = document.querySelector('input');
let equality = document.querySelector('.equality');
let digits = [...document.querySelectorAll('.numb')];
let numb = 0;
let action = '';
let result = 0;
let changeSign = false;
let errorBox = document.querySelector('.error');
let errorText = '';

input.value = '0';

let ruleNotLetter = /^[0-9]*[.,]?[0-9]*[e+]*[0-9]*$/;
console.log(ruleNotLetter.test('9.99999999998e+23'));

function checkRule(inputValue) {
    input.value = inputValue.replace(/,/g, '.');
    if (!ruleNotLetter.test(inputValue)) {
        errorText = 'Можно вводить только числа';
        errorBox.textContent = errorText;
        errorBox.classList.add('hidden');
        result = 0;
        numb = 0;
        input.value = '0';
    } else if (action === 'division' && inputValue === '0') {
        errorText = 'Деление на ноль запрещено';
        errorBox.textContent = errorText;
        errorBox.classList.add('hidden');
        result = 0;
        numb = 0;
        input.value = '0';
    } else if (inputValue.length > 16) {
        errorText = 'Можно вводить до 12-и знаков';
        errorBox.textContent = errorText;
        errorBox.classList.add('hidden');
        result = 0;
        numb = 0;
        input.value = '0';
    } else {
        errorText = '';
        errorBox.textContent = '';
        errorBox.classList.remove('hidden');

    }
}

function getAction(numb1, numb2, action) {
    switch (action) {
        case "sum": return numb1 + numb2;
        case "difference": return numb1 - numb2;
        case "multiplication": return numb1 * numb2;
        case "division":
            if(numb1 / numb2) {
                return numb1 / numb2;
            } else {
                return 0;
            }
    }
}

function getResult() {
    numb = +input.value;
    result = getNumberFormat(getAction(result, numb, action));
    input.value = result;
}

buttons.forEach(item => {
    item.addEventListener('click', () => {

        checkRule(input.value);

        let button = item['name'];


        if(button === "changeSign") {
            addMinus();

        } else if(button === "clean") {
            getZero();

        } else if(button === "percent") {
            getPercent();

        } else {
            if(!result) {
                result = +input.value;
                input.value = result;

            } else {
                if(!changeSign){
                    numb = +input.value;
                    result = getAction(result, numb, action);
                    input.value = result;
                }
            }
            action = button;
            input.value = '';
        }
        console.log(result, numb, action);
    })
})

digits.forEach(item => {
    item.addEventListener('click', () => {
        if(input.value === '0' && item.textContent !== '.') {
            input.value = item.textContent;
        } else {
            input.value += item.textContent;
        }
    })
})

function addMinus() {
    if (!result) {
        result = -input.value;
        input.value = result;
        changeSign = true;
        console.log(numb, result,action);
    } else {
        numb = -input.value;
        input.value = numb;
    }
}

function getZero() {
    result = 0;
    numb = 0;
    action = '';
    input.value = '0';
}

function getPercent() {
    numb = +input.value * result / 100;
    input.value = numb;
}

function getNumberFormat(result) {
    if (!result) {
        return 0;
    }

    if (String(result).length <= 12) {
        console.log("*");
        return result;
    }

    let power = Math.pow(10, 14);
    let intermediate = String(Math.round(
                    result * power) / power);
    if (intermediate.length <= 12) {
        return intermediate;
    }

    if (String(result).includes('.') &&
        String(result).indexOf('.') < 12 &&
        !(String(result)).includes('e')) {
        let round = String(result)[12];
        if (+round >= 5) {
            let a = String(+String(result)[11] + 1);
            result = String(result).slice(0,11) + a;
        } else {
            result = String(result).slice(0,12);
        }
        console.log("**");
       return result;
    } else {
        console.log("***");
        console.log(result.toExponential(6));
        return result.toExponential(6);
    }
}

equality.addEventListener('click',() => {
    console.log(result, numb, action);
    checkRule(input.value);
    getResult();
    result = 0;
});



