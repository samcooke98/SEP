Feature: NotificaitonCentre
    As a user
    I want a centralised notification center
    so that I am aware of relevant updates for me
    SEP-71

    Background:
        Given I have an account called "sam" with a password of "sam"
            And I am logged in with "sam" and "sam"
            And I have a team member "josh" in the team

    Scenario: User can view their notifications
        Given I am on the "/feed" page
        When I click on "userButton" button
            And I click on "notificaitons" button
        Then I should be redirected to "/notifications"
            And I should see a "notificaiton"
    
    Scenario: User can navigate to the notificaiton centre
       Given I am on the "/feed" page
        When I click on "userButton" button
            And I click on "notificaitons" button
        Then I should be redirected to "/notifications"