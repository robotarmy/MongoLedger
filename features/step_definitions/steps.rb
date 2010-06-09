start_tab = 10

Given /^A focused form$/ do
  visit("/")
  page.has_css?('form.focused')
end

Then /^I fill in focused field$/ do
 p page.locate(:xpath,'//input[@tabindex=10]')
  page.fill_in("//input[@tabindex=10]", :with => 'cake')
  page.should have_content('cake')
end

When /^I hit enter$/ do  
 page.should have_content('fixme')
end

Then /^I will see '(.+)'$/ do |text|
 page.should have_content(text)
end

When /^I hit tab$/ do

end

