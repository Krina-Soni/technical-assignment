Feature: User Authentication

  Background:
    Given I am on the login page

  Scenario: Admin login stores correct role and token
    When I enter valid admin credentials
    And I click the Sign In button
    And I should see the products catalog page
    Then I should see a valid token in local storage
    And the stored user role should be "admin"
    And the header should NOT display Login

  Scenario: User login stores correct role and token
    When I enter valid user credentials
    And I click the Sign In button
    And I should see the products catalog page
    Then I should see a valid token in local storage
    And the stored user role should be "customer"
    And the header should NOT display Login

  Scenario: Login fails with invalid credentials
    When I enter invalid credentials
    And I click the Sign In button
    Then I should see an alert with message "Login failed"