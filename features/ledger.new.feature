Feature: A Ledger has a new field
    As a user 
    I can add new items to the Ledger
    By filling in all the fields

  Scenario: fill out one field and hit enter
    Given A focused form 
    Then  I fill in focused field
    When  I hit enter
    Then  I will see 'required'

#  Scenario: fill one field and hit tab, fill out second field and hit enter
#    Given A focused form
#    Then  I fill in focused field
#    When  I hit tab
#    Then  I fill in focused field
#    When  I hit enter
#    Then  I will see 'created'

