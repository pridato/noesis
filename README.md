# Noesis

> Plataforma de análisis filosófico y construcción de perfil cognitivo mediante IA

## Stack

| Capa | Tecnología |
|------|-----------|
| Backend | FastAPI + Python 3.11 |
| Base de datos | PostgreSQL 15 + pgvector |
| Embeddings | sentence-transformers |
| LLM | Claude (Anthropic API) |
| Frontend | Next.js 14 + TypeScript |
| Infraestructura | Docker + Docker Compose |

## Inicio rápido

```bash
cp .env.example .env
docker-compose up -d
```

API: `http://localhost:8000` | Docs: `http://localhost:8000/docs`

## Ramas

- `main` — producción
- `dev` — desarrollo
