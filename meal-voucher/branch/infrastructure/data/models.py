import uuid
from sqlalchemy import Column, String
from app.data.base import Base


class Branch(Base):
    __tablename__ = "branches"

    id = Column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        nullable=False,
    )

    name = Column(String(100), nullable=False)