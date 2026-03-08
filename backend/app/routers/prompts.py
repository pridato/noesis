from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.prompt import Prompt
from app.models.response import Response
from app.schemas.prompt import PromptResponse

router = APIRouter(prefix="/prompts", tags=["prompts"])


@router.get("/random", response_model=PromptResponse)
async def get_random_prompt(
    user_id: int | None = None,
    db: AsyncSession = Depends(get_db),
) -> Prompt:
    """
    Devuelve un prompt aleatorio.
    Si se pasa user_id, excluye los prompts que el usuario ya ha visto.
    """
    query = select(Prompt)

    if user_id is not None:
        seen = select(Response.prompt_id).where(Response.user_id == user_id)
        query = query.where(Prompt.id.not_in(seen))

    query = query.order_by(func.random()).limit(1)
    result = await db.execute(query)
    prompt = result.scalar_one_or_none()

    if prompt is None:
        raise HTTPException(status_code=404, detail="No hay prompts disponibles")

    return prompt
