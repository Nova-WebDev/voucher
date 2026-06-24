from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.auth import router as auth_router
from routers.branch import router as branch_router
from routers.user import router as user_router
from routers.meals import router as meals_router
from routers.meal_plans import router as meal_plans_router
from routers.meal_plan_time_policy import router as meal_plan_time_router
from routers.meal_plan_recurring import router as meal_plan_recurring_router
from routers.voucher import router as voucher_router

from app.data.init_db import init_db

@asynccontextmanager
async def lifespan(_app: FastAPI):
    await init_db()
    yield

app = FastAPI(
    lifespan=lifespan,
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(branch_router)
app.include_router(user_router)
app.include_router(meals_router)
app.include_router(meal_plans_router)
app.include_router(meal_plan_time_router)
app.include_router(meal_plan_recurring_router)
app.include_router(voucher_router)