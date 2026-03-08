from sqlalchemy import ARRAY, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from pgvector.sqlalchemy import Vector

from app.database import Base


class Prompt(Base):
    __tablename__ = "prompts"

    id: Mapped[int] = mapped_column(primary_key=True)
    cita: Mapped[str] = mapped_column(Text, nullable=False)
    autor: Mapped[str] = mapped_column(String, nullable=False)
    corriente: Mapped[str] = mapped_column(String, nullable=False)
    dilema: Mapped[str] = mapped_column(Text, nullable=False)
    pregunta_abierta: Mapped[str] = mapped_column(Text, nullable=False)
    temas: Mapped[list[str] | None] = mapped_column(ARRAY(String), nullable=True)
    embedding: Mapped[list[float] | None] = mapped_column(Vector(384), nullable=True)

    responses: Mapped[list["Response"]] = relationship(back_populates="prompt")
