# pylint: disable=too-few-public-methods
# pylint: disable=no-name-in-module
# pylint: disable=no-self-argument

from pydantic import BaseModel, validator


class Bid(BaseModel):
    """
    # Bid of a Auction
    """
    bidder_address: str
    signature: str
    bid: int

    @validator("*")
    def validate_signature(cls, v) -> bool:
        return v
    @validator("*")
    def validate_approved_by_contract(cls, v) -> bool:
        return v
    @validator("*")
    def validate_balance_of_bidder(cls, v) -> bool:
        return v
    @validator("*")
    def validate_allowance_of_bidder(cls, v) -> bool:
        return v
