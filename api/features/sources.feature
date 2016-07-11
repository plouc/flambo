@sources
Feature: Sources
  As a user of the flambo API
  I want to be able to manipulate sources

  @list
  Scenario: Listing sources
    When  I GET /api/v1/sources
    Then  http status code should be 200

  @list
  Scenario: Sorting sources on invalid field
    Given I set query parameter sort to invalid
    When  I GET /api/v1/sources
    Then  http status code should be 400

  @get
  Scenario: Trying to get a source with non existent id
    When I GET /api/v1/sources/non-existent
    Then  http status code should be 404

  @create
  Scenario: Creating a new source
    Given I set request json to
      | name      | test source |
      | type      | twitter     |
      | data.user | raph        |
    When  I POST /api/v1/sources
    Then  http status code should be 201

  @create
  Scenario: Creating a new source without required properties
    When  I POST /api/v1/sources
    Then  http status code should be 400
