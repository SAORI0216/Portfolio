from sqlalchemy import String,DateTime
from sqlalchemy.orm import Mapped,mapped_column
from datetime import datetime,timezone
from app.db.base import Base

class Admin(Base):
    __tablename__ = "admins"

    id:Mapped[int] = mapped_column(primary_key=True)
    firebase_uid:Mapped[str] = mapped_column(String,unique=True,nullable=False)
    email:Mapped[str] = mapped_column(String,nullable=False)
    created_at:Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda:datetime.now(timezone.utc),
        nullable=False
        )
