Feature: Tag Articles
    As a user, 
    I want to receive notifications, 
    so that I can know when a user has added an article
    SEP-40
    
    Background: 
        Given I have an account called "sam" with a password of "sam"
            And I am logged in with "sam" and "sam"

    Scenario: Enable Notifications
        Given I am on the "/feed" page
        When I click on "userButton" button
            And I click on "notification" button
            And I click on "activeStatus" toggle
        Then I "activeStatus" toggle is "true"

    Scenario: Disable Notifications
        Given I am on the "/feed" page
            And "activeStatus" toggle is "true"
        When I click on "userButton" button
            And I click on "notification" button
            And I click on "activeStatus" toggle
        Then I "activeStatus" toggle is "false"

#   Manual Tests Only    
#    Scenario: See notification in desktop view
#        Given I am on the "/feed" page
#        When another user adds a new link "teamshare.herokuapp.com" to "Admin Team" feed
#        Then I should see an HTML5 notification from the desktop