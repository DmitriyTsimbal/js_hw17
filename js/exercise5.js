//Дано два класи MultChecker (клас для перевірки таблиці множення - рандомно генеруються числа, які треба перемножати),
// AddChecker (клас для перевірки додавання - рандомно генеруються числа у заданому діапазоні, які треба додавати).
// Обидва класи надсилають результати тестування об'єкту класу Hystory, який зберігає історію тестування у масиві у вигляді об'єктів
// Приклад.
// testsList= [
//    {firstNum:1, secondNum:5,opration:’*’, userAnswer:7, correctAnswer:5},
//    {firstNum:3, secondNum:4,opration:’+’, userAnswer:7, correctAnswer:7},
// ]
// Можна створити окремий клас TestData, який описує один такий тест і у якому будуть ці поля.
// Розробити клас TestManager, який використовуючи ці класи за допомогою таймера періодично генерує якісь N задач
// (рандомно вибираємо, що опитувати: додавання чи множення) і проводить опитування. Результати тестування додаються в об’єкт History.
// Зробити так, щоб об'єкт такого класу можна було створити тільки один. Коли зроблено ці N задач вивести усю історію на екран.


class MultChecker {
    constructor() {
        this.firstNum = null;
        this.secondNum = null;
        this.correctAnswer = null;
        this.userAnswer = null
        this.operation = '•'
    }

    getRandomNumber() {
        return Math.floor(Math.random() * 100);
    }

    testEquation() {
        this.firstNum = this.getRandomNumber();
        this.secondNum = this.getRandomNumber();
        this.correctAnswer = this.firstNum * this.secondNum;
        this.userAnswer = parseInt(prompt(`${ this.firstNum } • ${ this.secondNum }`));
    }
}


class AddChecker {
    constructor() {
        this.firstNum = null;
        this.secondNum = null;
        this.correctAnswer = null;
        this.userAnswer = null;
        this.operation = '+'
    }

    getRandomNumber() {
        return Math.floor(Math.random() * 100);
    }

    testEquation() {
        this.firstNum = this.getRandomNumber();
        this.secondNum = this.getRandomNumber();
        this.correctAnswer = this.firstNum + this.secondNum;
        this.userAnswer = parseInt(prompt(`${ this.firstNum } + ${ this.secondNum }`));
    }
}


class TestData {
    constructor({firstNum, secondNum, operation, userAnswer, correctAnswer}) {
        this.firstNum = firstNum;
        this.secondNum = secondNum;
        this.operation = operation;
        this.userAnswer = userAnswer;
        this.correctAnswer = correctAnswer;
        this.isCorrectAnswer = userAnswer === correctAnswer ? 'Yes' : 'No';
    }

    toString() {
        return `First num:${ this.firstNum }, Second num:${ this.secondNum }, Operator: ${ this.operation }, User answer: ${ this.userAnswer }, Correct answer: ${ this.correctAnswer }, Is correct answer: ${ this.isCorrectAnswer }<hr>`
    }
}

class History {
    constructor() {
        this.dataTestInfo = []
    }

    addDataTest(dataTest) {
        this.dataTestInfo.push(dataTest);
    }
    toString() {
        return `${this.dataTestInfo.join('')}`
    }
}

class TestManager {
    static testManagerHref

    constructor(tasksCount) {
        if (TestManager.testManagerHref)
            return TestManager.testManagerHref
        this.history = new History();
        this.tasksCount = tasksCount;
        TestManager.testManagerHref = this
    }

    startTestEquation() {
        let interval = setInterval(() => {

            const random = Math.floor(Math.random() * 2);
            let equation;
            if (random)
                equation = new MultChecker()
            else
                equation = new AddChecker()
            equation.testEquation()
            this.history.addDataTest(new TestData(equation))
            this.tasksCount--
            if (this.tasksCount === 0) {
                clearInterval(interval)
                this.render()
            }
        }, 2000)
    }

    render() {
        document.write(`${this.history}`)
    }
}

const testManager = new TestManager(5);
testManager.startTestEquation()


