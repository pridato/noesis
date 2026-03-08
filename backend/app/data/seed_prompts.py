"""
Script de seed para cargar prompts en la base de datos.
Uso: python -m app.data.seed_prompts
"""
import asyncio
import json
from pathlib import Path

from sqlalchemy import select
from app.database import AsyncSessionLocal
from app.models.prompt import Prompt


async def seed() -> None:
    data_path = Path(__file__).parent / "prompts.json"
    prompts = json.loads(data_path.read_text())

    async with AsyncSessionLocal() as session:
        existing = await session.scalar(select(Prompt).limit(1))
        if existing:
            print("Prompts ya existen en la DB, omitiendo seed.")
            return

        for item in prompts:
            session.add(Prompt(
                cita=item["cita"],
                autor=item["autor"],
                corriente=item["corriente"],
                dilema=item["dilema"],
                pregunta_abierta=item["pregunta_abierta"],
                temas=item.get("temas", []),
            ))

        await session.commit()
        print(f"{len(prompts)} prompts insertados correctamente.")


if __name__ == "__main__":
    asyncio.run(seed())
