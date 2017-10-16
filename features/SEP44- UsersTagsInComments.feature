Feature: UsersTagsInComments
    As a user,
    I want to be able to tag other users when I comment,
    so that they receive a notifications 
    SEP-44

    Background: 
        Given I have an account called "sam" with a password of "sam"
            And I am logged in with "sam" and "sam"
            And I have a team member "josh" in the team

    Scenario: Tag a user
        Given I am on the "/resource/:resourceId/comments" page
        When I put "@josh" in the field "comment"
            And I click  on the "Comment" the button
        Then I should see a comment display on the page

    Scenario: User gets notified when a user in the team tags the user
        Given I am on the "/feed" page
        When I click on "userButton" button
            And I click on "notificaitons" button
        Then I should be redirected to "/notifications"
            And I should see a "notificaiton"