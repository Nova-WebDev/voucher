from sqlalchemy.ext.asyncio import AsyncSession

from meals.utility.session_creator import LocalImageSessionCreator

from app.redis.redis_client import redis_client

from meals.core.use_cases.create_meal import CreateMeal
from meals.core.use_cases.get_meal import GetMeal
from meals.core.use_cases.get_meal_image import GetMealImage
from meals.core.use_cases.toggle_meal_active import ToggleMealActive
from meals.core.use_cases.update_meal import UpdateMeal

from meals.infrastructure.data.meal_repository import MealRepository

from meals.infrastructure.store.meal_store import MealStore

from meals.infrastructure.file_processing.file_type_detector import ImageFormatValidator
from meals.infrastructure.file_processing.image_processor import LocalImageProcessor


def get_create_meal_uc(session: AsyncSession) -> CreateMeal:
    repository = MealRepository(session)
    format_validator = ImageFormatValidator()
    session_creator = LocalImageSessionCreator()
    image_processor = LocalImageProcessor()

    return CreateMeal(
        repository=repository,
        format_validator=format_validator,
        session_creator=session_creator,
        image_processor=image_processor,
    )

def get_get_meal_uc(session: AsyncSession) -> GetMeal:
    repository = MealRepository(session)
    store = MealStore(redis_client)

    return GetMeal(repository=repository, store=store)

def get_get_meal_image_uc() -> GetMealImage:
    processor = LocalImageProcessor()
    return GetMealImage(image_processor=processor)

def get_toggle_meal_active_uc(session: AsyncSession) -> ToggleMealActive:
    repository = MealRepository(session)
    store = MealStore(redis_client)
    return ToggleMealActive(repository=repository, store=store)

def get_update_meal_uc(session: AsyncSession) -> UpdateMeal:
    repository = MealRepository(session)
    format_validator = ImageFormatValidator()
    session_creator = LocalImageSessionCreator()
    image_processor = LocalImageProcessor()
    store = MealStore(redis_client)

    return UpdateMeal(
        repository=repository,
        format_validator=format_validator,
        session_creator=session_creator,
        image_processor=image_processor,
        store=store,
    )
