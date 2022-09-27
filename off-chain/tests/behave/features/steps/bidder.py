from behave import given, when, then
from eth_account import Account
from json import loads


# todo: create a new auction
@given('a open auction nft: {nft}')
def create_bidder(context, nft: str):
    context.bidder: Account = Account().from_key(
        "0xc12d5fd82e11119cb6fdeaac20ad8b255fdb208b36d557dd816e2bfd8d831e0b"
    )
    context.nft = nft
    assert context.client.get(f"/{nft}").json()["nft_id"] == nft


@given('a bid in bid list of nft: {nft}')
def put_bid_in_nft_auction(context, nft: str):
    context.bidder: Account = Account().from_key(
        "0xc12d5fd82e11119cb6fdeaac20ad8b255fdb208b36d557dd816e2bfd8d831e0b"
    )
    context.bid = context.client.post(
        f"/{nft}",
        json={
            "bidder": context.bidder.address,
            "amount": 100,
            "signature": "0xaccacacaca"
        }
    ).json()
    context.response = context.client.get(f"/{nft}").json()["bids"]
    assert context.bid in context.response


@when('bidder send a bid: {bid}')
def send_bid(context, bid: int):
    context.bid = context.client.post(
        f"/{context.nft}",
        json={
            "bidder": context.bidder.address,
            "amount": bid,
            "signature": "0xaccacacaca"
        }
    ).json()


@when('bidder send a ask to remove')
def step_impl(context):
    context.bid = context.client.delete(
        f"/{context.nft}",
        json={
            "bidder": context.bidder.address,
            "nft": context.nft,
            "signature": "0xaccacacaca"
        }
    ).json()


@then('should {status} are in bid list of nft: {nft}')
def validate_bid(context, nft: str, status: str):
    auction = context.client.get(f"/{nft}").json()
    if status == "not":
        assert context.bid not in auction["bids"]
    else:
        assert context.bid in auction["bids"]


@then('should return')
def validate_return(context):
    assert context.bid == loads(context.text)
