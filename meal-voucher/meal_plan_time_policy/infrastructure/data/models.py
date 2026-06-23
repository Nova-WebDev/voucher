from sqlalchemy import Column, Integer, Time
from app.data.base import Base


class MealPlanTimePolicy(Base):
    __tablename__ = "meal_plan_time_policy"

    id = Column(Integer, primary_key=True, autoincrement=True)

    day_index = Column(Integer, unique=True)
    offset_days = Column(Integer, nullable=False)

    cutoff_time = Column(Time, nullable=False)