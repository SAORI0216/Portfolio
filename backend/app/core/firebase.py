import firebase_admin
from firebase_admin import credentials
from app.core.config import settings

cred = credentials.Certificate({
  "type": "service_account",
  "project_id": settings.firebase_project_id,
  "client_email": settings.firebase_client_email,
  "private_key": settings.firebase_private_key.replace("\\n", "\n"),
  "token_uri": "https://oauth2.googleapis.com/token",
})

firebase_admin.initialize_app(cred)