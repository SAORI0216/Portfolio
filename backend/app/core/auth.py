from firebase_admin import auth
from fastapi import Depends,HTTPException,Header

def verify_token(authorization:str = Header(...)):
    try:
        token = authorization.split("Bearer ")[1]
        decoded_token = auth.verify_id_token(token)

        print("LOGIN UID:", decoded_token["uid"])

        return decoded_token
    
    except Exception:
        raise HTTPException(status_code=401,detail="Invalid token")