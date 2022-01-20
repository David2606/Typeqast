import { Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import RegisterPage from '../../../support/pageObjects/registerPage';

const baseUrl = Cypress.env('baseUrl');
const registerPage = new RegisterPage();
let exampleData;
let register;
let name;
let lastName;
let email;
let password;
let uniqueEmail;
let mailbox;
let login;

before(() => {
    cy.fixture('example').then(data => {
        exampleData = data;
        register = exampleData.urlPaths.register;
        name = exampleData.credentails.name
        lastName = exampleData.credentails.lastName
        email = exampleData.credentails.email
        password = exampleData.credentails.password
        login = exampleData.urlPaths.login
    });
});

beforeEach(() => {
    uniqueEmail = `zavidaqbr+${Date.now()}@test.fbl.zone`;
    mailbox = `zavidaqbr+${Date.now()}`;
});

Given('User navigates to {string} page', page => {
    switch (page) {
        case 'register':
            cy.visit(baseUrl + register, { failOnStatusCode: false });
            break;
        case 'login':
            cy.visit(baseUrl + login, { failOnStatusCode: false });
            break;
        default:
            throw new Error(`Page you typed does not exist.`);
    }
});

And('User types mandatory input fields', () => {
    registerPage.typeNameInputField(name);
    registerPage.typeLastNameInputField(lastName);
    registerPage.typeEmailInputField(uniqueEmail);
});

And('User select {string} gender radio button', maleOrFemale => {
    registerPage.selectGender(maleOrFemale);
});

And('User select date of birth: {string} {string} {string}', (day, month, year) => {
    registerPage.selectDateOfBirthDay(day);
    registerPage.selectDateOfBirthMonth(month);
    registerPage.selectDateOfBirthYear(year);
});

And('User types street address input field: {string}', address => {
    registerPage.typeStreetAddress(address);
});

And('User types city name input field: {string}', city => {
    registerPage.typeCityName(city);
});

And('User verifies postal code input field: {string}', postalCode => {
    registerPage.typePostalCode(postalCode);
});

And('User types phone number input field: {string}', phone => {
    registerPage.typePhoneNumber(phone);
});

And('User verifies country: {string}', country => {
    registerPage.checkCountry(country);
});

And('User check Newsletter checkbox', () => {
    registerPage.checkNewsletterCheckbox();
});

And('User clicks on register button', () => {
    registerPage.clickOnRegisterButton();
});

And('User is successfuly registered', () => {
    registerPage.successfulRegistrationIsDisplayed();
});

And('User is able to login', () => {
    registerPage.typeEmailLoginCredentials(uniqueEmail);
    registerPage.typePasswordLoginCredentials(password);
});

And('Verify captcha checkbox', () => {
    cy.frameLoaded('[title=reCAPTCHA]')
    cy.iframe('[title=reCAPTCHA]').find('#recaptcha-anchor').click()
    cy.wait(5000)
});

And('Click on login button', () => {
    registerPage.clickOnPrijaviButton()
});

And('User is logged in', () => {
    registerPage.verifyUserIsLoggedIn(uniqueEmail)
});

And('User confirm email verification', () => {
    cy.wait(30000)
    cy.request({
        method: "GET",
        url: "https://m.d1.fbl.zone/api/v1/mailbox/" + mailbox,
        auth: {
            user: "qamail",
            pass: "Varikina.5",
        },
    }).then((response) => {
        let lastMail = response.body.pop()
        // var eid = response.body[0].id;
        var eid = lastMail.id;
        // console.log(eid);
        cy.request({
            method: "GET",
            url: "https://m.d1.fbl.zone/api/v1/mailbox/" + mailbox + "/" + eid,
            auth: {
                user: "qamail",
                pass: "Varikina.5",
            },
        }).then((responseemail) => {
            const actlink = responseemail.body.body.text;
            var ext = actlink.match(/(https?:\/\/[^\s]+)+fbl.zone/g).toString()
            cy.visit(ext)
            cy.get(".result").should("contain.text", "Vaš račun je aktiviran")
        });
    });
})


And('User fills registration form without {string} input field and error message is displayed', mandatoryInputField => {
    switch (mandatoryInputField) {
        case 'name':
            registerPage.nameInputField().clear();
            registerPage.clickOnRegisterButton();
            registerPage.nameErrorMessageIsDisplayed();
            break;
        case 'last name':
            registerPage.lastNameInputField().clear();
            registerPage.clickOnRegisterButton();
            registerPage.lastNameErrorMessageIsDisplayed();
            break;
        case 'email':
            registerPage.emailInputField().clear();
            registerPage.clickOnRegisterButton();
            registerPage.emailErrorMessageIsDisplayed();
            break;
        case 'password':
            registerPage.confirmPasswordInputField().clear();
            registerPage.passwordInputField().clear();
            registerPage.clickOnRegisterButton();
            registerPage.passwordErrorMessageIsDisplayed();
            break;
        case 'confirm password':
            registerPage.confirmPasswordInputField().clear();
            registerPage.clickOnRegisterButton();
            registerPage.confirmPasswordErrorMessageIsDisplayed();
            break;
        default:
            throw new Error(`Mandatory input field you typed does not exist.`);
    }
});

When('User types {string} password', credentialsInfo => {
    switch (credentialsInfo) {
        case 'valid without clicking on register button':
            registerPage.passwordInputField().type(password)
            registerPage.confirmPasswordInputField().type(password)
            break;
        case 'valid':
            registerPage.passwordInputField().type(password)
            registerPage.confirmPasswordInputField().type(password)
            registerPage.clickOnRegisterButton();
            registerPage.successfulRegistrationIsDisplayed();
            break;
        case '5 characters':
            registerPage.passwordInputField().type('12345')
            registerPage.confirmPasswordInputField().type('12345')
            registerPage.clickOnRegisterButton();
            registerPage.passwordErrorMinimumCharactersIsDisplayed();
            break;
        case '6 characters':
            registerPage.passwordInputField().type('123456')
            registerPage.confirmPasswordInputField().type('123456')
            registerPage.clickOnRegisterButton();
            registerPage.successfulRegistrationIsDisplayed();
            break;
        case '32 characters':
            registerPage.passwordInputField().type('12345123451234512345123451234512')
            registerPage.confirmPasswordInputField().type('12345123451234512345123451234512')
            registerPage.clickOnRegisterButton();
            registerPage.successfulRegistrationIsDisplayed();
            break;
        case '33 characters':
            registerPage.passwordInputField().type('123451234512345123451234512345123')
            registerPage.confirmPasswordInputField().type('123451234512345123451234512345123')
            registerPage.clickOnRegisterButton();
            registerPage.successfulRegistrationIsDisplayed();
            break;
        case 'not matching':
            registerPage.passwordInputField().type('1234565')
            registerPage.confirmPasswordInputField().type('123456')
            registerPage.clickOnRegisterButton();
            registerPage.notMatchingPasswordsErrorDisplayed();
            break;
        case 'blank password':
            registerPage.clickOnRegisterButton();
            registerPage.passwordErrorMessageIsDisplayed();
            break;
        default:
            throw new Error(`Password provided is not valid.`);
    }

});


