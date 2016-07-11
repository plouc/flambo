@topics
Feature: Topics
  As a user of the flambo API
  I want to be able to manipulate topics

  @list
  Scenario: Listing topics
    When  I GET /api/v1/topics
    Then  http status code should be 200

  @list
  Scenario: Sorting topics on invalid field
    Given I set query parameter sort to invalid
    When  I GET /api/v1/topics
    Then  http status code should be 400

  @get
  Scenario: Trying to get a topic with non existent id
    When I GET /api/v1/topics/non-existent
    Then  http status code should be 404

  @create
  Scenario: Creating a new topic
    Given I set request json to
      | name        | test topic             |
      | description | test topic description |
    When  I POST /api/v1/topics
    Then  http status code should be 201

  @create
  Scenario: Creating a new topic without name
    When  I POST /api/v1/topics
    Then  http status code should be 400
