// Importar los import de la ruta adecuada
import { CartComponent } from "./cart.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from "src/app/services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";

// Los test nunca se ejecutan en orden

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

// Test a un Component
describe('Cart Component', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let service: BookService;

    // Configuracion del test
    beforeEach(() => {
        // Fichero configuracion TestBed
        TestBed.configureTestingModule({
            imports: [
                // Imports necesarios
                HttpClientTestingModule,
            ],
            declarations: [
                // Declarations necesarios
                CartComponent,
            ],
            providers: [
                // Providers necesarios
                BookService,
            ],
            schemas: [
                // Siempre recomendado
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    });

    // Instanciamos el test
    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(BookService);
        spyOn(service, 'getBooksFromCart').and.callFake(()=> null);
    });

    // Comprobar que se ha creado correctamente
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Test metodo con retun
    it('getTotalPrice retun a total', () => {
        const totalPrice = component.getTotalPrice(listBook);
        expect(totalPrice).toBeGreaterThan(0);
        expect(totalPrice).not.toBeNull();
    });

    // Test metodo sin return
    it('onInputNumberChange incrementa correctamente', () => {
        const action = 'plus';
        const book = {
            name: '',
            author: '',
            isbn: '',
            price: 5000,
            amount: 2,
        };

        expect(book.amount).toBe(2);

        // Se crea un spia para ver si se esta llamando la funcion, y se hace un llamado falso
        const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

        component.onInputNumberChange(action, book);

        expect(book.amount === 3).toBeTrue();

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    // Test metodo sin return
    it('onInputNumberChange disminuir correctamente', () => {
        const action = 'minus';
        const book = {
            name: '',
            author: '',
            isbn: '',
            price: 5000,
            amount: 3,
        };

        // Se crea un espia para ver si se esta llamando la funcion, y se hace un llamado falso
        const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

        expect(book.amount).toBe(3);

        component.onInputNumberChange(action, book);

        expect(book.amount).toBe(2);

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    // Test a metodos publicos que a su vez llaman metodos privados
    it('onClearBooks works correctly', ()=> {

         // Se espia y ademas lo vamos a llamar
        const spy1 = spyOn((component as any), '_clearListCartBook').and.callThrough();     // llamada a metodo private dentro del metodo public
        const spy2 = spyOn(service, 'removeBooksFromCart').and.callFake(()=> null);         // Se espia y anula lo que haga el servicio
        component.listCartBook = listBook;
        component.onClearBooks();

        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();    // Comprobar que haya sido llamado correctamente
        expect(spy2).toHaveBeenCalled();    // Comprobar que haya sido llamado correctamente
    });

    // Test metodo private
    it('_clearListCartBook works correctly', ()=> {
        const spy1 = spyOn(service, 'removeBooksFromCart').and.callFake(()=> null);

        component.listCartBook = listBook;
        component['_clearListCartBook']();
        
        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
    });

});