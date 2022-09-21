from json import loads
from behave import given, when, then

@given('that acessing home page')
def enter_in_home(context):
    context.home = context.client.get

@when('acess')
def second(context):
    context.response = context.home("/").json()

@then('should return')
def end(context):
    print(context.response)
    print(context.text)
    assert context.response == loads(context.text)