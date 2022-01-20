export default class RegisterPage {
    // locators

    registerHeader() {
        return cy.get('class=page-title');
    }

    registerAsCompanyCheckbox() {
        return cy.get('#RegisterAsCompany');
    }

    maleGenderRadioButton() {
        return cy.get('#gender-male');
    }

    femaleGenderRadioButton() {
        return cy.get('#gender-female');
    }

    nameInputField() {
        return cy.get('#FirstName');
    }

    lastNameInputField() {
        return cy.get('#LastName');
    }

    dateOfBirthDay() {
        return cy.get('[name="DateOfBirthDay"]');
    }

    dateOfBirthMonth() {
        return cy.get('[name="DateOfBirthMonth"]');
    }

    dateOfBirthYear() {
        return cy.get('[name="DateOfBirthYear"]');
    }

    emailInputField() {
        return cy.get('#Email');
    }

    streetAddressInputField() {
        return cy.get('#StreetAddress');
    }

    cityInputField() {
        return cy.get('[class="ui-autocomplete-input"]').eq(3);
    }

    postalCodeInputField() {
        return cy.get('[class="ui-autocomplete-input"]').eq(2);
    }

    phoneInputField() {
        return cy.get('#Phone');
    }

    passwordInputField() {
        return cy.get('#Password');
    }

    confirmPasswordInputField() {
        return cy.get('#ConfirmPassword');
    }

    registerButton() {
        return cy.get('#register-button');
    }

    successfulRegistrationMessage() {
        return cy.get('[class=result]');
    }

    errorMessageNameInputField() {
        return cy.get('[for=FirstName]span');
    }

    errorMessageLastNameInputField() {
        return cy.get('[for=LastName]span');
    }

    errorMessageEmailInputField() {
        return cy.get('[for=Email]span');
    }

    errorMessagePasswordInputField() {
        return cy.get('[for=Password]span')
    }

    errorMessageConfirmPasswordInputField() {
        return cy.get('[for=ConfirmPassword]span')
    }

    newsletterCheckbox() {
        return cy.get('#Newsletter');
    }

    countryDropdown() {
        return cy.get('#CountryId_dropdown');
    }

    emailLoginInputField() {
        return cy.get('#Email');
    }

    passwordLoginInputField() {
        return cy.get('#Password');
    }

    prijaviButton() {
        return cy.get('[value=Prijava]');
    }

    loggedInUser() {
        return cy.get('.user-registration > .header-small-menu');
    }

    // methods
    typeEmailLoginCredentials(uniqueEmail) {
        return this.emailLoginInputField().type(uniqueEmail);
    }

    typePasswordLoginCredentials(password) {
        return this.passwordLoginInputField().type(password);
    }

    typeNameInputField(name) {
        return this.nameInputField().type(name);
    }

    typeLastNameInputField(lastname) {
        return this.lastNameInputField().type(lastname);
    }

    typeEmailInputField(emailAlias) {
        return this.emailInputField().type(emailAlias);
    }

    typeEmailInputField(email) {
        return this.emailInputField().type(email);
    }

    typePassword(password) {
        return this.passwordInputField().type(password);
    }

    typeConfirmPassword(confirmPassword) {
        return this.confirmPasswordInputField().type(confirmPassword);
    }

    clickOnRegisterButton() {
        return this.registerButton().click();
    }

    successfulRegistrationIsDisplayed() {
        return this.successfulRegistrationMessage().should('be.visible');
    }

    nameErrorMessageIsDisplayed() {
        return this.errorMessageNameInputField()
            .should('be.visible')
            .and('have.text', 'Ime je potrebno');
    }

    lastNameErrorMessageIsDisplayed() {
        return this.errorMessageLastNameInputField()
            .should('be.visible')
            .and('have.text', 'Prezime je potrebno.');
    }

    emailErrorMessageIsDisplayed() {
        return this.errorMessageEmailInputField()
            .should('be.visible')
            .and('have.text', 'Elektronska pošta je potrebna');
    }

    passwordErrorMessageIsDisplayed() {
        return this.errorMessagePasswordInputField()
            .should('be.visible')
            .and('have.text', 'Lozinka je potrebna.');
    }

    confirmPasswordErrorMessageIsDisplayed() {
        return this.errorMessageConfirmPasswordInputField()
            .should('be.visible')
            .and('have.text', 'Lozinka je potrebna.');
    }

    selectGender(maleOrFemale) {
        switch (maleOrFemale) {
            case 'male':
                this.maleGenderRadioButton()
                    .check()
                    .should('be.checked');
                break;
            case 'female':
                this.femaleGenderRadioButton()
                    .check()
                    .should('be.checked');
                break;
            default:
                throw new Error(`${maleOrFemale} is not a valid option.`);
        }
    }

    selectDateOfBirthDay(day) {
        return this.dateOfBirthDay().select(day).should('have.value', day);
    }

    selectDateOfBirthMonth(month) {
        return this.dateOfBirthMonth().select(month).should('have.value', month);
    }

    selectDateOfBirthYear(year) {
        return this.dateOfBirthYear().select(year).should('have.value', year);
    }

    typeStreetAddress(street) {
        return this.streetAddressInputField()
            .type(street)
            .should('have.value', street);
    }

    typeCityName(city) {
        return this.cityInputField().click()
            .type(city)
            .should('have.value', city);
    }

    typePostalCode(postalCode) {
        return this.postalCodeInputField().click()
            .should('have.value', postalCode);
    }

    checkCountry(country) {
        return this.countryDropdown()
            .should('contain.text', country);
    }

    typePhoneNumber(phone) {
        return this.phoneInputField()
            .type(phone)
            .should('have.value', phone);
    }

    checkNewsletterCheckbox() {
        return this.newsletterCheckbox()
            .check()
            .should('be.checked');
    }

    notMatchingPasswordsErrorDisplayed() {
        return this.errorMessageConfirmPasswordInputField()
            .should('be.visible')
            .and('have.text', 'Lozinka i potvrda lozinke se ne podudaraju.')
    }

    passwordErrorMinimumCharactersIsDisplayed() {
        return this.errorMessagePasswordInputField()
            .should('be.visible')
            .and('have.text', 'Lozinka treba imati najmanje 6 znakova.')
    }

    clickOnPrijaviButton() {
        return this.prijaviButton().click()
    }

    verifyUserIsLoggedIn(uniqueEmail) {
        return this.loggedInUser().should('contain.text', uniqueEmail)
    }
}
