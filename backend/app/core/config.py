from pydantic_settings import BaseSettings,SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    database_url: str = Field(alias="DATABASE_URL")
    admin_email: str | None = Field(default=None, alias="ADMIN_EMAIL")
    admin_firebase_uid: str | None = Field(default=None, alias="ADMIN_FIREBASE_UID")

    model_config = SettingsConfigDict(
        env_file = ".env",
        populate_by_name=True,
    )

settings = Settings()