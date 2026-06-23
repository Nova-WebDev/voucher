from abc import ABC, abstractmethod
from typing import List
from branch.core.entities.branch_entity import BranchEntity

class IBranchRepository(ABC):

    @abstractmethod
    async def create(self, name: str) -> BranchEntity:
        pass

    @abstractmethod
    async def list_all(self) -> List[BranchEntity]:
        pass

    @abstractmethod
    async def update(self, branch_id: str, new_name: str) -> BranchEntity:
        pass

    @abstractmethod
    async def delete(self, branch_id: str) -> None:
        pass
