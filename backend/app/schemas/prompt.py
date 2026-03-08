from pydantic import BaseModel


class PromptResponse(BaseModel):
    id: int
    cita: str
    autor: str
    corriente: str
    dilema: str
    pregunta_abierta: str
    temas: list[str] | None

    model_config = {"from_attributes": True}
