from fastapi.responses import JSONResponse
from fastapi import status
from nftion.api.auction import router



@router.get(
    path="/",
    description="Show all open NFT auctions",
    status_code=status.HTTP_200_OK
)
async def hello():
    """
    # return all open nft auctions id

    - the id is same of nft id
    """
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content=["nft_id"]
    )
