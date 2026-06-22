from dataclasses import dataclass

@dataclass(frozen=True)
class AuthSessionEntity:
    public_id: str
    phone_number: str
    role: int