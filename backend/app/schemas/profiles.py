from pydantic import BaseModel

class ProfilesRead(BaseModel):
    id:int
    name:str
    bio:str
    profile_image_url:str | None
    zenn_url:str | None

    class Config:
        from_attributes = True
