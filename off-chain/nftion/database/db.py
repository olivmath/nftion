# pylint: disable=line-too-long

from nftion.models.auction import Auction, Seller, Auctions


# owner_nftion = new ethers.Wallet(
#     "0xc0fab9c7a58b1ecfaea18c7ed502d86213ff54efd9034b52b1f36fdb5f1d9852"
# )


seller = Seller(
    prvk="0x7f27c4189fb97fd29fba63779c2bcfc8bbb066c403d2754abc52283ca502cc4f")

duck_auction = Auction(
    nft_id="0xff",
    signature="0x3789e95fc86ca07d161c06dc95d5843f2b0a22457da570740703e10e8eb7ec626cd163aaab7d87d5f23074d0b5b13be7871582ffaf9c0c93cc4c49059c51d2161b",
    seller=seller.addr,
    initial_price=seller.initial_price
)
monkey_auction = Auction(
    signature="0x2fa6f06af42c1e2674d8d1e912d080d295d71cd652b5a885d15e3aba6da2585f67bd96a6571d5d48fe8127f9953dd555b7d6556d894f58dc1747e4e1ad48d9e91c",
    nft_id="0xaa",
    seller=seller.addr,
    initial_price=seller.initial_price + 10
)

# pylint: disable=protected-access
monkey_auction._open = False

all_auctions = Auctions(
    auctions=[duck_auction, monkey_auction]
)
