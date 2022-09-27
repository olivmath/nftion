from pydantic import BaseModel, Field


class NewAuction(BaseModel):
    """
    # New Auction model request
    """
    signature: str = Field(..., description="0xac")
    initial_price: int = Field(..., description="100")
    seller: str = Field(..., description="0xacffe9218ac8ad")
    nft_id: str = Field(..., description="0xaa")


class CloseAuction(BaseModel):
    """
    # Close Auction model request
    """
    signature: str = Field(..., description="0xac")
    end_price: int = Field(..., description="100")
    seller: str = Field(..., description="0xacffe9218ac8ad")
    nft_id: str = Field(..., description="0xaa")
