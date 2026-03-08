from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str
    anthropic_api_key: str = ""
    app_env: str = "development"
    secret_key: str = "changeme"
    allowed_origins: str = "http://localhost:3000"
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
