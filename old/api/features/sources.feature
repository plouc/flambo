@sources
Feature: Sources
  As a user of the flambo API
  I want to be able to manipulate sources

  @list
  Scenario: Trying to list sources without being authenticated
    When I GET /api/v1/sources
    Then http status code should be 401

  @list
  Scenario: Listing sources
    Given I am authenticated as admin@flambo.io admin
    When  I GET /api/v1/sources
    Then  http status code should be 200

  @list
  Scenario: Sorting sources on invalid field
    Given I am authenticated as admin@flambo.io admin
    Given I set query parameter sort to invalid
    When  I GET /api/v1/sources
    Then  http status code should be 400

  @get
  Scenario: Trying to get a source without being authenticated
    When  I GET /api/v1/sources/whatever
    Then  http status code should be 401

  @get
  Scenario: Trying to get a source with non existent id
    Given I am authenticated as admin@flambo.io admin
    When  I GET /api/v1/sources/non-existent
    Then  http status code should be 404

  @get
  Scenario: Getting a source
    Given I am authenticated as user2@flambo.io user
    And   I GET /api/v1/sources
    And   I pick 0.id from response body as sourceId
    And   I GET /api/v1/sources/:sourceId
    Then  http status code should be 200

  @create
  Scenario: Creating a new source without being authenticated
    When  I POST /api/v1/sources
    Then  http status code should be 401

  @create
  Scenario: Creating a new source without being administrator
    Given I am authenticated as user2@flambo.io user
    And   I set request json to
      | name      | test source |
      | type      | twitter     |
      | data.user | raph        |
    When  I POST /api/v1/sources
    Then  http status code should be 403

  @create
  Scenario: Creating a new source
    Given I am authenticated as admin@flambo.io admin
    And   I set request json to
      | name      | test source |
      | type      | twitter     |
      | data.user | raph        |
    When  I POST /api/v1/sources
    Then  http status code should be 201
    And   response body should contain path id
    And   response body should contain path userId
    And   response body should contain path createdAt
    And   response body value of name should be test source
    And   response body value of type should be twitter
    And   response body value of data.user should be raph

  @create
  Scenario: Creating a new source without required properties
    Given I am authenticated as admin@flambo.io admin
    When  I POST /api/v1/sources
    Then  http status code should be 400
    And   response body should contain path errors
    And   response body value of errors.0.path should be name
    And   response body value of errors.0.type should be any.required
    And   response body value of errors.1.path should be type
    And   response body value of errors.1.type should be any.required
    And   response body value of errors.2.path should be data
    And   response body value of errors.2.type should be any.required
