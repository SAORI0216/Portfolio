from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.work import Work
from app.schemas.work import WorkRead,WorkCreate,WorkUpdate
from app.core.auth import verify_token

router = APIRouter(prefix="/works",tags=["works"])

@router.get("",response_model=list[WorkRead])
def get_works(db:Session=Depends(get_db)):
    return db.query(Work).all()

@router.post("",response_model=WorkRead)
def create_work(work:WorkCreate,db:Session=Depends(get_db),user=Depends(verify_token)):
    new_work = Work(**work.model_dump())
    db.add(new_work)
    db.commit()
    db.refresh(new_work)
    return new_work

@router.put("/{work_id}",response_model=WorkUpdate)
def update_work(work_id:int,work:WorkUpdate,db:Session=Depends(get_db),user=Depends(verify_token)):
    db_work = db.query(Work).filter(Work.id == work_id).first()
    if not db_work:
        raise HTTPException(status_code=404,detail="Work not found")
    
    for key,value in work.model_dump().items():
        setattr(db_work,key,value)
    db.commit()
    db.refresh(db_work)
    return db_work

@router.delete("/{work_id}")
def delete_work(work_id:int,db:Session=Depends(get_db),user=Depends(verify_token)):
    db_work = db.query(Work).filter(Work.id == work_id).first()
    if not db_work:
        raise HTTPException(statue_code=404,detail="Work not found")
    
    db.delete(db_work)
    db.commit()
    return{"message":"Deleted successfully!"}