@topics
Feature: Topics
  As a user of the flambo API
  I want to be able to manipulate topics

  @list
  Scenario: Trying to list topics without being authenticated
    When I GET /api/v1/topics
    Then http status code should be 401

  @list
  Scenario: Listing topics
    Given I am authenticated as admin@flambo.io admin
    When  I GET /api/v1/topics
    Then  http status code should be 200

  @list
  Scenario: Sorting topics on invalid field
    Given I am authenticated as admin@flambo.io admin
    Given I set query parameter sort to invalid
    When  I GET /api/v1/topics
    Then  http status code should be 400

  @get
  Scenario: Trying to get a topic without being authenticated
    When  I GET /api/v1/topics/whatever
    Then  http status code should be 401

  @get
  Scenario: Trying to get a topic with non existent id
    Given I am authenticated as admin@flambo.io admin
    When  I GET /api/v1/topics/non-existent
    Then  http status code should be 404

  @create
  Scenario: Trying to create a topic without being authenticated
    When  I POST /api/v1/topics
    Then  http status code should be 401

  @create
  Scenario: Trying to create a topic without being administrator
    Given I am authenticated as user1@flambo.io user
    And   I set request json to
      | name        | test topic             |
      | description | test topic description |
    When  I POST /api/v1/topics
    Then  http status code should be 403

  @create
  Scenario: Creating a new topic
    Given I am authenticated as admin@flambo.io admin
    And   I set request json to
      | name        | test topic             |
      | description | test topic description |
    When  I POST /api/v1/topics
    Then  http status code should be 201

  @create
  Scenario: Creating a new topic without required properties
    Given I am authenticated as admin@flambo.io admin
    When  I POST /api/v1/topics
    Then  http status code should be 400
    And   response body should contain path errors
    And   response body value of errors.0.path should be name
    And   response body value of errors.0.type should be any.required
    And   response body value of errors.1.path should be description
    And   response body value of errors.1.type should be any.required

  @delete
  Scenario: Deleting a topic without being authenticated
    Given I am authenticated as user1@flambo.io user
    And   I GET /api/v1/topics
    And   I pick 0.id from response body as topicId
    And   I am not authenticated
    And   I DELETE /api/v1/topics/:topicId
    Then  http status code should be 401

  @delete
  Scenario: Deleting a topic without being administrator
    Given I am authenticated as admin@flambo.io admin
    And   I set request json to
      | name        | test topic             |
      | description | test topic description |
    And   I POST /api/v1/topics
    And   I pick id from response body as topicId
    And   I am authenticated as user1@flambo.io user
    When  I DELETE /api/v1/topics/:topicId
    Then  http status code should be 403
