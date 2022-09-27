from fastapi import FastAPI


DESCRIPTION ="""
## Welcome To NFTion
**Here you can sell/buy NFTs in auction with free fee bids**

***by olivmath®***
"""


app = FastAPI(
    docs_url="/docs",
    openapi_url="/api/v1/openapi.json",
    description=DESCRIPTION,
    title="Pix API",
    version="0.1.0",
    openapi_tags=[]
)
