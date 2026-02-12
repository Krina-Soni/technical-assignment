Feature: Product Search

  Background:
    Given I open the homepage
    And I click on the products link

  Scenario: Search filters products by name correctly
    When I search for "Cheap Pin"
    Then I should see only products containing "Cheap Pin"
    And the product count should be 1

  Scenario: Search for non-existent product
    When I search for "laptop"
    And the product count should be 0
