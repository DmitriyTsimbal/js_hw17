//Особиста бібліотека. Картотека домашньої бібліотеки: дані книги (автори (піб, рік народження, короткий опис), назва книги, жанр, видавництво
// (назва, реєстраційний номер, рік засування)).  Реалізувати розділи бібліотеки (спеціальна література, хобі, домашнє господарство і т.д.), походження книги та наявність на даний час.
// Організувати додавання/вилучення книг та вибір книг за назвою, за ПІБ автора, за видавництвом.


class Author {
    constructor({authorName, authorSurname, authorPatronymic, birthYear, shortDescription}) {
        this.authorName = authorName;
        this.authorSurname = authorSurname;
        this.authorPatronymic = authorPatronymic
        this.birthYear = birthYear;
        this.shortDescription = shortDescription;
    }

    get FullName() {
        return `${ this.authorName } ${ this.authorSurname } ${ this.authorPatronymic }`;
    }

}


class Edition {
    constructor({name, registrationNumber, introductionYear}) {
        this.name = name;
        this.registrationNumber = registrationNumber;
        this.introductionYear = introductionYear;
    }
}

class Sections {
    constructor(sectionTitle) {
        this.sectionTitle = sectionTitle;
        this.sectionLibrary = [];
    }

}

class Book {
    constructor(authorData, bookName, genre, editionData, origin, availability) {
        this.authors = authorData.map(author => new Author(author))
        this.bookName = bookName;
        this.genre = genre;
        this.edition = new Edition(editionData)
        this.origin = origin;
        this.availability = availability;
    }
}

class PersonalLibrary {
    static libraryHref

    constructor(...books) {
        if (PersonalLibrary.libraryHref)
            return PersonalLibrary.libraryHref

        this.books = books;
        this.sections = [];

        PersonalLibrary.libraryHref = this;
    }

    addToSection() {
        for (const book of this.books) {
            if (!this.sections.some(section => section.sectionTitle === book.genre))
                this.sections.push(new Sections(book.genre))
            let section = this.sections.find(section => section.sectionTitle === book.genre);
            if (section)
                section.sectionLibrary.push(book);
        }


    }

    //Метод видаляє книгу, але спеціально лишає саму секцію
    deleteByBookName(initBookName) {
        if (!initBookName)
            throw new Error('Book name doesnt inserted');
        let book = this.books.find(book => book.bookName === initBookName);
        if (book) {
            for (const section of this.sections)
                section.sectionLibrary = section.sectionLibrary.filter(b => b !== book)
            this.books = this.books.filter(b => b !== book)
        } else throw new Error('Book doesnt found')
    }

    addNewBook({authorData, bookName, genre, editionData, origin, availability}) {
        if (!authorData || !bookName || !genre || !editionData || !origin || !availability)
            throw new Error('Book info doesnt inserted')
        const authors = authorData.map(author => new Author(author));
        const edition = new Edition(editionData);
        const newBook = new Book(authors, bookName, genre, edition, origin, availability)
        this.books.push(newBook)
    }

    getBooksByAuthorName(initAuthorName) {
        if (!initAuthorName)
            throw new Error('Author name doesnt inserted');
        return this.books.filter(book =>
            book.authors.some(
                author => author.FullName === initAuthorName
            )
        )
    }

    getBooksByBookName(initBookName) {
        if (!initBookName)
            throw new Error('Book name doesnt inserted')
        return this.books.filter(book => book.bookName === initBookName)
    }

    getBookByEditionName(initEditionName) {
        if (!initEditionName)
            throw new Error('Edition name doesnt inserted')
        return this.books.filter(book => book.edition.name === initEditionName)
    }

    getBookByAvailability() {
        return this.books.filter(book => book.availability = 'Available')
    }
}

let book = new Book([{
    authorName: 'Sherlock',
    authorSurname: 'Holmes',
    authorPatronymic: '',
    birthYear: 1854,
    shortDescription: 'The best detective in England'
}, {
    authorName: 'Agatha',
    authorSurname: 'Christie',
    authorPatronymic: 'Mary Clarissa',
    birthYear: 1890,
    shortDescription: 'Queen of Crime'
}, {
    authorName: 'Arthur Conan',
    authorSurname: 'Doyle',
    authorPatronymic: 'Ignatius',
    birthYear: 1859,
    shortDescription: 'The creator of Sherlock Holmes'
}], 'Sherlock Holmes', 'Mystery', {
    name: 'The Baker Street Press',
    registrationNumber: 'BS001',
    introductionYear: 1887
}, 'Inherited', 'Available')
let book2 = new Book([{
    authorName: 'Jack',
    authorSurname: 'Sparrow',
    authorPatronymic: 'Captain',
    birthYear: 1729,
    shortDescription: 'A pirate who became a legend'
}, {
    authorName: 'Captain',
    authorSurname: 'Hook',
    authorPatronymic: '',
    birthYear: 1762,
    shortDescription: 'The nemesis of Peter Pan'
}], 'Peter Pan Man\'s Chest', 'Fantasy', {
    name: 'Neverland Publishing House',
    registrationNumber: 'NP002',
    introductionYear: 1904
}, 'Found on a Treasure Hunt', 'Available')
let book3 = new Book([{
    authorName: 'Harry',
    authorSurname: 'Potter',
    authorPatronymic: 'James',
    birthYear: 1980,
    shortDescription: 'The boy who lived'
}, {
    authorName: 'Hermione',
    authorSurname: 'Granger',
    authorPatronymic: 'Jean',
    birthYear: 1979,
    shortDescription: 'The brightest witch of her age'
}], 'Harry Potter and the Philosopher\'s Stone', 'Fantasy', {
    name: 'Hogwarts Publishing',
    registrationNumber: 'HP001',
    introductionYear: 1997
}, 'A gift from Dumbledore', 'Unavailable')


const personalLibrary = new PersonalLibrary(book, book2, book3)
console.log('Before delete by book name:', personalLibrary)


console.log('Get book by author full name:', personalLibrary.getBooksByAuthorName('Harry Potter James'))
console.log('Get book by book name:', personalLibrary.getBooksByBookName('Peter Pan Man\'s Chest'))


personalLibrary.addNewBook({
        authorData: [{
            authorName: 'Chuck',
            authorSurname: 'Norris',
            authorPatronymic: 'Ray',
            birthYear: 1940,
            shortDescription: 'The ultimate author.'
        }],
        bookName: 'The Art of Chuck Norris',
        genre: 'Humor',
        editionData: {name: 'Walker, Texas Ranger Books', registrationNumber: 'WTX88991122', introductionYear: 2021},
        origin: 'Roundhouse Kick',
        availability: 'Always Available'
    }
)
console.log('Get book by edition name:', personalLibrary.getBookByEditionName('Walker, Texas Ranger Books'))
console.log('After adding a new book:', personalLibrary)

personalLibrary.addToSection()
console.log('Get book by availability:', personalLibrary.getBookByAvailability())

personalLibrary.deleteByBookName('Sherlock Holmes')
console.log('After delete by book name:', personalLibrary)