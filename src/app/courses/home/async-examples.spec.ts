import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe('simple async examples', () => {
    it('Async test examples ', (done: DoneFn) => {
        let test = false;
        setTimeout(() => {
            console.log('runnning assertions');
            test = true;
            expect(test).toBeTruthy();
            done();
        })
    });
    it('Async test examples setTimeout', fakeAsync(() => {
        let test = false;

        setTimeout(() => {
            console.log('runnning assertions');
            test = true;
        }, 1000);

        flush();

        expect(test).toBeTruthy();
    }));

    it('Async test examples setTimeout', fakeAsync(() => {

        let test = false;
        
        Promise.resolve().then(()=> {
            console.log('Promise');
            test = true;
        });

        flushMicrotasks();

        console.log('running assertions');

        expect(test).toBeTruthy();
    }));

    it('Async test examples setTimeout', fakeAsync(() => {
        let test = false;
        const test$ = of(test).pipe(delay(1));
        test$.subscribe(() => {
            test = true;
        });
        tick(1);
        expect(test).toBe(true);
    }));
})