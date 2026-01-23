from fastapi import FastAPI
from sqlalchemy import text
from app.db.session import engine
from app.db.base import Base
import app.models

app = FastAPI()

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.on_event("startup")
def startup_db_check():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))