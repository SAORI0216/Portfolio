from pydantic import BaseModel
from app.models.enums import SkillCategory

class SkillRead(BaseModel):
    id:int
    name:str
    category:SkillCategory
    display_order:int

    class Config:
        from_attributes = True