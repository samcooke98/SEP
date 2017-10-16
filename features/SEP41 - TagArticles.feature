Feature: Tag Articles
    As a user, 
    I want to be able to tag articles I post, 
    so that I can find them later
    SEP-41
    
    Background: 
        Given I have an account called "sam" with a password of "sam"
            And I am logged in with "sam" and "sam"

    Scenario: Add entry with tags
        Given I am on the "/feed" page
        When I click on "addEntry" button
            And I put "teamshare.herokuapp.com" in the field "url"
            And I put "teamshare" in the field "title"
            And I put "testTags" in the field "tags"
            And I put "testDesc" in the field "description"
            And I click "Admin Team"
        Then I should see no errors

   
    Scenario: Add entry without tags
        Given I am on the "/feed" page
        When I click on "addEntry" button
            And I put "teamshare.herokuapp.com" in the field "url"
            And I put "teamshare" in the field "title"
            And I put "testDesc" in the field "description"
            And I click "Admin Team"
        Then I should see no errors