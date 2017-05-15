@users @list
Feature: list sources
  As a user, i want to be able to list users

  Scenario: Users require authentication
    When I GET /api/v1/users
    Then I should receive a 401 HTTP status code

  Scenario: I fetch users
    Given I sign in with user raphael@flambo.io:raphael
    When  I GET /api/v1/users
    Then  I should receive a 200 HTTP status code
