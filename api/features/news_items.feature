@news_items
Feature: News items
  As a user of the flambo API
  I want to be able to manipulate news items

  @list
  Scenario: Listing news items
    When  I GET /api/v1/news_items
    Then  http status code should be 200
    And   X-Total header should exist
    And   X-Page header should exist
    And   X-Limit header should exist

  @list
  Scenario: Sorting news items on invalid field
    Given I set query parameter sort to invalid
    When  I GET /api/v1/news_items
    Then  http status code should be 400
