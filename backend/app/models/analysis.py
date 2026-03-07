from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Text, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id: Mapped[int] = mapped_column(primary_key=True)
    response_id: Mapped[int] = mapped_column(ForeignKey("responses.id"), nullable=False)
    sesgos: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    influencias: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    informe: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    response: Mapped["Response"] = relationship(back_populates="analysis")
