Feature: Upload Avatar
    As a user, 
    I want to be able to upload my own avatar, 
    so that I can represent myself
    SEP-46


    Scenario: Upload Avatar Successfully
        Given I am on the "/register" page
        When I put "test@email.com" in the field "email"
            And I click on "file-input" input
            And I choose "test.jpg" image
            And I click on "upload" button
        Then I should see no errors
    
    Scenario: Upload Avatar Failed
        Given I am on the "/register" page
        When I put "test@email.com" in the field "email"
            And I click on "file-input" input
            And I choose "test.txt" image
            And I click on "upload" button
        Then I should see an error

    Scenario: Choose Default Avatars
        Given I am on the "/register" page
        When I put "test@email.com" in the field "email"
            And I click on "avatarDefault" button
            And I put "Sam" in the field "password"
            And I put "Sam" in the field "passwordConfirm" 
            And I put "Sam" in the field "firstname"
            And I put "Cooke" in the field "lastname"
            And I put "TeamTen" in the field "teamname"
            And I put "Team Ten Test" in the field "teamdesc" 
            And I put "Business" in the field "teamcategory"
            And I submit the form
        Then I should see an error

    
