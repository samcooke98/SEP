Feature: Login
    As a user, 
    I want to be able to login 
    so that I can access the system
    SEP-17

    Background: 
        Given I have an account called "sam" with a password of "sam"

    Scenario: Correct Information
        Given I am on the "/login" page
        When I put "sam" in the field "email"
            And I put "sam" in the field "password"
            And I submit the form
        Then I should be redirected to "/feed"

    Scenario: Incorrect Information
        Given I am on the "/login" page
        When I put "sam" in the field "email"
            And I put "samc" in the field "password"
            And I submit the form
        Then I should be redirected to "/login"