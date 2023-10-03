import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from "src/app/services/book.service";
import { Book } from "src/app/models/book.model";
import { of } from "rxjs";

const listBook: Book[] = [];

const bookServiceMock = {
    getBooks: ()=> of(listBook)
};

describe('Home Component', ()=> {
    
    let component   : HomeComponent;
    let fixture     : ComponentFixture<HomeComponent>;

    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            declarations: [
                HomeComponent,
            ],
            providers: [
                // BookService,
                {
                    provide: BookService,
                    useValue: bookServiceMock
                }
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    });

    beforeEach(()=> {
        fixture     = TestBed.createComponent(HomeComponent);
        component   = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should create', ()=> {
        expect(component).toBeTruthy();
    });

    it('getBooks get books from suscription', ()=>{
        // Traer el servicio
        const bookService = fixture.debugElement.injector.get(BookService);
        const listBook: Book[] = [];

        // Vamos a espiar el metodo y despues el metodo retornara un observable de tipo listBook
        // const spy1 = spyOn(bookService, 'getBooks').and.returnValue(of(listBook));

        // Llamado al metodo
        component.getBooks();

        // Lo que se espera
        // expect(spy1).toHaveBeenCalled();

        expect(component.listBook.length).toBe(0);
    });

    /**
     * Notes:
     * 
     * f = Si no tenemos una (f) (fit, fdescribe) en todo el proyecto se ejecutaran todas las pruebas.
     * fit('name test', ()=> {}); = solo se ejecutara los test que tengas la (f).
     * fdescribe('name component') = solo se ejecutaran los test de ese component.
     *      
     * 
     * xit = Anulara el test unitario que tenga la (x)
     * xit('name test', ()=> {}); = solo se anulara los test que tengas la (x).
     * xdescribe('name component') = se anularan los test de ese component.
     */

});