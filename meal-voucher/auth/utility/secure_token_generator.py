import secrets
from auth.core.interfaces.code_generator import IGenerator


class SecureTokenGenerator(IGenerator):
    def __init__(self, length: int = 32):
        self.length = length

    async def generate(self) -> str:
        return secrets.token_urlsafe(self.length)
