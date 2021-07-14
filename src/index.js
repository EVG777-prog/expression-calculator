function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(string) {
    console.log(string);
    let newText = string;

    // добавляем пробелы между цифрами и арифметическими знаками
    newText = newText.replace(/\*/g, ' * ');
    newText = newText.replace(/\//g, ' / ');
    newText = newText.replace(/\+/g, ' + ');
    newText = newText.replace(/-/g, ' - ');
    newText = newText.replace(/\(/g, ' ( ');
    newText = newText.replace(/\)/g, ' ) ');
    // удаляем пробелы в начале и конце
    newText = newText.trimLeft().trimRight();

    // удаляем двойные пробелы
    while (newText.includes('  ')) {
        newText = newText.replace('  ', ' ');
    }
    // перемещаем в массив
    let numbers = newText.split(' ');

    // console.log(numbers);

    let bracket1 = 0;
    let bracket2 = 0;

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] == '(') {
            bracket1 += 1;
        } else if (numbers[i] == ')') {
            bracket2 += 1;
        }
    }
    if (bracket1 != bracket2) {
        throw new UserException("ExpressionError: Brackets must be paired");
    }
    bracket1 = 0;
    bracket2 = 0;

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] == '(') {
            bracket1 = i;
            // console.log(`Нашли 1-ю скобку на ${i} позиции!`);
        } else if (numbers[i] == ')') {
            bracket2 = i;
            // console.log(numbers.slice(bracket1 + 1, bracket2));
            let x = solveString(numbers.slice(bracket1 + 1, bracket2));
            // console.log(x);
            numbers.splice(bracket1, bracket2 - bracket1 + 1, x);
            // console.log(`Вычислили выражение в скобках, между ${bracket1} и ${bracket2}`);
            // console.log(numbers);
            i = -1;
        }
    }

    if (isNaN(solveString(numbers))) {
        throw new UserException("TypeError: Division by zero.");
    }
    return solveString(numbers);



    function solveString(numbersWithSings) {
        // выполняем умножение и деление
        while (numbersWithSings.includes('/') || numbersWithSings.includes('*')) {
            let x;
            for (let i = 1; i < (numbersWithSings.length - 1); i = i + 2) {
                if (numbersWithSings[i] === '*') {
                    x = numbersWithSings[i - 1] * numbersWithSings[i + 1];
                    numbersWithSings.splice(i - 1, 3, x);
                    i -= 2;

                } else if (numbersWithSings[i] === '/') {
                    if (numbersWithSings[i + 1] == 0) {
                        return 'TypeError: Division by zero.';
                    }
                    x = numbersWithSings[i - 1] / numbersWithSings[i + 1];
                    numbersWithSings.splice(i - 1, 3, x);
                    i -= 2;
                }
                // console.log(numbersWithSings);
            }
        }

        // выполняем сложение и вычитание
        while (numbersWithSings.includes('+') || numbersWithSings.includes('-')) {
            let x;
            for (let i = 1; i < (numbersWithSings.length - 1); i = i + 2) {
                if (numbersWithSings[i] === '+') {
                    x = +numbersWithSings[i - 1] + +numbersWithSings[i + 1];
                    numbersWithSings.splice(i - 1, 3, x);
                    i -= 2;
                } else if (numbersWithSings[i] === '-') {
                    x = numbersWithSings[i - 1] - numbersWithSings[i + 1];
                    numbersWithSings.splice(i - 1, 3, x);
                    i -= 2;
                }
                // console.log(numbersWithSings);
            }
        }
        // переводим результат в переменную и округляем
        let result = numbersWithSings[0];

        return result;
    }

    function UserException(message) {
        this.message = message;
        this.name = "Исключение, определённое пользователем";
    }
}


module.exports = {
    expressionCalculator
}