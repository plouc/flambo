@users
Feature: Users
  As a user of the flambo API
  I want to be able to manipulate users

  @list
  Scenario: Trying to list users without being authenticated
    When I GET /api/v1/users
    Then http status code should be 401

  @list
  Scenario: Trying to list users without being administrator
    Given I am authenticated as user1@flambo.io user
    When I GET /api/v1/users
    Then http status code should be 403

  @list
  Scenario: Listing users
    Given I am authenticated as admin@flambo.io admin
    When  I GET /api/v1/users
    Then  http status code should be 200

  @get
  Scenario: Trying to get a user without being authenticated
    When  I GET /api/v1/users/whatever
    Then  http status code should be 401

  @get
  Scenario: Trying to get a user with non existent id
    Given I am authenticated as admin@flambo.io admin
    When  I GET /api/v1/users/non-existent
    Then  http status code should be 404

  @get
  Scenario: Getting a user profile as administrator
    Given I am authenticated as admin@flambo.io admin
    And   I GET /api/v1/users
    And   I pick 0.id from response body as userId
    When  I GET /api/v1/users/:userId
    Then  http status code should be 200

  @get
  Scenario: Getting current connected user profile
    Given I am authenticated as user1@flambo.io user
    When  I GET /api/v1/users/me
    Then  http status code should be 200
    And   response body value of email should be user1@flambo.io