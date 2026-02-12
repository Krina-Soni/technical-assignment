Feature: Session Management

  Scenario: Session is maintained upon page refresh
    Given I am on the login page
    When I enter valid admin credentials
    And I click the Sign In button
    And I should see the products catalog page
    Then I should see a valid token in local storage
    And the stored user role should be "admin"
    When I refresh the page
    Then I should see a valid token in local storage
    And the stored user role should be "admin"
    And the header should NOT display Login
