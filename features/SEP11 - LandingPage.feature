Feature: Landing Page
    As a visitor to the website, 
    I want to see the a landing page
    so that I can understand the value of the solution
    SEP-11

    Background: 
        Given I am on the landing page

    Scenario: Click on Login
        Given I am on the landing page
        When I click on "Login"
        Then I should be redirected to "/login"
    
    Scenario: Click on Register
        Given I am on the landing page
        When I click on "Register"
        Then I should be redirected to "/register"