from sqlalchemy import Column, String, Boolean, Integer, Text
from app.data.base import Base


class Meal(Base):
    __tablename__ = "meals"

    id = Column(Integer, primary_key=True, autoincrement=True)

    title = Column(String(100), nullable=False)

    description = Column(Text, nullable=True)

    img_id = Column(String(255), nullable=True)

    is_active = Column(Boolean, nullable=False, default=True)

    __table_args__ = ()