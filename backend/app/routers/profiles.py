from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.profile import Profile
from app.schemas.profiles import ProfilesRead

router = APIRouter(prefix="/profile",tags=["profile"])

@router.get("",response_model=ProfilesRead)
def get_profole(db:Session = Depends(get_db)):
    profile = db.query(Profile).first()

    return {
        "id":profile.id,
        "name":profile.name,
        "bio":profile.bio,
        "profile_image_url":profile.profile_image_url,
        "zenn_url":"https://zenn.dev/saorinn",
    }