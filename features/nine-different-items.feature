@enotes_nine_different_items @enotes @clearBasket @addSaledItemInBasket
  #One item on sale will be added in basket via api
Feature: Nine items on sale to buy check
  Scenario: Nine items on sale to buy check
    Given I open Enotes login page
    And I login to Shop using "test" account credentials
    And I fill 1 value in the count field of "Творческий беспорядок" item
    And I click on the buy button of "Творческий беспорядок" item
    And I fill 1 value in the count field of "Блокнот в точку" item
    And I click on the buy button of "Блокнот в точку" item
    And I fill 1 value in the count field of "Кошечка Мари" item
    And I click on the buy button of "Кошечка Мари" item
    And I fill 1 value in the count field of "Нотная тетрадь" item
    And I click on the buy button of "Нотная тетрадь" item
    And I fill 1 value in the count field of "Black&Red" item
    And I click on the buy button of "Black&Red" item
    And I fill 1 value in the count field of "Гусь. Дедлайн" item
    And I click on the buy button of "Гусь. Дедлайн" item
    And I fill 1 value in the count field of "Художник" item
    And I click on the buy button of "Художник" item
    And I go to 2 page
    And I fill 1 value in the count field of "Little Red Riding Hood" item
    And I click on the buy button of "Little Red Riding Hood" item
    Then The basket icon should display 9 items

    Then I should see the following items in the basket dropdown
      |Игра престолов|- 285 р.|1|
      |Творческий беспорядок|- 400 р.|1|
      |Блокнот в точку|- 400 р.|1|
      |Кошечка Мари|- 442 р.|1|
      |Нотная тетрадь|- 499 р.|1|
      |Black&Red|- 315 р.|1|
      |Гусь. Дедлайн|- 750 р.|1|
      |Художник|- 420 р.|1|
      |Little Red Riding Hood|- 399 р.|1|

    Then The total basket price should be the sum of the individual item prices

    When I click on the Go to basket button
    Then I should be navigated to the basket page

