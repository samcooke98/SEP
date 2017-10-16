Feature: Logout
    As a user, 
    I want to be able to log out, 
    so that I can exit the system
    SEP-18
    
    Background: 
        Given I have an account called "sam" with a password of "sam"
            And I am logged in with "sam" and "sam"

    Scenario: Logged Out Successfully
        Given I am on the "/feed" page
        When I click on "userButton" button
            And I click on "logout" button
        Then I should be redirected to the landing page

