from sqlalchemy.ext.asyncio import AsyncSession

from branch.core.use_cases.list_branches import ListBranches
from branch.core.use_cases.create_branch import CreateBranch
from branch.core.use_cases.update_branch import UpdateBranch
from branch.core.use_cases.delete_branch import DeleteBranch

from branch.infrastructure.data.repositories import BranchRepository


def get_create_branch_uc(session: AsyncSession) -> CreateBranch:
    return CreateBranch(
        repository=BranchRepository(session)
    )

def get_list_branches_uc(session: AsyncSession) -> ListBranches:
    return ListBranches(
        repository=BranchRepository(session)
    )

def get_update_branch_uc(session: AsyncSession) -> UpdateBranch:
    return UpdateBranch(
        repository=BranchRepository(session)
    )

def get_delete_branch_uc(session: AsyncSession) -> DeleteBranch:
    return DeleteBranch(
        repository=BranchRepository(session)
    )