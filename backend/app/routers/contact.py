from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.contact import Contact
from app.schemas.contact import ContactCreate,ContactResponse,ContactUpdate
from typing import List

router = APIRouter(prefix="/contacts",tags=["contacts"])

@router.post("/",response_model=ContactResponse)
def create_contact(contact:ContactCreate,db:Session=Depends(get_db)):
    new_contact = Contact(
        name=contact.name,
        email=contact.email,
        message=contact.message,
        status="unhandled"
        )
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    return new_contact

@router.get("/",response_model=List[ContactResponse])
def get_contacts(db:Session=Depends(get_db)):
    return db.query(Contact).order_by(Contact.created_at.desc()).all()

@router.get("/{contact_id}",response_model=ContactResponse)
def get_contact(contact_id:int,db:Session=Depends(get_db)):
    return db.query(Contact).filter(Contact.id == contact_id).first()

@router.patch("/{contact_id}",response_model=ContactResponse)
def update_contact(contact_id:int,update:ContactUpdate,db:Session=Depends(get_db)):
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        return None
    contact.status = update.status
    contact.admin_memo = update.admin_memo

    db.commit()
    db.refresh(contact)
    
    return contact