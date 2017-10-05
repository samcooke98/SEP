Feature: Update Details
    As a visitor to the website, 
    I want to see a landing page, 
    So that I understand the value of the solution
    SEP-46

    Background:
        Given I have an account called "email@email.com" with a password of "test"

    Scenario: Change Email Only
        Given I am on the "/updateDetails" page
        When I put "test@test.com" in the field "email" 
        Then my account email should be "test@test.com"

    Scenario: Invalid Email 
        Given I am on the "/updateDetails" page
        When I put "notanEmail" in the field "email" 
        Then my account email should be "email@email.com"