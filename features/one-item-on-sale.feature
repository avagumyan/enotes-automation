@enotes_one_item @enotes
Feature: One item on sale check
  Scenario: One item on sale check
    Given I open Enotes login page
    And I login to Shop using "test" account credentials
    And I fill 1 value in the quantity field of "Игра престолов" item
    And I click on the buy button of "Игра престолов" item
    Then The basket icon should display 1 items

    When I click on the basket icon
    Then I should see the following items in the basket dropdown
    |Игра престолов|- 285 р.|1|

