# pylint: disable=no-name-in-module

from json import loads
from behave import given, when, then


@given('that there are {status} nft auctions')
def open_new_nft_auction(context, status: str):
    assert len(
        context.client.get("/open/").json()["open"]
    ) > 0
    context.auction_status = status


@when('someone get this')
def get_all_open_nft_auction(context):
    context.response = context.client.get(f"/{context.auction_status}/").json()


@then('should return list of ids of {status} auctions')
def validate_open_nft_auctions(context, status):
    expect = loads(context.text)
    assert expect == context.response[status]


@when('someone get {nft} NFT')
def get_a_open_nft_auction(context, nft: str):
    context.response = context.client.get(f"/{nft}/").json()


@then('should return list of bids of {nft} NFT auction')
def validate_bids_of_a_nft_auction(context, nft):
    
    print(context.response)
    assert context.response['auction']['nft_id'] == nft
