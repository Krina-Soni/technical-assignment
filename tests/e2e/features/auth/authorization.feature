Feature: Role-Based Access Control

  Scenario: Admin can access admin dashboard
    Given I am on the login page
    And I enter valid admin credentials
    And I click the Sign In button
    And I should see the products catalog page
    When I navigate directly to "/admin"
    Then I should be allowed to see the "Admin Dashboard"

  Scenario: User cannot access admin dashboard
    Given I am on the login page
    And I enter valid user credentials
    And I click the Sign In button
    And I should see the products catalog page
    When I navigate directly to "/admin"
    Then I should NOT see the "Admin Dashboard"

  Scenario: Anonymous user cannot access admin dashboard
    Given I open the homepage
    And I am not logged in
    When I navigate directly to "/admin"
    Then I should NOT see the "Admin Dashboard"