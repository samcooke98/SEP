Feature: CreateResource
    As a user,
    I want to be able to post links to a team,
    so that I can share them with the other members
    SEP7

    Background: 
        Given I have an account called "sam_cooke@outlook.com" with a password of "sam"
            And I am logged in with "sam" and "sam"

    Scenario: User can create post a link
        Given I am on the "/feed" page
        When I click on "CreateNewEntry" button
            And I put "nine.com.au" in the field "URL"
            And I put "nine" in the field "title"
            And I put "media" in the field "tags"
            And I put "the new ninemsn" in the filed "description"
            And I click on "Admin Team"
        Then a resource should exist
    
    Scenario: User can create a post link on multiple channels the user is subscribed to.
        Given I am on the "/feed" page
        When I click on "CreateNewEntry" button
            And I put "nine.com.au" in the field "URL"
            And I put "nine" in the field "title"
            And I put "media" in the field "tags"
            And I put "the new ninemsn" in the filed "description"
            And I click on "Admin Team"
            And I click on "Admin Team"
        Then a resource should exist on both teams 

    Scenario: User can't create a resource without a URL
        Given I am on the "/feed" page
        When I click on "CreateNewEntry" button
            And I put "nine" in the field "title"
            And I put "media" in the field "tags"
            And I put "the new ninemsn" in the filed "description"
            And I click on "Admin Team"
            And I click on "Admin Team"
        Then I should see "A resource requires a URL to be created"
           
    