from pydantic_settings import BaseSettings,SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    database_url: str = Field(alias="DATABASE_URL")
    admin_email: str | None = Field(default=None, alias="ADMIN_EMAIL")
    admin_firebase_uid: str | None = Field(default=None, alias="ADMIN_FIREBASE_UID")

    firebase_project_id:str = Field(alias="FIREBASE_PROJECT_ID")
    firebase_client_email: str = Field(alias="FIREBASE_CLIENT_EMAIL")
    firebase_private_key: str = Field(alias="FIREBASE_PRIVATE_KEY")

    model_config = SettingsConfigDict(
        env_file = ".env",
        populate_by_name=True,
    )

settings = Settings()