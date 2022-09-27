from behave import given, when, then
from eth_account import Account


@given('Seller with private_key: {private_key}')
def create_seller(context, private_key):
    context.seller: Account = Account().from_key(
        private_key
    )
    assert context.seller.address == "0xFe32CA2F5278514AAeB6B46Dadb0282f1B916EbA"


@when('he {status} a auction with nft: {nft}, init price: {price}')
def open_auction(context, status, nft, price):
    # from eth_account.messages import encode_defunct
    context.nft, context.price = nft, price
    payload = {
        "signature": "signdfadfadfasdf",
        "nft_id": context.nft,
        "seller": context.seller.address
    }
    if status == "open":
        payload["initial_price"] = price
    else:
        payload["end_price"] = price

    context.response = context.client.post(f"/{status}", json=payload).json()

@then('should be displayed into the list of {status} auctions')
def get_status_auctions(context, status):
    assert context.nft in context.client.get(f"/{status}").json()
