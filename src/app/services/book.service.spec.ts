import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { BookService } from "./book.service";
import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../models/book.model";
import { environment } from "src/environments/environment.prod";
import Swal from "sweetalert2";

const listBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 5000,
        amount: 2,
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 10000,
        amount: 1,
    },
];

const book: Book = {
    name: '',
    author: '',
    isbn: '',
    price: 5000,
    amount: 2,
}

// Test a un servicio con peticiones a una API
describe('BookService', () => {
    let service: BookService;
    let httpMock: HttpTestingController;
    let storage = {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                BookService
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        });
    });

    beforeEach(() => {
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);

        storage = {};

        spyOn(localStorage, 'getItem').and.callFake((key: string) => {
            return storage[key] ? storage[key] : null;
        });

        spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
            return storage[key] = value;
        });
    });

    // Verifica peticiones pendientes entre cada test
    afterAll(() => {
        httpMock.verify();
    });

    it('schould be create', () => {
        expect(service).toBeTruthy();
    });

    it('getBook return a list of book and does a get method', () => {
        service.getBooks().subscribe((resp: Book[]) => {
            // Se compara los arreglos que llegue con el tipo adecuado
            expect(resp).toEqual(listBook);
        });

        // Peticion a la url
        const request = httpMock.expectOne(environment.API_REST_URL + '/book');

        // Verificar el peticion de metodo que sea igual a 'GET'
        expect(request.request.method).toBe('GET');

        // Simular que la peticion se ha hecho y que retorne un observable de listBook
        request.flush(listBook);
    });

    it('getBooksFromCart return empty array when localStorage is empty', () => {
        const listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);
    });

    it('addBookToCart add a book successfully when the list not exist in the localStorage', () => {

        const toast = {
            fire: () => null
        } as any;

        const spy1 = spyOn(Swal, 'mixin').and.callFake(() => {
            return toast;
        });

        let listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);

        service.addBookToCart(book);
        listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(1);

        expect(spy1).toHaveBeenCalled();
    });

    it('removeBooksFromCart remove the list from the localStorage', ()=> {
        service.addBookToCart(book);
        let listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(1);

        service.removeBooksFromCart();
        listBook = service.getBooksFromCart();

        expect(listBook.length).toBe(0);
    });

});