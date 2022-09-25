# Routes

| METHOD | ROUTE | DESCRIPTIONS | DEPLOYED |
|-|-|-|-|
| GET | [/](http://127.0.0.1:8000/) | return all open and closed NFT auctions | ✅ |
| GET | [/open/](http://127.0.0.1:8000/open/) | return all open NFT auctions | ✅  |
| POST | [/open/](http://127.0.0.1:8000/open/) | open a new NFT auctions | ⏰ |
| GET | [/closed/](http://127.0.0.1:8000/closed/) | return all closed NFT auctions | ✅ |
| POST | [/closed/](http://127.0.0.1:8000/closed/) | closed a open NFT auctions | ⏰ |
| GET | [/{nft_id}/](http://127.0.0.1:8000/{nft_id}/) | return the open NFT auction and all bids | ✅ | 
| PUT | [/{nft_id}/](http://127.0.0.1:8000/{nft_id}/) | put new bid in open NFT auction | ⏰ |
| DELETE | [/{nft_id}/](http://127.0.0.1:8000/{nft_id}/) | remove bid from open NFT auction | ⏰ |