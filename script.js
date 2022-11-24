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

// Начальное значение экрана калькулятора
input.value = '0';

// Правило для записи чисел,
// экспоненциальной записи числа
// и символы ".", ",", "-"
let ruleNotLetter = /^-?[0-9]*[.,]?[0-9]*[e+]*[0-9]*$/;

// Функция проверки на ошибки ввода
function checkRule(inputValue) {
    //Замена запятой на точку
    input.value = inputValue.replace(/,/g, '.');


    if (!ruleNotLetter.test(inputValue)) {
        // Проверка по регулярному выражению
        getError('Можно вводить только числа')
    } else if (action === 'division' && inputValue === '0') {
        // Проверка деления на ноль
        getError('Деление на ноль запрещено')
    } else if (inputValue.length > 16) {
        // Ограничение на количество цифр
        getError('Можно вводить до 12-и знаков')
    } else {
        // Если ошибка устранена, удаление стилей и текста ошибки
        deleteError()
    }
}

// Функция, которая срабатытает при ошибке ввода:
// появляется текст ошибки,
// переменные, хранящие информацию ввода, обнуляются
function getError(error) {
    errorText = error;
    errorBox.textContent = errorText;
    errorBox.classList.add('hidden');
    result = 0;
    numb = 0;
    input.value = '0';
}

// Функция, которая срабатывает, когда ошибка исправлена:
// удаляеся окно с ошибкой, возвращаются прежние стили
function deleteError() {
    errorText = '';
    errorBox.textContent = '';
    errorBox.classList.remove('hidden');
}

// Функция, принимающая два числа и действие,
// которое нужно выполнить.
// Возвращает результат арифметических действий
function getAction(numb1, numb2, action) {
    switch (action) {
        case "sum": return numb1 + numb2;
        case "difference": return numb1 - numb2;
        case "multiplication": return numb1 * numb2;
        case "division": return numb1 / numb2;
    }
}

// Изначально в result хранится первое число,
// Данная фунция в numb записывает второе число
// и вызвает getAction() для получения результата
// выполнения арифметической операции.
// Полученное значение в нужном формате
// записывается в result и выводится на экран калькулятора
function getResult() {
    numb = +input.value;
    result = getNumberFormat(getAction(result, numb, action));
    input.value = result;
}

// Массив кнопок калькулятора,
// отвечающих за математические действия
buttons.forEach(item => {
    item.addEventListener('click', () => {

        // Проверка ввода
        checkRule(input.value);

        let button = item['name'];

        // Смена знака числа,
        // кнопка "+/-"
        if(button === "changeSign") {
            addMinus();

        // Сброс значений,
        // кнопка "АС"
        } else if(button === "clean") {
            getZero();

        // Расчет процента,
        // кнопка "%"
        } else if(button === "percent") {
            getPercent();

        // Остальные арифметические действия,
        // кнопки "+", "-", "х", "/"
        } else {
            if(!result) {
                result = +input.value;
                input.value = result;

            } else {
                // Переменная changeSign
                // принимает значение истины, если
                // была вызвана функция изменения знака числа.
                // Данная проверка нужна, чтобы, в случае,
                // если был изменен знак,
                // переменные не перезаписывались
                if(!changeSign){
                    numb = +input.value;
                    result = getAction(result, numb, action);
                    input.value = result;
                }
            }
            action = button;
            input.value = '';
            changeSign = false;
        }
    })
})

// Массив кнопок калькулятора,
// отвечающих за цифры и точку.
// Вывод набранных чисел на экран калькулятора
digits.forEach(item => {
    item.addEventListener('click', () => {
        if(input.value === '0' && item.textContent !== '.') {
            input.value = item.textContent;
        } else {
            input.value += item.textContent;
        }
    })
})

// Функция смены знака
function addMinus() {
    if (!result) {
        result = -input.value;
        input.value = result;
        changeSign = true;
    } else {
        numb = -input.value;
        input.value = numb;
    }
}

//Функция сброса всех значений
function getZero() {
    result = 0;
    numb = 0;
    action = '';
    input.value = '0';
    // Если была ошибка ввода,
    // то экран с ошибкой исчезнет
    deleteError();
}

// Функция расчета процентов,
// result - это 100%
function getPercent() {
    numb = +input.value * result / 100;
    input.value = numb;
}

// Функция, приводящая формат числа к нужному виду
function getNumberFormat(result) {

    // Проверка исключает вывод NaN, undefined и т.п.
    if (!result) {
        return 0;
    }

    // Если result состоит из 12-и знаков и менее,
    // то результат вычислений выводится без изменений
    if (String(result).length <= 12) {
        return result;
    }

    // Данные действия нужны для правильного расчета
    // действий с десятичными дробями.
    // Пример, 0.1 + 0.2 = 0.3 вместо
    // 0,1 + 0,2 = 0,30000000000000004
    let power = Math.pow(10, 14);
    let intermediate = String(Math.round(
                    result * power) / power);
    if (intermediate.length <= 12) {
        return intermediate;
    }

    // Правильное округление бесконечной десятичной дроби,
    // целая часть которой помещается в экран
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
        return result;

    // Если предыдущие условия не сработали,
    // значит, полученное число очень большое.
    // Результат приведен к экспоненциальной записи
    } else {
        return result.toExponential(6);
    }
}

// Слушатель событий на кнопку "="
equality.addEventListener('click',() => {
    checkRule(input.value);
    getResult();
    result = 0;
});



