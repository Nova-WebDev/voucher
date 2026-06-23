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
    username = Column(String(50), nullable=False)

    role = Column(Integer, nullable=False, default=1)

    branch_id = Column(
        String(36),
        ForeignKey("branches.id", ondelete="SET NULL"),
        nullable=True,
    )

    branch_role = Column(Integer, nullable=False, default=1)

    is_blocked = Column(Boolean, nullable=False, default=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    __table_args__ = (
        Index("idx_phone", "phone"),
        Index("idx_branch_id", "branch_id"),
        Index("idx_username", "username"),
    )