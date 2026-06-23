from sqlalchemy import Column, Integer, ForeignKey, Date
from app.data.base import Base


class MealPlanRecurring(Base):
    __tablename__ = "meal_plan_recurring"

    id = Column(Integer, primary_key=True, autoincrement=True)

    meal_plan_id = Column(
        Integer,
        ForeignKey("meal_plan.id", ondelete="CASCADE"),
        nullable=False,
    )

    target_date = Column(Date, nullable=False)

    order_index = Column(Integer, nullable=False, default=0)