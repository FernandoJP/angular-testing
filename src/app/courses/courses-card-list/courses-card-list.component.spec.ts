import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CoursesModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(CoursesCardListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });
  }))


  it("should create the component", () => {
    expect(component).toBeTruthy();
  });


  it("should display the course list", () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    let cards = el.queryAll(By.css('.course-card'));
    expect(cards.length).toBe(12, 'unexpect number of courses');
  });


  it("should display the first course", () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    let course =component.courses[0];
    const card = el.query(By.css('.course-card:first-child')),
      title = card.query(By.css('mat-card-title'));
    expect(card).toBeTruthy('fist card not found');
    expect(title.nativeElement.textContent).toBe(course.titles.description);
  });


});


