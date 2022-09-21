import subprocess

# running `poetry run up` for up server
def up():
    subprocess.run(["uvicorn", "nftion.main:app", "--reload"])
