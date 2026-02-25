from pydantic import BaseModel
from datetime import datetime

class ContactCreate(BaseModel):
    name:str
    email:str
    message:str

class ContactResponse(BaseModel):
    id:int
    name:str
    email:str
    message:str
    status:str
    admin_memo:str | None
    created_at:datetime

    class Config:
        from_attributes = True