Feature: Delete 
    As a user, 
    I want to be able to delete links I've posted, 
    so that I can undo mistakes
    SEP-8
    
    Background: 
        Given I have an account called "sam" with a password of "sam"
            And I am logged in with "sam" and "sam"
            And there is a link "teamshare.herokuapp.com" created

    Scenario: Resource Exist to Delete
        Given I am on the "/feed" page
        Then the "deleteEntry" button should exist

    Scenario: Delete the resource
        Given I am on the "/feed" page
        When I click on "deleteEntry" button
        Then I should see no errors