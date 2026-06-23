# meals/core/use_cases/create_meal.py

from meals.core.entities.meal_entity import MealEntity
from meals.core.interfaces.meal_repository import IMealRepository
from meals.core.interfaces.image_format_validator import IImageFormatValidator
from meals.core.interfaces.image_session_creator import IImageSessionCreator
from meals.core.interfaces.image_processor import IImageProcessor


class CreateMeal:
    def __init__(
        self,
        repository: IMealRepository,
        format_validator: IImageFormatValidator,
        session_creator: IImageSessionCreator,
        image_processor: IImageProcessor,
    ):
        self.repository = repository
        self.format_validator = format_validator
        self.session_creator = session_creator
        self.image_processor = image_processor

    async def execute(
        self,
        title: str,
        description: str | None,
        file_bytes: bytes | None,
        requester_role: int,
    ) -> MealEntity:

        if requester_role != 20:
            raise PermissionError()

        img_id = None

        if file_bytes is not None:
            await self.format_validator.validate(file_bytes)
            session_id = await self.session_creator.create_session()
            img_id = session_id

        meal = await self.repository.create(
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

        return meal
