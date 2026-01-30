from typing import Awaitable, Callable, List

from fastapi import HTTPException, status

from app.core.uof import UnitOfWork
from app.models.user import User
from app.schemas.cv import (
    CertificateItem,
    CustomSectionItem,
    EducationItem,
    ExperienceItem,
    LanguageItem,
    PersonalInfoUpdate,
    ResumeCreateRequest,
    SkillItem,
    TemplateUpdate,
)
from .base_service import BaseService


class CvService(BaseService):
    def __init__(self, uow_factory: Callable[[], Awaitable[UnitOfWork]]):
        self.uow_factory = uow_factory

    # ------------------------------------------------------------------
    # Helpers
    # ------------------------------------------------------------------

    async def _get_owned_resume(self, uow, resume_id: int, user: User):
        resume = await uow.cv.get_resume(resume_id, user.id)
        if not resume:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Resume not found",
            )
        return resume

    # ------------------------------------------------------------------
    # Resume CRUD
    # ------------------------------------------------------------------

    async def create_resume(self, user: User, data: ResumeCreateRequest):
        async with self.uow_factory() as uow:
            return await uow.cv.create_resume(user.id, data.title)

    async def get_resume(self, resume_id: int, user: User):
        async with self.uow_factory() as uow:
            return await self._get_owned_resume(uow, resume_id, user)

    async def list_resumes(self, user: User):
        async with self.uow_factory() as uow:
            return await uow.cv.get_user_resumes(user.id)

    async def delete_resume(self, resume_id: int, user: User):
        async with self.uow_factory() as uow:
            deleted = await uow.cv.delete_resume(resume_id, user.id)
            if not deleted:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Resume not found",
                )

    # ------------------------------------------------------------------
    # Personal info
    # ------------------------------------------------------------------

    async def update_personal_info(
        self, resume_id: int, user: User, data: PersonalInfoUpdate
    ):
        async with self.uow_factory() as uow:
            resume = await self._get_owned_resume(uow, resume_id, user)
            return await uow.cv.update_personal_info(
                resume, data.model_dump(exclude_unset=True)
            )

    # ------------------------------------------------------------------
    # Template
    # ------------------------------------------------------------------

    async def update_template(self, resume_id: int, user: User, data: TemplateUpdate):
        async with self.uow_factory() as uow:
            resume = await self._get_owned_resume(uow, resume_id, user)
            return await uow.cv.update_template(
                resume, data.template_name, data.color_hex
            )

    # ------------------------------------------------------------------
    # Section replacements
    # ------------------------------------------------------------------

    async def replace_education(
        self, resume_id: int, user: User, items: List[EducationItem]
    ):
        async with self.uow_factory() as uow:
            await self._get_owned_resume(uow, resume_id, user)
            return await uow.cv.replace_education(
                resume_id, [i.model_dump() for i in items]
            )

    async def replace_experience(
        self, resume_id: int, user: User, items: List[ExperienceItem]
    ):
        async with self.uow_factory() as uow:
            await self._get_owned_resume(uow, resume_id, user)
            return await uow.cv.replace_experience(
                resume_id, [i.model_dump() for i in items]
            )

    async def replace_skills(
        self, resume_id: int, user: User, items: List[SkillItem]
    ):
        async with self.uow_factory() as uow:
            await self._get_owned_resume(uow, resume_id, user)
            return await uow.cv.replace_skills(
                resume_id, [i.model_dump() for i in items]
            )

    async def replace_languages(
        self, resume_id: int, user: User, items: List[LanguageItem]
    ):
        async with self.uow_factory() as uow:
            await self._get_owned_resume(uow, resume_id, user)
            return await uow.cv.replace_languages(
                resume_id, [i.model_dump() for i in items]
            )

    async def replace_certificates(
        self, resume_id: int, user: User, items: List[CertificateItem]
    ):
        async with self.uow_factory() as uow:
            await self._get_owned_resume(uow, resume_id, user)
            return await uow.cv.replace_certificates(
                resume_id, [i.model_dump() for i in items]
            )

    async def replace_custom_sections(
        self, resume_id: int, user: User, items: List[CustomSectionItem]
    ):
        async with self.uow_factory() as uow:
            await self._get_owned_resume(uow, resume_id, user)
            return await uow.cv.replace_custom_sections(
                resume_id, [i.model_dump() for i in items]
            )

    # ------------------------------------------------------------------
    # Export
    # ------------------------------------------------------------------

    async def get_resume_for_export(self, resume_id: int, user: User):
        """Return the resume ORM object for export (PDF/DOCX generation)."""
        async with self.uow_factory() as uow:
            return await self._get_owned_resume(uow, resume_id, user)
