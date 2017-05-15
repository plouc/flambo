@sources @list
Feature: list sources
  As a user, i want to be able to list sources

  Scenario: Sources require authentication
    When I GET /api/v1/sources
    Then I should receive a 401 HTTP status code

  Scenario: I fetch sources
    Given I sign in with user raphael@flambo.io:raphael
    When  I GET /api/v1/sources
    Then  I should receive a 200 HTTP status code
