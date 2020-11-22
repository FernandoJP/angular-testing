import {TestBed} from '@angular/core/testing';

import { CalculatorService } from "./calculator.service";
import { TestabilityRegistry } from '@angular/core';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {

    let calculator: CalculatorService, 
        loggerSpy: any;

    beforeEach(() => {
        console.log('calling before each');
        
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log'])
        
        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                { provide: LoggerService, useValue: loggerSpy }
            ]
        });

        calculator = TestBed.get(CalculatorService);;

    });

    it('should add 2', () => {
        console.log('add');
        const result = calculator.add(2, 2);
        expect(result).toBe(4, 'unexpected addition result');
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    })

    it('should substract 2', () => {
        console.log('substract');
        const result = calculator.subtract(2, 2);
        expect(result).toBe(0, 'unexpected subtraction result');
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    })
})