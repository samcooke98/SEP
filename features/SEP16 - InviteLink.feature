Feature: Login
    As a new user,
    I want to be able to click on a invite link
    so that I can join a team
    SEP-16

    Background: 
        Given I have an account called "sam" with a password of "sam"
            And I am logged in with "sam" and "sam"

    Scenario: Correct Information
        Given I am on the "/feed" page
        When I click on "Admin Team"
            And I click on "inviteUser" button
            And I put "john@smith.com" in the field "email"
            And I click on "sendInvite" button 
        Then I should see no errors

    
    Scenario: Incorrect Information
        Given I am on the "/feed" page
        When I click on "Admin Team"
            And I click on "inviteUser" button
            And I put "john@smith" in the field "email"
            And I click on "sendInvite" button 
        Then I should see an error