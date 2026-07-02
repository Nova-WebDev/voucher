from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import Response

from di.voucher_providers import get_create_voucher_uc, get_delete_voucher_uc, get_check_voucher_exists_uc, get_branch_vouchers_uc, get_mealplan_vouchers_for_admin_uc, provide_build_voucher_report_usecase
from di.user_providers import get_validate_branch_users_uc, get_check_branch_id_uc
from app.data.db import get_session
from app.security.dependencies import get_current_user
from app.utils.error_mapper import map_error
from schemas.voucher.create_voucher_schema import CreateVoucherRequest
from schemas.voucher.delete_voucher_schema import DeleteVoucherRequest
from schemas.voucher.check_voucher_schema import CheckVoucherRequest
from schemas.voucher.get_branch_vouchers_schema import GetBranchVouchersRequest
from schemas.voucher.get_mealplan_vouchers_for_admin_schema import GetMealPlanVouchersForAdminRequest
from schemas.voucher.create_voucher_branch_schema import CreateVoucherBranchRequest
from schemas.voucher.delete_voucher_branch_schema import DeleteVoucherBranchRequest



router = APIRouter(prefix="/voucher", tags=["voucher"])


@router.post("/create")
async def create_voucher(
    data: CreateVoucherRequest,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_create_voucher_uc(session)

        vouchers = await uc.execute(
            user_public_ids=[_user["public_id"]],
            meal_plan_id=data.meal_plan_id,
        )

        v = vouchers[0]

        return {
            "id": v.id,
            "user_public_id": v.user_public_id,
            "meal_plan_id": v.meal_plan_id,
            "created_at": v.created_at,
        }


    except Exception as e:
        raise map_error(e)

@router.post("/delete")
async def delete_voucher(
    data: DeleteVoucherRequest,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_delete_voucher_uc(session)

        await uc.execute(
            meal_plan_id=data.meal_plan_id,
            user_public_ids=[_user["public_id"]],
        )

        return {"status": "deleted"}

    except Exception as e:
        raise map_error(e)

@router.post("/exists")
async def check_voucher_exists(
    data: CheckVoucherRequest,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_check_voucher_exists_uc(session)

        exists = await uc.execute(
            user_public_id=_user["public_id"],
            meal_plan_id=data.meal_plan_id,
        )

        return {"exists": exists}

    except Exception as e:
        raise map_error(e)

@router.post("/branch")
async def get_branch_vouchers(
    data: GetBranchVouchersRequest,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_branch_vouchers_uc(session)

        vouchers = await uc.execute(
            requester_public_id=_user["public_id"],
            meal_plan_id=data.meal_plan_id,
        )

        return [
            {
                "id": v.id,
                "user_public_id": v.user_public_id,
                "meal_plan_id": v.meal_plan_id,
                "created_at": v.created_at,
            }
            for v in vouchers
        ]

    except Exception as e:
        raise map_error(e)


@router.post("/admin/mealplan")
async def get_mealplan_vouchers_for_admin(
    data: GetMealPlanVouchersForAdminRequest,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        uc = get_mealplan_vouchers_for_admin_uc(session)

        result = await uc.execute(
            admin_role=_user["role"],
            meal_plan_id=data.meal_plan_id,
        )

        return result

    except Exception as e:
        raise map_error(e)

@router.post("/branch/create/list")
async def create_voucher_branch(
    data: CreateVoucherBranchRequest,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        if _user["role"] != 20:
            validate_uc = get_validate_branch_users_uc(session)
            await validate_uc.execute(
                requester_public_id=_user["public_id"],
                target_public_ids=data.public_ids,
            )

        uc = get_create_voucher_uc(session)

        vouchers = await uc.execute(
            user_public_ids=data.public_ids,
            meal_plan_id=data.meal_plan_id,
        )

        return [
            {
                "id": v.id,
                "user_public_id": v.user_public_id,
                "meal_plan_id": v.meal_plan_id,
                "created_at": v.created_at,
            }
            for v in vouchers
        ]

    except Exception as e:
        raise map_error(e)

@router.post("/branch/delete/user")
async def delete_voucher_branch(
    data: DeleteVoucherBranchRequest,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        if _user["role"] != 20:
            validate_uc = get_validate_branch_users_uc(session)
            await validate_uc.execute(
                requester_public_id=_user["public_id"],
                target_public_ids=data.public_ids,
            )

        uc = get_delete_voucher_uc(session)

        await uc.execute(
            meal_plan_id=data.meal_plan_id,
            user_public_ids=data.public_ids,
        )

        return {"status": "deleted"}

    except Exception as e:
        raise map_error(e)


@router.get("/report")
async def voucher_report(
    meal_plan_id: int,
    branch_id: str | None = None,
    _user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        check_branch_id_uc = get_check_branch_id_uc(session)
        await check_branch_id_uc.execute(_user["public_id"], branch_id, _user["role"])

        uc = provide_build_voucher_report_usecase(session)

        pdf_bytes = await uc.execute(
            meal_plan_id=meal_plan_id,
            branch_id=branch_id,
        )

        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": 'inline; filename="voucher-report.pdf"'
            }
        )

    except Exception as e:
        raise map_error(e)
