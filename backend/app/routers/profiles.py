from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.profile import Profile
from app.schemas.profiles import ProfilesRead,ProfileUpdate
from app.core.auth import verify_token

router = APIRouter(prefix="/profile",tags=["profile"])

@router.get("",response_model=ProfilesRead)
def get_profile(db:Session = Depends(get_db)):
    profile = db.query(Profile).first()

    return {
        "id":profile.id,
        "name":profile.name,
        "bio":profile.bio,
        "profile_image_url":profile.profile_image_url,
        "zenn_url":"https://zenn.dev/saorinn",
    }

@router.put("/{profile_id}",response_model=ProfilesRead)
def update_profile(profile_id:int,data:ProfileUpdate,db:Session=Depends(get_db),user=Depends(verify_token)):
    profile = db.query(Profile).filter(Profile.id == profile_id).first()

    if not profile:
        raise HTTPException(status_code=404,detail="Profile not found")
    
    profile.name = data.name
    profile.bio = data.bio
    profile.profile_image_url = data.profile_image_url

    db.commit()
    db.refresh(profile)

    return {
        "id":profile.id,
        "name":profile.name,
        "bio":profile.bio,
        "profile_image_url":profile.profile_image_url,
        "zenn_url":"https://zenn.dev/saorinn",
    }