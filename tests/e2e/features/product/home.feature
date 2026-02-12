Feature: Homepage

  Scenario: Homepage loads correctly
    Given I open the homepage
    Then I should see the header links
    And I should see featured categories
    And I should see the call to action
