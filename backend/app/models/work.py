from sqlalchemy import String,Text,Boolean,DateTime
from sqlalchemy.orm import Mapped,mapped_column
from datetime import datetime,timezone
from app.db.base import Base

class Work(Base):
    __tablename__ = "works"

    id:Mapped[int] = mapped_column(primary_key=True)
    title:Mapped[str] = mapped_column(String,nullable=False)
    description:Mapped[str] = mapped_column(Text)
    tech_stack:Mapped[str] = mapped_column(Text)
    github_url:Mapped[str] = mapped_column(String)
    image_url:Mapped[str] = mapped_column(String)
    is_published:Mapped[bool] = mapped_column(Boolean, default=True)
    created_at:Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda:datetime.now(timezone.utc),
        nullable=False
        )
    updated_at:Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda:datetime.now(timezone.utc),
        nullable=False
        )



