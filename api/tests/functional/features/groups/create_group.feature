@groups @create
Feature: creating groups
  As an administrator, i want to be able to create groups

  Scenario: Creation requires authentication
    When I POST /api/v1/groups
    Then I should receive a 401 HTTP status code

  Scenario: Creation requires admin role
    Given I sign in with user janis@flambo.io:janis
    When  I POST /api/v1/groups
    Then  I should receive a 403 HTTP status code

  Scenario: Data should be validated
    Given I sign in with user raphael@flambo.io:raphel
    When  I POST /api/v1/groups
    Then  I should receive a 400 HTTP status code

#  Scenario: An admin should be able to create a group
#    Given I sign in with user raphael@flambo.io:raphael
#    And   I set request body
#      | name        | Raphaël test group                      |
#      | slug        | raphael-test-group                      |
#      | description | This is a group created during testing. |
#    When  I POST /api/v1/groups
#    Then  I should receive a 201 HTTP status code
