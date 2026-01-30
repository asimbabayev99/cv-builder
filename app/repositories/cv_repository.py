from typing import List, Optional

from sqlalchemy import delete, select
from sqlalchemy.orm import selectinload

from app.models.cv import (
    Certificate,
    CustomSection,
    Education,
    Experience,
    Language,
    Resume,
    Skill,
)
from .base_repository import BaseRepository


class CvRepository(BaseRepository):

    # ------------------------------------------------------------------
    # Resume CRUD
    # ------------------------------------------------------------------

    async def create_resume(self, user_id: int, title: str) -> Resume:
        resume = Resume(user_id=user_id, title=title)
        self.session.add(resume)
        await self.session.flush()
        return resume

    async def get_resume(self, resume_id: int, user_id: int) -> Optional[Resume]:
        stmt = (
            select(Resume)
            .where(Resume.id == resume_id, Resume.user_id == user_id)
            .options(
                selectinload(Resume.educations),
                selectinload(Resume.experiences),
                selectinload(Resume.skills),
                selectinload(Resume.languages),
                selectinload(Resume.certificates),
                selectinload(Resume.custom_sections),
            )
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_user_resumes(self, user_id: int) -> List[Resume]:
        stmt = (
            select(Resume)
            .where(Resume.user_id == user_id)
            .order_by(Resume.updated_at.desc().nullslast(), Resume.created_at.desc())
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def delete_resume(self, resume_id: int, user_id: int) -> bool:
        stmt = delete(Resume).where(
            Resume.id == resume_id, Resume.user_id == user_id
        )
        result = await self.session.execute(stmt)
        return result.rowcount > 0

    # ------------------------------------------------------------------
    # Personal info
    # ------------------------------------------------------------------

    async def update_personal_info(self, resume: Resume, data: dict) -> Resume:
        for key, value in data.items():
            if hasattr(resume, key):
                setattr(resume, key, value)
        await self.session.flush()
        return resume

    # ------------------------------------------------------------------
    # Template
    # ------------------------------------------------------------------

    async def update_template(
        self, resume: Resume, template_name: Optional[str], color_hex: Optional[str]
    ) -> Resume:
        if template_name is not None:
            resume.template_name = template_name
        if color_hex is not None:
            resume.color_hex = color_hex
        await self.session.flush()
        return resume

    # ------------------------------------------------------------------
    # Section replace helpers (delete-all + bulk-insert)
    # ------------------------------------------------------------------

    async def replace_education(self, resume_id: int, items: List[dict]) -> List[Education]:
        await self.session.execute(
            delete(Education).where(Education.resume_id == resume_id)
        )
        rows = [Education(resume_id=resume_id, **item) for item in items]
        self.session.add_all(rows)
        await self.session.flush()
        return rows

    async def replace_experience(self, resume_id: int, items: List[dict]) -> List[Experience]:
        await self.session.execute(
            delete(Experience).where(Experience.resume_id == resume_id)
        )
        rows = [Experience(resume_id=resume_id, **item) for item in items]
        self.session.add_all(rows)
        await self.session.flush()
        return rows

    async def replace_skills(self, resume_id: int, items: List[dict]) -> List[Skill]:
        await self.session.execute(
            delete(Skill).where(Skill.resume_id == resume_id)
        )
        rows = [Skill(resume_id=resume_id, **item) for item in items]
        self.session.add_all(rows)
        await self.session.flush()
        return rows

    async def replace_languages(self, resume_id: int, items: List[dict]) -> List[Language]:
        await self.session.execute(
            delete(Language).where(Language.resume_id == resume_id)
        )
        rows = [Language(resume_id=resume_id, **item) for item in items]
        self.session.add_all(rows)
        await self.session.flush()
        return rows

    async def replace_certificates(self, resume_id: int, items: List[dict]) -> List[Certificate]:
        await self.session.execute(
            delete(Certificate).where(Certificate.resume_id == resume_id)
        )
        rows = [Certificate(resume_id=resume_id, **item) for item in items]
        self.session.add_all(rows)
        await self.session.flush()
        return rows

    async def replace_custom_sections(self, resume_id: int, items: List[dict]) -> List[CustomSection]:
        await self.session.execute(
            delete(CustomSection).where(CustomSection.resume_id == resume_id)
        )
        rows = [CustomSection(resume_id=resume_id, **item) for item in items]
        self.session.add_all(rows)
        await self.session.flush()
        return rows
