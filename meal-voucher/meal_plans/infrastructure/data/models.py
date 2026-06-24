from sqlalchemy import Column, Integer, Date, ForeignKey, Index, UniqueConstraint
from app.data.base import Base


class MealPlan(Base):
    __tablename__ = "meal_plan"

    id = Column(Integer, primary_key=True, autoincrement=True)

    plan_date = Column(Date, nullable=False)

    meal_id = Column(
        Integer,
        ForeignKey("meals.id", ondelete="CASCADE"),
        nullable=False,
    )

    __table_args__ = (
        UniqueConstraint("plan_date", "meal_id", name="uq_mealplan_date_meal"),
        Index("idx_mealplan_date", "plan_date"),
    )