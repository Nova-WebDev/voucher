from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.responses import Response

from di.meal_providers import get_create_meal_uc, get_get_meal_uc, get_get_meal_image_uc, get_toggle_meal_active_uc, get_update_meal_uc, get_list_meals_uc
from app.data.db import get_session
from schemas.meals.meal_item import MealItem
from app.security.dependencies import get_current_user
from app.utils.error_mapper import map_error


router = APIRouter(prefix="/meals", tags=["meals"])


@router.post("/create", response_model=MealItem)
async def create_meal(
    title: str = Form(...),
    description: str | None = Form(None),
    _user=Depends(get_current_user),
    file: UploadFile | None = File(None),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_create_meal_uc(session)
        file_bytes = await file.read() if file else None

        meal = await uc.execute(
            title=title,
            description=description,
            file_bytes=file_bytes,
            requester_role=_user["role"],
        )

        return MealItem(
            id=meal.id,
            title=meal.title,
            description=meal.description,
            img_id=meal.img_id,
            is_active=meal.is_active,
        )
    except Exception as e:
        raise map_error(e)


@router.get("/get/{meal_id}", response_model=MealItem)
async def get_meal(
    meal_id: int,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_get_meal_uc(session)
        meal = await uc.execute(meal_id)

        if not meal:
            raise HTTPException(status_code=404, detail="Meal not found")

        return MealItem(
            id=meal.id,
            title=meal.title,
            description=meal.description,
            img_id=meal.img_id,
            is_active=meal.is_active,
        )
    except Exception as e:
        raise map_error(e)


@router.get("/image/{img_id}")
async def get_meal_image(
    img_id: str,
    _user=Depends(get_current_user),
):
    try:
        uc = get_get_meal_image_uc()
        data = await uc.execute(img_id)
        return Response(content=data, media_type="image/png")
    except Exception as e:
        raise map_error(e)


@router.put("/active/{meal_id}")
async def toggle_meal_active(
    meal_id: int,
    is_active: bool,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_toggle_meal_active_uc(session)
        await uc.execute(
            meal_id=meal_id,
            is_active=is_active,
            requester_role=_user["role"],
        )
        return {"status": "ok"}
    except Exception as e:
        raise map_error(e)

@router.put("/update/{meal_id}", response_model=MealItem)
async def update_meal(
    meal_id: int,
    title: str = Form(...),
    description: str | None = Form(None),
    file: UploadFile | None = File(None),
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_update_meal_uc(session)
        file_bytes = await file.read() if file else None

        meal = await uc.execute(
            meal_id=meal_id,
            title=title,
            description=description,
            file_bytes=file_bytes,
            requester_role=_user["role"],
        )

        return MealItem(
            id=meal.id,
            title=meal.title,
            description=meal.description,
            img_id=meal.img_id,
            is_active=meal.is_active,
        )
    except Exception as e:
        raise map_error(e)

@router.get("/get-all", response_model=list[MealItem])
async def list_meals(
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_list_meals_uc(session)
        meals = await uc.execute()

        return [
            MealItem(
                id=m.id,
                title=m.title,
                description=m.description,
                img_id=m.img_id,
                is_active=m.is_active,
            )
            for m in meals
        ]
    except Exception as e:
        raise map_error(e)
