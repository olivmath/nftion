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
    context.nft_seller = {"nft": nft, "init_price": price}
    context.client.post(f"/{status}", context.nft_seller)


@then('should be displayed into the list of {status} auctions')
def get_status_auctions(context, status):
    assert "0xac" in context.client.get(f"/{status}").json()
