from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.work import Work
from app.schemas.work import WorkRead

router = APIRouter(prefix="/works",tags=["works"])

@router.get("",response_model=list[WorkRead])
def get_works(db:Session=Depends(get_db)):
    return db.query(Work).all()