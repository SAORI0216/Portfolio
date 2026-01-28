from pydantic import BaseModel

class WorkRead(BaseModel):
    id:int
    title:str
    description:str | None = None
    tech_stack:str | None = None
    github_url:str | None = None
    image_url:str | None = None

    class Config:
        from_attributes = True