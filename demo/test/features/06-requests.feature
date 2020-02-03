Feature: VI. Requests

  Background:
    Given I have a screen that is 1600 by 1024 pixels
      And I open the url "/"
      And I click the "VI. Requests" navigation item
      And I expect the section header "VI. Requests" to exist

  Scenario: Send HTTP request by providing a path relative to the base url
    Then I expect the response the following request to match the reference "06-requests/01-get-iframe":
      """
      {
        "url": "/iframe.html"
      }
      """

  Scenario: Send HTTP requests to a completely external url
    Then I expect the response the following request to match the reference "06-requests/02-get-reqres-users":
      """
      {
        "url": "https://reqres.in/api/users",
        "qs": {
          "page": 2
        }
      }
      """
      And I expect the response the following request to match the reference "06-requests/02-post-reqres-register":
      """
      {
        "url": "https://reqres.in/api/register",
        "method": "POST",
        "content-type": "application/json",
        "form": {
          "email": "lipsum@foobar.com",
          "password": "lipsum"
        }
      }
      """

  Scenario: Intercept AJAX requests sent on button click
    When I start to intercept ajax requests
      And I click the button "#ajaxSubmitBtn"
    Then I expect the ajax requests to match the reference "06-requests/03-post-reqres-login"
