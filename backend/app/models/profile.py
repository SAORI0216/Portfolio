from sqlalchemy import String,Text,DateTime
from sqlalchemy.orm import Mapped,mapped_column
from datetime import datetime
from app.db.base import Base

class Profile(Base):
    __tablename__ = "profiles"

    id:Mapped[int] = mapped_column(primary_key=True)
    name:Mapped[str] = mapped_column(String,nullable=False)
    bio:Mapped[str] = mapped_column(Text)
    profile_image_url:Mapped[str] = mapped_column(String)
    created_at:Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda:datetime.now(timezone.utc),
        nullable=False
        )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda:datetime.now(timezone.utc),
        nullable=False
        )

