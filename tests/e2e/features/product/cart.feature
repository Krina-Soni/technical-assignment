Feature: Cart Management

  Background:
    Given I open the homepage
    And I click on the products link

  Scenario: Cart badge increments correctly for multiple different products
    When I view details for "Product 1"
    And I add the item to the cart
    And I click on the products link
    And I view details for "Product 2"
    And I add the item to the cart
    Then the cart badge count should be 2

  Scenario: Cart badge persists after page refresh
    When I view details for "Product 1"
    And I add the item to the cart
    Then the cart badge count should be 1
    When I refresh the page
    Then the cart badge count should be 1

  Scenario: Adding same product increases item quantity but not cart badge count
    When I view details for "Product 1"
    And I add the item to the cart
    Then the cart badge count should be 1
    And I click on the products link
    When I view details for "Product 1"
    And I add the item to the cart
    Then the cart badge count should be 1
    And I navigate to the cart page
    Then the product quantity in cart should be 2

  Scenario: Prevent adding out of stock items
    When I view details for a product with "Stock: 0"
    Then the Add to Cart button should be disabled

  Scenario: Prevent adding items exceeding available stock via repeated additions
    When I view details for a product with "Stock: 2"
    And I add the item to the cart 2 times successfully
    And I attempt to add the item again but expect "Insufficient stock" dialog
