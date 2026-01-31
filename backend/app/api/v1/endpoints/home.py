from fastapi import APIRouter

router = APIRouter(tags=["Home"])


@router.get("/health")
async def health():
    return {"status": "ok"}
