class UpdateMyName:
    def __init__(self, repository):
        self.repository = repository

    async def execute(
        self,
        public_id: str,
        new_name: str,
    ) -> str:

        return await self.repository.update_my_name(
            public_id=public_id,
            new_name=new_name,
        )
