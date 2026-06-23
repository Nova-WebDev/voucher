from app.data.db import engine
from app.data.base import Base

def _load_models():
    from branch.infrastructure.data.models import Voucher  # noqa
    from users.infrastructure.data.models import User  # noqa
    from meals.infrastructure.data.models import Meal  # noqa
    from meal_plans.infrastructure.data.models import MealPlan  # noqa
    from voucher.infrastructure.data.models import Voucher  # noqa

async def init_db():
    _load_models()
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
