@login
Feature: Login
  As a user of the flambo API
  I want to be able to login

  Scenario: Trying to login without providing credentials
    When I POST /api/v1/users/token
    Then http status code should be 400

  Scenario: Trying to login with invalid email
    Given I set request json to
      | email    | invalid@invalid.com |
      | password | whatever            |
    And   I POST /api/v1/users/token
    Then  http status code should be 401

  Scenario: Trying to login with invalid password
    Given I set request json to
      | email    | user1@flambo.io |
      | password | invalid         |
    And   I POST /api/v1/users/token
    Then  http status code should be 401

  Scenario: Trying to login with invalid password more than 3 times
    Given I set request json to
      | email    | locked@flambo.io |
      | password | invalid          |
    And   I POST /api/v1/users/token 3 times
    And   I set request json to
      | email    | locked@flambo.io |
      | password | admin            |
    And   I POST /api/v1/users/token
    Then  http status code should be 401
