from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    """
    # root route
    """
    return {"Hello": "World"}
