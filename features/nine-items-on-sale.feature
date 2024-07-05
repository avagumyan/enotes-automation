@enotes_nine_items_on_sale @enotes @clearBasket
Feature: Nine items on sale to buy check
  Scenario: Nine items on sale to buy check
    Given I open Enotes login page
    And I login to Shop using "test" account credentials
    And I fill 9 value in the count field of "Игра престолов" item
    And I click on the buy button of "Игра престолов" item
    Then The basket icon should display 9 items

    When I click on the basket icon
    Then I should see the following items in the basket dropdown
      |Игра престолов|- 285 р.|9|

    Then The total basket price should be the sum of the individual item prices

    When I click on the Go to basket button
    Then I should be navigated to the basket page