import subprocess


def up():
    """
    # running `poetry run up` for up server
    """
    subprocess.run(["uvicorn", "nftion.main:app", "--reload"])


def lint():
    """
    # running `poetry run lint` for lint
    """
    subprocess.run(["pylint", "nftion"])


def b():
    """
    # running `poetry run t` for behave test 
    """
    subprocess.run(["behave", "tests/behave/features"])
