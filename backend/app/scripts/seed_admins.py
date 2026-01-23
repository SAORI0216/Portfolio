from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.models.admin import Admin
import os
from app.core.config import settings

def seed_admins(db:Session):
    if db.query(Admin).count() > 0:
        print("admins already seeded")
        return
    
    admin = Admin(
        firebase_uid=settings.admin_firebase_uid or "mock_admin_001",
        email=settings.admin_email or "admin@example.com",
        created_at=datetime.now(timezone.utc),
    )

    db.add(admin)
    db.commit()
    print("admins シーディング成功🌱")