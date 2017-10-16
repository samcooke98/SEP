Feature: Remove Users from Team
    As a team leader, 
    I want to be able to remove users from my team, 
    so that I can control who access my article feed
    SEP-46

    Background:
        Given I have an account called "test@email.com" with a password of "test"
            And I am logged in with "test@email.com" and "test" 
            And there is another user "test2@email.com" in "Admin Team"

    Scenario: Remove user as admin
        Given I am on the "/feed" page
        When I click on "Admin Team"
            And I click on "teamOptions" button
            And I click on "editMembers" button
            And I click on second "remove" button 
        Then I should see no errors
    
    Scenario: Remove user as a user
        Given I am on the "/feed" page
        When I click on "Admin Team"
            And I click on "teamOptions" button
        Then I should not see "editMembers" button

    
