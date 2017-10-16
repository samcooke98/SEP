Feature: TeamLeaderFunctions
    As a team leader,
    I want to be able to manage (delete) articles and comments,
    so that I can moderate my team discussion
    SEP-12

    Background: 
        Given I have an account called "sam" with a password of "sam"
            And I am logged in with "sam" and "sam"

    Scenario: Team leader can delete articles
        Given I am on the "/feed" page
            And a resource has been created
        Then I should be able to click on the "delete" button
            And that resource should be deleted

    Scenario: Team leader can delete comment
        Given I am on the "/resource/:resourceId/comments" page
            And a comment exists
            And I click on the "deleteComment" button
        Then the comment should not exist