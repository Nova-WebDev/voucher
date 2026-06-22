from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime,
    func,
    Index,
    UniqueConstraint,
)
from app.data.base import Base


class Voucher(Base):
    __tablename__ = "voucher"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_public_id = Column(
        String(36),
        ForeignKey("users.public_id", ondelete="CASCADE"),
        nullable=False,
    )

    meal_plan_id = Column(
        Integer,
        ForeignKey("meal_plan.id", ondelete="CASCADE"),
        nullable=False,
    )

    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    __table_args__ = (
        UniqueConstraint("user_public_id", "meal_plan_id", name="uq_voucher_user_mealplan"),
        Index("idx_voucher_user", "user_public_id"),
        Index("idx_voucher_mealplan", "meal_plan_id"),
    )
