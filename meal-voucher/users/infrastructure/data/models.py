import uuid
from sqlalchemy import (
    Column,
    String,
    Integer,
    Boolean,
    DateTime,
    func,
    Index,
    ForeignKey,
)
from app.data.base import Base


class User(Base):
    __tablename__ = "users"

    public_id = Column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        nullable=False,
    )
    phone = Column(String(20), nullable=False, unique=True)
    role = Column(Integer, nullable=False, default=1)
    username = Column(String(50), nullable=False)
    is_blocked = Column(Boolean, nullable=False, default=False)
    manager_id = Column(String(36), ForeignKey("users.public_id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    __table_args__ = (
        Index("idx_phone", "phone"),
        Index("idx_manager_id", "manager_id"),
        Index(
            "idx_username_trgm",
            "username",
            postgresql_using="gin",
            postgresql_ops={"username": "gin_trgm_ops"},
        ),
    )
