Feature: Register functionality

    Scenario: User is able to register with mandatory input fields filled
        Given User navigates to "register" page
        And User types mandatory input fields
        And User types "valid without clicking on register button" password
        When User clicks on register button
        Then User is successfuly registered

    Scenario: User is able to register with all data provided
        Given User navigates to "register" page
        And User types mandatory input fields
        And User types "valid without clicking on register button" password
        And User select "male" gender radio button
        And User select date of birth: "26" "6" "1989"
        And User types city name input field: "BEOGRAD"
        And User verifies postal code input field: "11000"
        And User verifies country: "Serbia"
        And User types street address input field: "Cara Dusana 9"
        And User types phone number input field: "123212345"
        And User check Newsletter checkbox
        When User clicks on register button
        Then User is successfuly registered

    Scenario Outline: Verify if each mandatory input field is required
        Given User navigates to "register" page
        And User types mandatory input fields
        When User fills registration form without <mandatory> input field and error message is displayed
        Examples:
            | mandatory          |
            | "name"             |
            | "last name"        |
            | "email"            |
            | "password"         |
            | "confirm password" |

    Scenario Outline: Verify password complexity
        Given User navigates to "register" page
        And User types mandatory input fields
        When User types <password> password
        Examples:
            | password         |
            | "valid"          |
            | "5 characters"   |
            | "6 characters"   |
            | "32 characters"  |
            | "33 characters"  |
            | "not matching"   |
            | "blank password" |

    Scenario: User is able to register, verify email and login
        Given User navigates to "register" page
        And User types mandatory input fields
        And User types "valid without clicking on register button" password
        And User clicks on register button
        When User is successfuly registered
        Then User confirm email verification
        And User navigates to "login" page
        And User is able to login
        And Verify captcha checkbox
        When Click on login button
        Then User is logged in
