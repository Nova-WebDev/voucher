from abc import ABC, abstractmethod

class IImageSessionCreator(ABC):

    @abstractmethod
    async def create_session(self) -> str:

        pass
