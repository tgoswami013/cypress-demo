/// <reference types="cypress" />

describe('Group 1', ()=> {
  describe('Describe inside describe', ()=>{

  })

  it.only('search smart table', () =>{
      cy.visit("/");

      cy.contains("Tables & Data").click();
      cy.contains("Smart Table").click();

      const age = [20, 30, 40, 150];

      cy.wrap(age).each(age =>{

        cy.get("[placeholder='Age']").clear().type(age)

        cy.wait(1000)

    
        cy.get("tbody tr").each(tableRow => {
           
          if(age > 100)
            cy.wrap(tableRow).should('contain','No data found')
          else  
            cy.wrap(tableRow).find('td').eq(6).should('contain',age)
        })

      })



  })
  it('search smart table', () => {
    //Visit home page
    cy.visit("/");

    // Click on Tables & Data link
    cy.contains("Tables & Data").click()

    // Click on Smart table link
    cy.contains("Smart Table").click()
   
    // constant array with 4 elements
    const age = [20,30,40,150];

    // Iterate through each element of age
    cy.wrap(age).each(age =>{
    
    //clear and type in age search box
    cy.get('thead [placeholder="Age"]').clear().type(age)
    
    // Wait for 1 second
    cy.wait(1000)

    // Iterate through each row of search result
    cy.get('tbody tr').each(tableRow => {
      
      // When age is greater than 100 it should display no data found
      // else it should check in 7th column of each row the age should be as exepcted
      if(age > 100)
      cy.wrap(tableRow).should('contain','No data found')
      else
        cy.wrap(tableRow).find('td').eq(6).should('contain',age)
    })
    })
  })

  it('update smarrt table', () =>{
    cy.visit("/");

    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.get('tbody').contains('tr','snow@gmail.com').then(tableRow => {
      cy.wrap(tableRow).find('i.nb-edit').click();

      cy.wrap(tableRow).find("[placeholder='Age']").clear().type(25);
      cy.get('.nb-checkmark').click();

      cy.wrap(tableRow).find('td').eq(6).should('contain',25);

    })
    
  })

  it('insert smart table', () =>{
    cy.visit("/");

    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();
    cy.get('i.nb-plus').click();

    cy.get('thead').find('tr').eq(2).then(tableRow =>{

      cy.wrap(tableRow).find("[placeholder='First Name']").type("Tarun")
      cy.wrap(tableRow).find("[placeholder='Last Name']").type("Goswami")
      cy.wrap(tableRow).find("[placeholder='Username']").type("tgoswami")

      cy.wrap(tableRow).find('i.nb-checkmark').click()
    })

    //Verify data
    cy.get('tbody tr').first().find('td').then(tableColumn => {
      cy.wrap(tableColumn).eq(2).should('contain','Tarun')
      cy.wrap(tableColumn).eq(3).should('contain','Goswami')
      cy.wrap(tableColumn).eq(4).should('contain','tgoswami')
    })


  })
 


  it('insert smart table', () => {
    // Visit homep age
    cy.visit("/");

    // Click on Tables & Data Link
    cy.contains("Tables & Data").click()
    
    // Click on Smart Table in Tables & Data Link
    cy.contains("Smart Table").click()
   
    // Click on + icon to insert tow
    cy.get('thead').find('.nb-plus').click();
    
    // work on the 2nd table row which is for inserting data using index 2
    cy.get('thead').find('tr').eq(2).then(tableRow => {
      // Insert First Name, Last Name and UserName
      cy.wrap(tableRow).find('[placeholder="First Name"]').type("Tarun")
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Goswami")
      cy.wrap(tableRow).find('[placeholder="Username"]').type("tgoswami")
      
      // Click on checkmark
      cy.wrap(tableRow).find('i.nb-checkmark').click();
    });

    //Verify Data after insertion using column index. e.g index 2 is for First Name
    cy.get('tbody tr').first().find('td').then(tableColumn => {
      cy.wrap(tableColumn).eq(2).should('contain','Tarun')
      cy.wrap(tableColumn).eq(3).should('contain','Goswami')
      cy.wrap(tableColumn).eq(4).should('contain','tgoswami')
    })

    })
  })

  it('update smart table', () => {
    cy.visit("/");
    cy.contains("Tables & Data").click()
    cy.contains("Smart Table").click()
    cy.get('tbody').contains('tr','John').then(tableRow =>{
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[placeholder="E-mail"]').clear().type("snow@gmail.com")
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).find('td').eq(5).should('contain','snow@gmail.com');
    })
  })


  it('verify dropdown', () =>{
    cy.visit("/");

    cy.get("nav nb-select").then(dropdown =>{
      cy.wrap(dropdown).click()

      cy.get("ul.option-list nb-option").each((listItem,index) =>{

        const colorName = listItem.text().trim();

        const colorsList = {
          "Light": "rgb(255, 255, 255)",
          "Dark": "rgb(34, 43, 69)",
          "Cosmic":"rgb(50, 50, 89)",
          "Corporate":"rgb(255, 255, 255)"
        }

        cy.wrap(listItem).click();
        cy.wrap(dropdown).should('contain',colorName);
        cy.get("nb-layout-header").should("have.css","background-color",colorsList[colorName]);

        if(index < 3)
          cy.wrap(dropdown).click();

        
      })
    })
  })
  
  it('get demo', () => {
    cy.visit("/");
    cy.get("div.logo-container a.logo");
    cy.get('a[title="Forms"]');
  })

  it('contains demo', () => {
    cy.visit("/");
 
  cy.contains("Extra Components");  
  cy.contains("Extra"); 
  cy.contains("Extt"); 

    // E1 - Using string
    cy.contains("Forms").click();

    // E2 - Using number
    cy.contains("Form Layouts");
    cy.contains(2019);

    // E3- use contains with get()
    cy.get("span.menu-title").contains("Form Layouts");

    // E4 - use contains with selector and content 
    cy.contains("span.menu-title","Form Layouts");

  })

  it('Locators Demo', ()=>{
   cy.visit("/pages/forms/layouts");

   // By tag name
   cy.get('textarea');

   //By ID
   cy.get('#inputEmail1');

   //Use . with single class name
   cy.get('.status-danger');

   // Use multiple classes
   cy.get('[class="appearance-filled size-medium shape-rectangle status-danger nb-transition"]');

   // By attribute name
   cy.get('[placeholder]'); 

   // By Attribute Name and value
   cy.get('[placeholder="Email"]');

   // By multiple attributes
   cy.get('[placeholder="Email"][type="email"]');

   //Use tag name with class
   cy.get('button.status-danger');

   //Use tag name with id
   cy.get('input#inputEmail1');

   //use tag name with any other attribute
   cy.get('input[placeholder="Email"]');

   //use tag name with class, id and attribute
   cy.get('12345[placeholder="Email"].input-full-width#inputEmail1');
  })


