from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.skill import Skill
from app.schemas.skill import SkillRead,SkillCreate,SkillUpdate

router = APIRouter(prefix="/skills", tags=["skills"])

@router.get("",response_model=list[SkillRead])
def get_skills(db:Session = Depends(get_db)):
    return(
        db.query(Skill)
        .order_by(Skill.category,Skill.display_order)
        .all()
    )

@router.post("",response_model=SkillRead)
def create_skill(data:SkillCreate,db:Session=Depends(get_db)):
    skill = Skill(**data.dict())
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill

@router.put("/{skill_id}",response_model=SkillRead)
def update_skill(skill_id:int,data:SkillUpdate,db:Session=Depends(get_db)):
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404)
    
    skill.name = data.name
    skill.category = data.category
    skill.display_order = data.display_order

    db.commit()
    db.refresh(skill)
    return skill

@router.delete("/{skill_id}")
def delete_skill(skill_id:int,db:Session=Depends(get_db)):
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404)
    
    db.delete(skill)
    db.commit()

    return {"message":"削除しました"}