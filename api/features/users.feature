@sources
Feature: Users
  As a user of the flambo API
  I want to be able to manipulate users

  @list
  Scenario: Listing users
    When  I GET /api/v1/users
    Then  http status code should be 200

  @get
  Scenario: Trying to get a user with non existent id
    When I GET /api/v1/users/non-existent
    Then  http status code should be 404
