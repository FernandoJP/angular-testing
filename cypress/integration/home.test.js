describe('Home Page', () => {

    beforeEach(() => {
        cy.fixture('courses.json').as('coursesJSON');
        cy.server();
        cy.route('/api/courses', '@coursesJSON').as('courses');
        cy.visit('/');
    });

    it('should display a list of courses', () => {
        cy.contains('All Courses');
        cy.wait('@courses');
        cy.get('mat-card').should('have.length', 9);
    });

    it('should display the advanced courses', () => {
        cy.get('.mat-tab-label').should('have.length', 2);
        cy.get('.mat-tab-label').last().click();
        cy.get('.mat-tab-body-active .mat-card-title').its('length').should('be.gt', 1);
        cy.get('.mat-tab-body-active .mat-card-title').first().should('contain', 'Angular Security Course');
    });

    it('it should display all beginner course data', () => {
        cy.fixture('courses').then((data)  => {
            const courses = data.payload.filter(course => course.category === 'BEGINNER');
            cy.get('.mat-tab-body-active .mat-card-title').each((card, i) => {
                console.log(card[0].textContent, courses[i].titles.description, i);
                const currentCourse = courses.filter(course => course.titles.description === card[0].textContent);
                expect(currentCourse).to.have.lengthOf(1);
            })
        })
    });
});