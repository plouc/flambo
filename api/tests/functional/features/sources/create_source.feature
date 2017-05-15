@sources @create
Feature: creating sources
  As an administrator, i want to be able to create sources

  Scenario: Creation requires authentication
    When I POST /api/v1/sources
    Then I should receive a 401 HTTP status code

  Scenario: Creation requires admin role
    Given I sign in with user janis@flambo.io:janis
    When  I POST /api/v1/sources
    Then  I should receive a 403 HTTP status code

  Scenario: Data should be validated
    Given I sign in with user raphael@flambo.io:raphel
    When  I POST /api/v1/sources
    Then  I should receive a 400 HTTP status code