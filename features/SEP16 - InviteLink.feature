Feature: Login
    As a new user,
    I want to be able to click on a invite link
    so that I can join a team
    SEP-16

    Background: 
        Given I have an account called "sam" with a password of "sam"
            And I am logged in with "sam" and "sam"

    Scenario: Invitations Sent
        Given I am on the "/manage" page
        When I put "sam@samcooke.com.au" in the field "email"
            And I submit the form
        Then I should see no errors

    Scenario: Invitations Not Sent
        Given I am on the "/manage" page
        When I put "sam" in the field "email"
            And I submit the form
        Then I should see an error