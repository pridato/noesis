from datetime import datetime

from pgvector.sqlalchemy import Vector
from sqlalchemy import Boolean, DateTime, ForeignKey, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Response(Base):
    __tablename__ = "responses"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    prompt_id: Mapped[int] = mapped_column(ForeignKey("prompts.id"), nullable=False)
    reaccion_cita: Mapped[str | None] = mapped_column(Text, nullable=True)
    dilema_eleccion: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    dilema_razon: Mapped[str | None] = mapped_column(Text, nullable=True)
    pregunta_resp: Mapped[str | None] = mapped_column(Text, nullable=True)
    embedding: Mapped[list[float] | None] = mapped_column(Vector(384), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    user: Mapped["User"] = relationship(back_populates="responses")
    prompt: Mapped["Prompt"] = relationship(back_populates="responses")
    analysis: Mapped["Analysis"] = relationship(back_populates="response", uselist=False)
