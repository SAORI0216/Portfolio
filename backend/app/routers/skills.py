from fastapi import APIrouter,Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.skill import Skill
from app.schemas.skill import SkillRead

router = APIrouter(prefix="/skills", tags=["skills"])

@router.get("",response_model=list[SkillRead])
def get_skills(db:Session = Depends(get_db)):
    return(
        db.query(Skill)
        .order_by(Skill.category,Skill.display_order)
        .all()
    )
