from pydantic import BaseModel, Field


class Bid(BaseModel):
    """
    # Bid
    """
    signature: str = Field(..., description="0xac")
    amount: int = Field(..., description="100")
    bidder: str = Field(..., description="0xacffe9218ac8ad")

    # @validator("*")
    # def validate_signature(cls, v) -> bool:
    #     return v
    # @validator("*")
    # def validate_approved_by_contract(cls, v) -> bool:
    #     return v
    # @validator("*")
    # def validate_balance_of_bidder(cls, v) -> bool:
    #     return v
    # @validator("*")
    # def validate_allowance_of_bidder(cls, v) -> bool:
    #     return v
