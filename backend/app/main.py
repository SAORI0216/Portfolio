from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.db.session import engine
from app.db.base import Base
import app.models
from app.routers import skills,works,profiles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.on_event("startup")
def startup_db_check():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))

app.include_router(skills.router)
app.include_router(works.router)
app.include_router(profiles.router)
