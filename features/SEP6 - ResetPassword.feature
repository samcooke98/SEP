Feature: Reset Password
    As a user, 
    I want to be able to reset my password, 
    so that I can recover my account
    SEP6

    Background: 
        Given I have an account called "sam_cooke@outlook.com" with a password of "sam"

    Scenario: Reset Password Completed
        Given I am on the "/resetpassword" page
        When I put "sam_cooke@outlook.com" in the field "email"
            And I submit the form
        Then I should see "Success"

    