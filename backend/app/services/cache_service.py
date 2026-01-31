# services/cache_service.py

import json
from redis.asyncio import Redis
from typing import Any, Optional

class CacheService:
    def __init__(self, redis_client: Redis, prefix: str = "cache"):
        self.redis = redis_client
        self.prefix = prefix

    def _format_key(self, key: str) -> str:
        return f"{self.prefix}:{key}"

    async def get(self, key: str) -> Optional[Any]:
        return await self.redis.get(self._format_key(key))
    
    async def get_json(self, key: str) -> Optional[Any]:
        raw = await self.redis.get(self._format_key(key))
        if raw:
            return json.loads(raw)
        return None

    async def set(self, key: str, value: Any, expire: Optional[int]):
        json_value = json.dumps(value)
        await self.redis.set(self._format_key(key), json_value, ex=expire)

    async def delete(self, key: str):
        await self.redis.delete(self._format_key(key))
