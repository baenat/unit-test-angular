import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavComponent } from "./nav.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/compiler";
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from "@angular/router";

class ComponentTestRouter { }

describe('nav component', () => {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'home', component: ComponentTestRouter },
                    { path: 'cart', component: ComponentTestRouter },
                ]),
            ],
            declarations: [
                NavComponent
            ],
            providers: [],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    });

    beforeEach(()=> {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('schould create', ()=> {
        expect(NavComponent).toBeTruthy();
    });

    it('schould navigate', ()=> {
        const router = TestBed.inject(Router);

        const spy = spyOn(router, 'navigate');

        component.navTo('home');
        expect(spy).toHaveBeenCalledWith(['/home']);

        component.navTo('cart');
        expect(spy).toHaveBeenCalledWith(['/cart']);
    });
    
});