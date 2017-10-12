Feature: Registration
    As a future team leader, 
    I want to create an account and team with the system, 
    so that I can share articles with my teams 

    Scenario: Correct Information
        Given I am on the "/register" page
        When I put "sam_cooke@outlook.com" in the field "email"
            And I put "Sam" in the field "password"
            And I put "Sam" in the field "passwordConfirm" 
            And I put "Sam" in the field "firstname"
            And I put "Cooke" in the field "lastname"
            And I put "TeamTen" in the field "teamname"
            And I put "Team Ten Test" in the field "teamdesc" 
            And I put "Business" in the field "teamcategory"
            And I submit the form
        Then I should see no errors

    Scenario: Existing Email
        Given I am on the "/register" page
            And I have an account called "sam_cookeoutlook.com" with a password of "sam"
        When I put "sam_cookeoutlook.com" in the field "email"
            And I put "Sam" in the field "password"
            And I put "Sam" in the field "passwordConfirm" 
            And I put "Sam" in the field "firstname"
            And I put "Cooke" in the field "lastname"
            And I put "TeamTen" in the field "teamname"
            And I put "Team Ten Test" in the field "teamdesc" 
            And I put "Business" in the field "teamcategory"
            And I submit the form
        Then I should see "A user with the given username is already registered" 

    Scenario: Password Mistype
        Given I am on the "/register" page
        When I put "sam_cooke@outlook.com" in the field "email"
            And I put "Sam" in the field "password"
            And I put "SamC" in the field "passwordConfirm" 
            And I put "Sam" in the field "firstname"
            And I put "Cooke" in the field "lastname"
            And I put "TeamTen" in the field "teamname"
            And I put "Team Ten Test" in the field "teamdesc" 
            And I put "Business" in the field "teamcategory"
            And I submit the form
        Then I should see an error 

    # Scenario: Invalid Email
    #     Given I am on the "/register" page
    #     When I put "sam_cooke" in the field "email"
    #         And I put "Sam" in the field "password"
    #         And I put "Sam" in the field "passwordConfirm" 
    #         And I put "Sam" in the field "firstname"
    #         And I put "Cooke" in the field "lastname"
    #         And I put "TeamTen" in the field "teamname"
    #         And I put "Team Ten Test" in the field "teamdesc" 
    #         And I put "Business" in the field "teamcategory"
    #         And I submit the form
    #     Then I should see "invalid email" 
