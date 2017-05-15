@collections @list
Feature: list collections
  As a user, i want to be able to list collections

  Scenario: Collections require authentication
    When I GET /api/v1/collections
    Then I should receive a 401 HTTP status code

  Scenario: I fetch collections
    Given I sign in with user raphael@flambo.io:raphael
    When  I GET /api/v1/collections
    Then  I should receive a 200 HTTP status code
