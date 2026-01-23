from sqlalchemy.orm import declarative_base

Base = declarative_base()

from app.models.admin import Admin
from app.models.profile import Profile
from app.models.skill import Skill
from app.models.work import Work
from app.models.contact import Contact