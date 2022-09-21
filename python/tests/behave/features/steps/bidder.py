from behave import given, when, then
from eth_account import Account
from json import loads


@given('Bidder with private_key: {private_key}')
def create_bidder(context, private_key):
    context.bidder: Account = Account().from_key(
        private_key
    )
    assert context.bidder.address == "0x0337752bce5c5FBf5906369B04555bb7f4040135"


@when('he bid: {bid} at nft: {nft}')
def make_bid(context, bid: int, nft: str):
    context.nft, context.bid = nft, bid
    context.client.post(f"/{context.nft}", {
        "address": context.bidder.address,
        "bid": context.bid,
        "signature": ""
    })

@then('should be displayed into the bid list of nft: {nft}')
def validate_bid(context, nft: str):
    list_of_bids: list = context.client.get(f"/{nft}").json()["bids"]
    assert context.bidder.addres in [
        bid["address"]
        for bid in list_of_bids
    ]
    assert context.bid in [
        bid["bid"]
        for bid in list_of_bids
    ]

@then('should return')
def step_impl(context):
    response = context.client.post(f"/{context.nft}", {
        "address": context.bidder.address,
        "bid": context.bid,
        "signature": ""
    }).json()

    assert response == loads(context.text)
