from meals.core.entities.meal_entity import MealEntity
from meals.core.interfaces.meal_repository import IMealRepository
from meals.core.interfaces.image_format_validator import IImageFormatValidator
from meals.core.interfaces.image_session_creator import IImageSessionCreator
from meals.core.interfaces.image_processor import IImageProcessor
from meals.core.interfaces.meal_store import IMealStore


class UpdateMeal:
    def __init__(
        self,
        repository: IMealRepository,
        format_validator: IImageFormatValidator,
        session_creator: IImageSessionCreator,
        image_processor: IImageProcessor,
        store: IMealStore,
    ):
        self.repository = repository
        self.format_validator = format_validator
        self.session_creator = session_creator
        self.image_processor = image_processor
        self.store = store

    async def execute(
        self,
        meal_id: int,
        title: str,
        description: str | None,
        file_bytes: bytes | None,
        requester_role: int,
    ) -> MealEntity:

        if requester_role != 20:
            raise PermissionError()

        old_meal = await self.repository.get_by_id(meal_id)
        if not old_meal:
            raise ValueError("Meal not found")

        img_id = old_meal.img_id

        if file_bytes is not None:
            await self.format_validator.validate(file_bytes)

            if img_id is not None:
                await self.image_processor.delete(img_id)

            session_id = await self.session_creator.create_session()
            img_id = session_id

        meal = await self.repository.update(
            meal_id=meal_id,
            title=title,
            description=description,
            img_id=img_id,
        )

        if file_bytes is not None:
            await self.image_processor.process(
                session_id=img_id,
                file_bytes=file_bytes,
                resize_to=(1080, 1080),
                force_png=True,
            )

        await self.store.delete(meal_id)

        return meal
