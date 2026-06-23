from abc import ABC, abstractmethod

class IImageProcessor(ABC):

    @abstractmethod
    async def process(
        self,
        session_id: str,
        file_bytes: bytes,
        resize_to: tuple[int, int] | None = None,
        force_png: bool = True,
    ) -> None:
        pass

    @abstractmethod
    async def load(self, session_id: str) -> bytes:
        pass

    @abstractmethod
    async def delete(self, session_id: str) -> None:
        pass
