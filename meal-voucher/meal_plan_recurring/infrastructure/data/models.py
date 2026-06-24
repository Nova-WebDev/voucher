from sqlalchemy import Column, Integer, ForeignKey, Date
from app.data.base import Base


class MealPlanRecurring(Base):
    __tablename__ = "meal_plan_recurring"

    id = Column(Integer, primary_key=True, autoincrement=True)

    meal_id = Column(
        Integer,
        ForeignKey("meals.id", ondelete="CASCADE"),
        nullable=True,
    )

    target_date = Column(Date, nullable=False)

    order_index = Column(Integer, nullable=False, default=0)
