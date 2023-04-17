//Склад. База товарів, які зберігаються на складі: назва товару, одиниця виміру, кількість, фірма виробник (назва, реєстраційний номер).
// Організувати реєстрацію/відвантаження товарів, фільтрація за назвою товару, фільтрація за назвою фірми

class Manufacturer {
    #registrationNumber;

    constructor(firmName, firmRegistrationNumber) {
        this.firmName = firmName;
        this.#registrationNumber = firmRegistrationNumber;
    }

    get RegistrationNumber() {
        return this.#registrationNumber;
    }

    toString() {
        return `Firm name:${ this.firmName }, Registration number:${ this.RegistrationNumber }`;
    }
}

class Product {
    #count;

    constructor(productName, unit, count, firmName, firmRegNum) {
        this.productName = productName;
        this.unit = unit;
        this.Count = count;
        this.manufacturer = new Manufacturer(firmName, firmRegNum);
    }

    get Count() {
        return this.#count;
    }

    set Count(newCount) {
        if (newCount < 0)
            throw new Error('Item count cannot be negative');
        this.#count = newCount;
    }

    toString() {
        return `${ this.manufacturer } - Product name:${ this.productName }, unit:${ this.unit }, count:${ this.Count }<br>`;
    }
}

class Composition {
    constructor() {
        this.compositionItem = [];
    }

    registerProduct(...product) {
        if (product.length === 0)
            throw new Error('Product length cannot be zero');
        this.compositionItem.push(...product)
    }

    productShipment(productTitle, productCount) {
        this.compositionItem.find(el =>
            el.productName === productTitle
        ).Count -= productCount
    }
    addCountToExistedProduct(productTitle, productCount) {
        this.compositionItem.find(el =>
            el.productName === productTitle
        ).Count += productCount
    }

    filterByProductName(productName) {
        const filtered = this.compositionItem.filter(el => el.productName === productName)
        document.write(`Filtered product by product name: ${filtered}<hr>`)
    }

    filterByCompanyName(companyName) {
        const filtered = this.compositionItem.filter(el => el.manufacturer.firmName === companyName)
        document.write(`Filtered product by company name: ${filtered}<hr>`)
    }

    render() {
        document.write(`${ this.compositionItem.join('') }<hr>`)
    }
}

let product1 = new Product('Sock-a-matic', 2, 15, 'Sock Insurance Inc.', 'TJ57-KL98-UJ43-PL09')
let product2 = new Product('Sky Slice', 3, 8, 'Pizza Parachute Co. ', 'KX67-HM98-BN32-QW10')
let product3 = new Product('Shrimpy Party Bus', 1, 6, 'Shrimpy Wheels LLC Product', 'GD43-PL89-TK21-ZX76')

let composition = new Composition()
composition.registerProduct(product1, product2, product3)

console.log(composition)
composition.render()

composition.productShipment('Sky Slice', 3)
composition.render()

composition.filterByProductName('Shrimpy Party Bus')
composition.filterByCompanyName('Sock Insurance Inc.')

composition.addCountToExistedProduct('Shrimpy Party Bus', 50)
composition.render()