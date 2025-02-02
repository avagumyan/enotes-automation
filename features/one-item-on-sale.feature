@enotes_one_item_on_sale @enotes @clearBasket
Feature: One item on sale to buy check
  Scenario: One item on sale to buy check
    Given I open Enotes login page
    And I login to Shop using "test" account credentials
    And I fill 1 value in the count field of "Игра престолов" item
    And I click on the buy button of "Игра престолов" item
    Then The basket icon should display 1 items

    When I click on the basket icon
    Then I should see the following items in the basket dropdown
    |Игра престолов|- 285 р.|1|

    Then The total basket price should be the sum of the individual item prices

    When I click on the Go to basket button
    Then I should be navigated to the basket page


