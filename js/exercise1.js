//Створити службове авто (водій, марка, номер). Створити клас таким чином, щоб можна було створити тільки один екземпляр цього класу.


class ServiceAuto {
    static serviceAutoRef;

    constructor(driverName, driverSurname, model, carNumber) {
        if (ServiceAuto.serviceAutoRef)
            return ServiceAuto.serviceAutoRef;

        this.driverName = driverName;
        this.driverSurname = driverSurname;
        this.model = model;
        this.carNumber = carNumber;

        ServiceAuto.serviceAutoRef = this;
    }

}


let serviceAuto = new ServiceAuto('Oleg', 'Belov', 'Audi', 'AA5067CH')
let serviceAuto2 = new ServiceAuto('Petro', 'Galushka', 'BMW', 'AA6578CH')

console.log(serviceAuto)
console.log(serviceAuto2)