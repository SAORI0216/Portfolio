from pydantic import Basemodel

class WorkRead(Basemodel):
    id:int
    title:str
    description:str
    url:str | None
    desplay_order:int

    class Config:
        from_attributes = True