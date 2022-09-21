from fastapi.responses import JSONResponse
from fastapi import status
from nftion.api.home import router

@router.get(
    path="/",
    description="Hello World!",
    status_code=status.HTTP_200_OK
)
async def hello():
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "Hello": "World!"
        }
    )
