Feature: Checkout Journey

  Scenario: Successful end-to-end purchase journey
    Given I am on the login page
    And I enter valid user credentials
    And I click the Sign In button
    Then I should see the products catalog page
    When I view details for "Product 2"
    And I add the item to the cart
    And I navigate to the cart page
    And I click the checkout button
    And I fill the shipping and payment details
    And I click the pay now button
    Then I should see an alert with message "Order placed successfully"

  Scenario: Checkout form displays validation errors for invalid input
    Given I am on the login page
    And I enter valid user credentials
    And I click the Sign In button
    Then I should see the products catalog page
    When I view details for "Product 2"
    And I add the item to the cart
    And I navigate to the cart page
    And I click the checkout button
    When I fill the shipping details with invalid data:
      | name | k  |
      | addr | lo |
      | card | 12  |
    And I click the pay now button
    Then I should see a validation error "Too small: expected string to have >=2 characters" for "name"
    And I should see a validation error "Too small: expected string to have >=5 characters" for "address"
    And I should see a validation error "Too small: expected string to have >=16 characters" for "card"
