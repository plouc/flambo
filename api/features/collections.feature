@collections
Feature: Collections
  As a user of the flambo API
  I want to be able to manipulate collections

  @list
  Scenario: Trying to list collections without being authenticated
    When I GET /api/v1/collections
    Then http status code should be 401

  @list
  Scenario: Listing collections
    Given I am authenticated as admin@flambo.io admin
    When  I GET /api/v1/collections
    Then  http status code should be 200

  @list
  Scenario: Sorting collections on invalid field
    Given I am authenticated as admin@flambo.io admin
    And   I set query parameter sort to invalid
    When  I GET /api/v1/topics
    Then  http status code should be 400

  @get
  Scenario: Trying to get a collection without being authenticated
    When  I GET /api/v1/collections/whatever
    Then  http status code should be 401

  @get
  Scenario: Trying to get a collection with non existent id
    Given I am authenticated as admin@flambo.io admin
    When  I GET /api/v1/collections/non-existent
    Then  http status code should be 404

  @get
  Scenario: Getting a collection
    Given I am authenticated as user2@flambo.io user
    And   I GET /api/v1/collections
    And   I pick 0.id from response body as collectionId
    And   I GET /api/v1/collections/:collectionId
    Then  http status code should be 200

  @get
  Scenario: Getting a collection from another user without being administrator
    Given I am authenticated as admin@flambo.io admin
    And   I GET /api/v1/collections
    And   I pick 0.id from response body as collectionId
    And   I am authenticated as user1@flambo.io user
    And   I GET /api/v1/collections/:collectionId
    Then  http status code should be 403

  @get
  Scenario: Getting a collection from another user being administrator
    Given I am authenticated as user2@flambo.io user
    And   I GET /api/v1/collections
    And   I pick 0.id from response body as collectionId
    And   I am authenticated as admin@flambo.io admin
    And   I GET /api/v1/collections/:collectionId
    Then  http status code should be 200