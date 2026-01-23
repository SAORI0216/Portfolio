from sqlalchemy import String,Text,DateTime
from sqlalchemy.orm import Mapped,mapped_column
from datetime import datetime,timezone
from app.db.base import Base

class Contact(Base):
    __tablename__ = "contacts"

    id:Mapped[int] = mapped_column(primary_key=True)
    name:Mapped[str] = mapped_column(String,nullable=False)
    email:Mapped[str] = mapped_column(String,nullable=False)
    message:Mapped[str] = mapped_column(Text,nullable=False)
    status:Mapped[str] = mapped_column(String, default="new")
    admin_memo:Mapped[str] = mapped_column(Text,nullable=True)
    created_at:Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda:datetime.now(timezone.utc),
        nullable=False
        )