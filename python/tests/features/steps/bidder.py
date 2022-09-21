from behave import given, when, then
from eth_account import Account


@given('Bidder with private_key: 0x7f27c4189fb97fd29fba63779c2bcfc8bbb066c403d2754abc52283ca502cc4f')
def step_impl(context):
    raise NotImplementedError('STEP: Given Bidder with private_key: 0x7f27c4189fb97fd29fba63779c2bcfc8bbb066c403d2754abc52283ca502cc4f')


@when('he bid price: 100 at nft: 0xac')
def step_impl(context):
    raise NotImplementedError('STEP: When he bid price: 100 at nft: 0xac')


@then('should be displayed into the bid list of nft: 0xac')
def step_impl(context):
    raise NotImplementedError('STEP: Then should be displayed into the bid list of nft: 0xac')
