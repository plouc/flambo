@groups @list
Feature: list groups
  As a user, i want to be able to list groups

  Scenario: Groups require authentication
    When I GET /api/v1/groups
    Then I should receive a 401 HTTP status code

  Scenario: I fetch groups
    Given I sign in with user raphael@flambo.io:raphael
    When  I GET /api/v1/groups
    Then  I should receive a 200 HTTP status code
