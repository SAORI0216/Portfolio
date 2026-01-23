from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.models.skill import Skill
from app.models.enums import SkillCategory

def seed_skills(db:Session):
    if db.query(Skill).count() > 0:
        print("skills already seeded")
        return

    now = datetime.now(timezone.utc)

    skill_data = [
        # ===== Frontend =====
        {
            "name": "Next.js（App Router）",
            "category": SkillCategory.FRONTEND,
            "display_order": 1,
            "created_at": now,
        },
        {
            "name": "TypeScript",
            "category": SkillCategory.FRONTEND,
            "display_order": 2,
            "created_at": now,
        },
        {
            "name": "Tailwind CSS",
            "category": SkillCategory.FRONTEND,
            "display_order": 3,
            "created_at": now,
        },
        # ===== Backend =====
        {
            "name": "FastAPI",
            "category": SkillCategory.BACKEND,
            "display_order": 1,
            "created_at": now,
        },
        {
            "name": "Python",
            "category": SkillCategory.BACKEND,
            "display_order": 2,
            "created_at": now,
        },
        {
            "name": "SQLAlchemy",
            "category": SkillCategory.BACKEND,
            "display_order": 3,
            "created_at": now,
        },
        {
            "name": "PostgreSQL",
            "category": SkillCategory.BACKEND,
            "display_order": 4,
            "created_at": now,
        },
        {
            "name": "MySQL",
            "category": SkillCategory.BACKEND,
            "display_order": 5,
            "created_at": now,
        },
        {
            "name": "Node.js",
            "category": SkillCategory.BACKEND,
            "display_order": 6,
            "created_at": now,
        },
        {
            "name": "Express",
            "category": SkillCategory.BACKEND,
            "display_order": 7,
            "created_at": now,
        },
        {
            "name": "Prisma",
            "category": SkillCategory.BACKEND,
            "display_order": 8,
            "created_at": now,
        },
        {
            "name": "Redis",
            "category": SkillCategory.BACKEND,
            "display_order": 9,
            "created_at": now,
        },
        # ===== Auth / BaaS =====
        {
            "name": "Firebase Authentication",
            "category": SkillCategory.BAAS,
            "display_order": 1,
            "created_at": now,
        },
        {
            "name": "Firebase Storage",
            "category": SkillCategory.BAAS,
            "display_order": 2,
            "created_at": now,
        },
        # ===== Infra / Cloud =====
        {
            "name": "Docker",
            "category": SkillCategory.INFRA,
            "display_order": 1,
            "created_at": now,
        },
        {
            "name": "AWS Lambda",
            "category": SkillCategory.INFRA,
            "display_order": 2,
            "created_at": now,
        },
        # ===== External API =====
        {
            "name": "Stripe",
            "category": SkillCategory.EXTERNAL,
            "display_order": 1,
            "created_at": now,
        },
        {
            "name": "GMOあおぞらネット銀行 API（sunabar）",
            "category": SkillCategory.EXTERNAL,
            "display_order": 2,
            "created_at": now,
        },
        {
            "name": "LINE Official Account Manager",
            "category": SkillCategory.EXTERNAL,
            "display_order": 3,
            "created_at": now,
        },
        # ===== Tools / Others =====
        {
            "name": "Swagger",
            "category": SkillCategory.TOOLS,
            "display_order": 1,
            "created_at": now,
        },
        {
            "name": "draw.io",
            "category": SkillCategory.TOOLS,
            "display_order": 2,
            "created_at": now,
        },
        {
            "name": "figma",
            "category": SkillCategory.TOOLS,
            "display_order": 3,
            "created_at": now,
        },
    ]

    for data in skill_data:
        skill = Skill(**data)
        db.add(skill)

    db.commit()
    print("skills シーディング成功🌱")