from behave import given, when, then

@given('that there are open nft auctions')
def open_new_nft_auction(context):
    raise NotImplementedError('STEP: Given that there are open nft auctions')


@given('that there are closed nft auctions')
def closed_nft_auction(context):
    raise NotImplementedError('STEP: Given that there are closed nft auctions')


@when('someone accesses the home')
def get_all_open_nft_auction(context):
    raise NotImplementedError('STEP: When someone accesses the home')


@when('someone accesses the page of NFT auction')
def get_a_open_nft_auction(context):
    raise NotImplementedError('STEP: When someone accesses the page of NFT auction')


@then('should return list of ids of open auctions')
def validate_open_nft_auctions(context):
    raise NotImplementedError('STEP: Then should return list of ids of open auctions')


@then('should return list of ids of closed auctions')
def validate_bids_of_closed_nft_auction(context):
    raise NotImplementedError('STEP: Then should return list of ids of closed auctions')


@then('should return list of bids of this NFT auctions')
def validate_bids_of_a_nft_auction(context):
    raise NotImplementedError('STEP: Then should return list of bids of this NFT auctions')
