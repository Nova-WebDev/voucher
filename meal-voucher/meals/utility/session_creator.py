import uuid
from meals.core.interfaces.image_session_creator import IImageSessionCreator


class LocalImageSessionCreator(IImageSessionCreator):

    async def create_session(self) -> str:
        return str(uuid.uuid4())
