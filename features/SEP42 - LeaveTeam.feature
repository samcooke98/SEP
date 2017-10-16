Feature: Leave Team
    As a user, 
    I want to be able to leave a team, 
    so that I can keep my teams up-to-date.
    SEP-46

    Background:
        Given I have an account called "test@email.com" with a password of "test"
            And I am logged in with "test@email.com" and "test" 
            And I have sent an inivation to test2@email.com"

    Scenario: Leave Team as Team Leader
        Given I am on the "/feed" page
        When I click on "Admin Team"
            And I click on "teamOptions" button
            And I click on "editMembers" button
            And I click on "remove" button 
        Then I should see an error
    
    Scenario: Leave Team as Member
        Given I am on the "/feed" page
        When I click on "Admin Team"
            And I click on "teamOptions" button
            And I click on "leaveTeam" button
        Then I should see no errors

    
