Feature: Update Details
    As a visitor to the website, 
    I want to see a landing page, 
    So that I understand the value of the solution
    SEP-46

    Background:
        Given I have an account called "email@email.com" with a password of "test"
            And I am logged in with "email@email.com" and "test"

    Scenario: Change Email Only
        Given I am on the "/updateDetails" page
        When I put "test@test.com" in the field "email"
            And I put "test" in the field "newPassword"
            And I put "test" in the field "confirmNewPassword"
            And I submit the form 
        Then I should see no errors
    
    Scenario: Password Mismatch
        Given I am on the "/updateDetails" page
        When I put "test@test.com" in the field "email"
            And I put "test" in the field "newPassword"
            And I put "notTest" in the field "confirmNewPassword"
            And I submit the form 
        Then I should see an error

#    Scenario: Invalid Email 
#        Given I am on the "/updateDetails" page
#        When I put "notanEmail" in the field "email" 
#            And I submit the form
#        Then I should see an error
    
