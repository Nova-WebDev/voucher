import json
from typing import Optional
from redis.asyncio import Redis
from meals.core.interfaces.meal_store import IMealStore
from meals.core.entities.meal_entity import MealEntity


class MealStore(IMealStore):
    def __init__(self, redis: Redis, ttl_seconds: int = 60 * 60 * 8):
        self.redis = redis
        self.ttl = ttl_seconds

    @staticmethod
    def _key(meal_id: int) -> str:
        return f"meal:data:{meal_id}"

    @staticmethod
    def _serialize(data: MealEntity) -> str:
        return json.dumps({
            "id": data.id,
            "title": data.title,
            "description": data.description,
            "img_id": data.img_id,
            "is_active": data.is_active,
        })

    @staticmethod
    def _deserialize(raw: str) -> MealEntity:
        data = json.loads(raw)
        return MealEntity(
            id=data["id"],
            title=data["title"],
            description=data["description"],
            img_id=data["img_id"],
            is_active=data["is_active"],
        )

    async def get(self, meal_id: int) -> Optional[MealEntity]:
        key = self._key(meal_id)
        raw = await self.redis.get(key)
        if not raw:
            return None

        await self.redis.expire(key, self.ttl)
        return self._deserialize(raw)

    async def save(self, data: MealEntity) -> None:
        key = self._key(data.id)
        payload = self._serialize(data)
        await self.redis.set(key, payload, ex=self.ttl)

    async def delete(self, meal_id: int) -> None:
        key = self._key(meal_id)
        await self.redis.delete(key)
