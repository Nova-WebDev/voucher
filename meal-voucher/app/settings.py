from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str
    redis_url: str

    sms_api_key: str
    sms_template: str

    class Config:
        env_file = "../.env"
        env_file_encoding = "utf-8"


settings = Settings()  # type: ignore