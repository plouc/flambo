@collections @create
Feature: creating collections
  As a user, i want to be able to create collections

  Scenario: Creation requires authentication
    When I POST /api/v1/collections
    Then I should receive a 401 HTTP status code

  Scenario: Data should be validated
    Given I sign in with user janis@flambo.io:janis
    When  I POST /api/v1/collections
    Then  I should receive a 400 HTTP status code

  Scenario: A user should be able to create a collection
    Given I sign in with user janis@flambo.io:janis
    And   I set request body
      | name | Janis test collection |
    When  I POST /api/v1/collections
    Then  I should receive a 201 HTTP status code

  Scenario: An admin should be able to create a collection
    Given I sign in with user raphael@flambo.io:raphael
    And   I set request body
      | name | Raphaël test collection |
    When  I POST /api/v1/collections
    Then  I should receive a 201 HTTP status code