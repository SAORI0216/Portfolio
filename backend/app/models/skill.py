from sqlalchemy import String,Integer,DateTime
from sqlalchemy.orm import Mapped,mapped_column
from datetime import datetime,timezone
from app.db.base import Base
from sqlalchemy import Enum as SQLEnum
from app.models.enums import SkillCategory

class Skill(Base):
    __tablename__ = "skills"

    id:Mapped[int] = mapped_column(primary_key=True)
    name:Mapped[str] = mapped_column(String,nullable=False)
    category:Mapped[SkillCategory] = mapped_column(SQLEnum(SkillCategory,name="skill_category_enum"),nullable=False)
    display_order:Mapped[int] = mapped_column(Integer,nullable=False)
    created_at:Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda:datetime.now(timezone.utc),
        nullable=False
        )