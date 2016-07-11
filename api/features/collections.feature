@collections
Feature: Collections
  As a user of the flambo API
  I want to be able to manipulate collections

  @list
  Scenario: Listing collections
    When  I GET /api/v1/collections
    Then  http status code should be 200

  @list
  Scenario: Sorting collections on invalid field
    Given I set query parameter sort to invalid
    When  I GET /api/v1/topics
    Then  http status code should be 400

  @get
  Scenario: Trying to get a collection with non existent id
    When I GET /api/v1/collections/non-existent
    Then  http status code should be 404
