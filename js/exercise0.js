//Створити клас, що дозволяє виконувати такі операції над масивами: знаходження кількості додатних, кількості від’ємних, кількість входжень деякого числа (статичні методи)


class ArrayDigitsCounter {
    static allPositiveNumbersCounter = 0;
    static allNegativeNumbersCounter = 0;
    static allOccurrencesNumberCounter = 0;

    constructor(initArrays) {
        if (!Array.isArray(initArrays))
            throw new TypeError('Passed value isn\'t an array');
        if (!initArrays.every(element => typeof element === 'number' && !isNaN(element)))
            throw new TypeError('Array elements isn\'t number');
        this.array = initArrays;
    }

    static getArrPositiveNumbers(array) {
        let arrayPositiveNumber = array.filter(element => element > 0).length;
        ArrayDigitsCounter.allPositiveNumbersCounter += arrayPositiveNumber
        return arrayPositiveNumber;
    }

    static getArrNegativeNumbers(array) {
        let arrayNegativeNumber = array.filter(element => element < 0).length;
        ArrayDigitsCounter.allNegativeNumbersCounter += arrayNegativeNumber
        return arrayNegativeNumber;
    }
    static getArrOccurrencesNumbers(array, number) {
        let arrayOccurrencesNumbers = array.filter(element => element === number).length
        ArrayDigitsCounter.allOccurrencesNumberCounter += arrayOccurrencesNumbers
        return arrayOccurrencesNumbers
    }
}

let arr = new ArrayDigitsCounter([1, 2, 3, 1, 4, 1])
let arr2 = new ArrayDigitsCounter([-1, 2, -4, -1, 1])


console.log('Arr1 positive numbers:',ArrayDigitsCounter.getArrPositiveNumbers(arr.array))
console.log('Arr2 positive numbers:',ArrayDigitsCounter.getArrPositiveNumbers(arr2.array))
console.log('Arr1 negative numbers:',ArrayDigitsCounter.getArrNegativeNumbers(arr.array))
console.log('Arr2 negative numbers:',ArrayDigitsCounter.getArrNegativeNumbers(arr2.array))
console.log('Arr1 occurrences of 1:',ArrayDigitsCounter.getArrOccurrencesNumbers(arr.array,1))
console.log('Arr2 occurrences of -1:',ArrayDigitsCounter.getArrOccurrencesNumbers(arr2.array,-1))

console.log('All positive numbers:',ArrayDigitsCounter.allPositiveNumbersCounter)
console.log('All negative numbers:',ArrayDigitsCounter.allNegativeNumbersCounter)
console.log('All occurrences numbers:',ArrayDigitsCounter.allOccurrencesNumberCounter)