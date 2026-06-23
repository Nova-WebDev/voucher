from meals.core.interfaces.image_processor import IImageProcessor


class GetMealImage:
    def __init__(self, image_processor: IImageProcessor):
        self.image_processor = image_processor

    async def execute(self, img_id: str) -> bytes:
        return await self.image_processor.load(img_id)
