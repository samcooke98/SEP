Feature: Comment
    As a user
    I want to be able to comment on links
    so that I can share insights with my team
    SEP-9

    Background: 
        Given I have an account called "sam" with a password of "sam"
            And I am logged in with "sam" and "sam"

    Scenario: User can create a comment
        Given I am on the "/resource/:resourceId/comments" page
            And I put "hello world" in the field "comment"
            And I click on the "comment" button
        Then the comment should exist

    Scenario: User can't create a comment if the comment field is empty
        Given I am on the "/resource/:resourceId/comments" page
            And I put "" in the field "comment"
            And I click on the "comment" button
        Then the comment should not exist  

    Scenario: User can navigate to the comment 
        Given I am on the "/feed" page
            And I click on the "comment" button
        Then I should be redirected to the "/resource/:resourceId/comment" page