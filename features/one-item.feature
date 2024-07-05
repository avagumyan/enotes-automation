@enotes_one_item @enotes @clearBasket
Feature: One item to buy check
  Scenario: One item to buy check
    Given I open Enotes login page
    And I login to Shop using "test" account credentials
    And I fill 1 value in the count field of "Блокнот в точку" item
    And I click on the buy button of "Блокнот в точку" item
    Then The basket icon should display 1 items

    When I click on the basket icon
    Then I should see the following items in the basket dropdown
      |Блокнот в точку|- 400 р.|1|

    Then The total basket price should be the sum of the individual item prices

    When I click on the Go to basket button
    Then I should be navigated to the basket page