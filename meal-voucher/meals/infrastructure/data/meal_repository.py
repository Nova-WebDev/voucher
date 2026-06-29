from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from meals.core.interfaces.meal_repository import IMealRepository
from meals.core.entities.meal_entity import MealEntity
from meals.infrastructure.data.models import Meal


class MealRepository(IMealRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, title: str, description: str | None, img_id: str | None) -> MealEntity:
        meal = Meal(title=title, description=description, img_id=img_id, is_active=True)
        self.session.add(meal)
        await self.session.flush()
        return MealEntity(meal.id, meal.title, meal.description, meal.img_id, meal.is_active)

    async def get_by_id(self, meal_id: int) -> MealEntity | None:
        stmt = select(Meal).where(Meal.id == meal_id)
        result = await self.session.execute(stmt)
        meal = result.scalar_one_or_none()
        if not meal:
            return None
        return MealEntity(meal.id, meal.title, meal.description, meal.img_id, meal.is_active)

    async def update_is_active(self, meal_id: int, is_active: bool) -> None:
        stmt = (
            update(Meal)
            .where(Meal.id == meal_id)
            .values(is_active=is_active)
        )
        await self.session.execute(stmt)

    async def update(self, meal_id: int, title: str, description: str | None, img_id: str | None) -> MealEntity:
        stmt = (
            update(Meal)
            .where(Meal.id == meal_id)
            .values(title=title, description=description, img_id=img_id)
            .returning(Meal)
        )
        result = await self.session.execute(stmt)
        meal = result.scalar_one()
        return MealEntity(meal.id, meal.title, meal.description, meal.img_id, meal.is_active)


    async def list_all(self) -> list[MealEntity]:
        stmt = select(Meal)
        result = await self.session.execute(stmt)
        meals = result.scalars().all()

        return [
            MealEntity(
                m.id,
                m.title,
                m.description,
                m.img_id,
                m.is_active,
            )
            for m in meals
        ]