# Gherkin Acceptance Test for Finding New Questions

Feature: Finding New Questions
	As an anonymous user or registered user
    In order to find the latest questions posted to a question category without specifying a particular search query
    I should be able to view a list of all questions, or a list of all questions for a question category, in order of chronological 	age		
    
Scenario: Finding All New Questions
	Given I open the url "http://mayhem-ecse428.rhcloud.com/questions/find"
	Then I expect that the title is "View Questions - Mayhem"