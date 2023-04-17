//Створити клас Нагадувач. Кожні вказані кількості секунд (використати setInterval) програма нагадує про якусь подію (це просто текст)
// і також виводиться порядковий номер скільки раз вже нагадування було.
// Зробити так, щоб не можна було зробити одночасно декілька об'єктів-нагадувачів. Методи зупинки таймера, метод зміни повідомлення без зупинки таймера.


class Reminder {
    static reminderRef;
    static reminderCounter = 0;
    static intervalId;

    constructor(message) {

        if (Reminder.reminderRef)
            return Reminder.reminderRef;

        this.message = message;

        if (this.message.length === 0)
            throw new Error('Message length cant be zero')


        Reminder.reminderRef = this;
    }

    startReminder(seconds) {
        if (typeof seconds !== 'number' || seconds <= 0)
            throw new Error('Too small interval')
        Reminder.intervalId = setInterval(() => {
            Reminder.reminderCounter++
            const reminderMessage = document.createElement('div')
            reminderMessage.innerHTML = `Remind №${ Reminder.reminderCounter }: ${ this.message }`
            document.body.append(reminderMessage)
        }, seconds * 1000)
    }

    stopReminderTimer() {
        const stopButton = document.createElement('button');
        stopButton.textContent = 'Stop Reminder Timer'
        stopButton.addEventListener('click', () => {
            clearInterval(Reminder.intervalId)
        })
        document.body.append(stopButton)
    }

    changeMessage(newMessage, timer) {
        setTimeout(() => {
            this.message = newMessage;
        }, timer * 1000)
    }
}

let reminder = new Reminder('Hello world');

reminder.startReminder(2)
reminder.changeMessage('Hi', 5)


reminder.stopReminderTimer()