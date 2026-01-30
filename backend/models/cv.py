import enum
import uuid
from datetime import datetime, timezone
from typing import List, Optional

from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    Uuid,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.user import User


# ---------------------------------------------------------------------------
# Enums
# ---------------------------------------------------------------------------

class EmploymentType(str, enum.Enum):
    FULL_TIME = "full-time"
    PART_TIME = "part-time"
    CONTRACT = "contract"
    FREELANCE = "freelance"
    INTERNSHIP = "internship"


class SkillCategory(str, enum.Enum):
    TECHNICAL = "technical"
    SOFT = "soft"


class LanguageProficiency(str, enum.Enum):
    NATIVE = "native"
    FLUENT = "fluent"
    ADVANCED = "advanced"
    INTERMEDIATE = "intermediate"
    BEGINNER = "beginner"


# ---------------------------------------------------------------------------
# Resume (top-level entity per user)
# ---------------------------------------------------------------------------

class Resume(Base):
    __tablename__ = "resume"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    uid: Mapped[uuid.UUID] = mapped_column(Uuid, unique=True, default=uuid.uuid4)
    user_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("user.id"), index=True)
    title: Mapped[str] = mapped_column(String(255), default="Untitled Resume")

    # Template & styling
    template_name: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    color_hex: Mapped[Optional[str]] = mapped_column(String(7), nullable=True)

    # Personal info (header section of the CV)
    first_name: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    last_name: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    professional_title: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    email: Mapped[Optional[str]] = mapped_column(String(254), nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(30), nullable=True)
    location: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    photo_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)

    # Progress / scores
    completion: Mapped[int] = mapped_column(Integer, default=0)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True, onupdate=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    user: Mapped["User"] = relationship(back_populates="resumes")

    educations: Mapped[List["Education"]] = relationship(
        back_populates="resume", cascade="all, delete-orphan", order_by="Education.sort_order"
    )
    experiences: Mapped[List["Experience"]] = relationship(
        back_populates="resume", cascade="all, delete-orphan", order_by="Experience.sort_order"
    )
    skills: Mapped[List["Skill"]] = relationship(
        back_populates="resume", cascade="all, delete-orphan", order_by="Skill.sort_order"
    )
    languages: Mapped[List["Language"]] = relationship(
        back_populates="resume", cascade="all, delete-orphan", order_by="Language.sort_order"
    )
    certificates: Mapped[List["Certificate"]] = relationship(
        back_populates="resume", cascade="all, delete-orphan", order_by="Certificate.sort_order"
    )
    custom_sections: Mapped[List["CustomSection"]] = relationship(
        back_populates="resume", cascade="all, delete-orphan", order_by="CustomSection.sort_order"
    )


# ---------------------------------------------------------------------------
# Education
# ---------------------------------------------------------------------------

class Education(Base):
    __tablename__ = "education"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    resume_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("resume.id"), index=True)

    institution: Mapped[str] = mapped_column(String(200))
    degree: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    field_of_study: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    start_date: Mapped[Optional[str]] = mapped_column(String(7), nullable=True)  # YYYY-MM
    end_date: Mapped[Optional[str]] = mapped_column(String(7), nullable=True)    # YYYY-MM
    currently_studying: Mapped[bool] = mapped_column(Boolean, default=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    resume: Mapped["Resume"] = relationship(back_populates="educations")


# ---------------------------------------------------------------------------
# Work Experience
# ---------------------------------------------------------------------------

class Experience(Base):
    __tablename__ = "experience"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    resume_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("resume.id"), index=True)

    job_title: Mapped[str] = mapped_column(String(150))
    company: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    employment_type: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    location: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    start_date: Mapped[Optional[str]] = mapped_column(String(7), nullable=True)  # YYYY-MM
    end_date: Mapped[Optional[str]] = mapped_column(String(7), nullable=True)    # YYYY-MM
    currently_working: Mapped[bool] = mapped_column(Boolean, default=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    resume: Mapped["Resume"] = relationship(back_populates="experiences")


# ---------------------------------------------------------------------------
# Skills
# ---------------------------------------------------------------------------

class Skill(Base):
    __tablename__ = "skill"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    resume_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("resume.id"), index=True)

    name: Mapped[str] = mapped_column(String(100))
    category: Mapped[str] = mapped_column(String(20), default=SkillCategory.TECHNICAL)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    resume: Mapped["Resume"] = relationship(back_populates="skills")


# ---------------------------------------------------------------------------
# Languages
# ---------------------------------------------------------------------------

class Language(Base):
    __tablename__ = "language"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    resume_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("resume.id"), index=True)

    name: Mapped[str] = mapped_column(String(50))
    proficiency: Mapped[str] = mapped_column(String(20), default=LanguageProficiency.INTERMEDIATE)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    resume: Mapped["Resume"] = relationship(back_populates="languages")


# ---------------------------------------------------------------------------
# Certificates
# ---------------------------------------------------------------------------

class Certificate(Base):
    __tablename__ = "certificate"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    resume_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("resume.id"), index=True)

    name: Mapped[str] = mapped_column(String(200))
    organization: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    issue_date: Mapped[Optional[str]] = mapped_column(String(7), nullable=True)      # YYYY-MM
    expiration_date: Mapped[Optional[str]] = mapped_column(String(7), nullable=True)  # YYYY-MM
    no_expiry: Mapped[bool] = mapped_column(Boolean, default=False)
    credential_link: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    resume: Mapped["Resume"] = relationship(back_populates="certificates")


# ---------------------------------------------------------------------------
# Custom Sections (volunteer work, side projects, hobbies, etc.)
# ---------------------------------------------------------------------------

class CustomSection(Base):
    __tablename__ = "custom_section"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    resume_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("resume.id"), index=True)

    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    start_date: Mapped[Optional[str]] = mapped_column(String(7), nullable=True)  # YYYY-MM
    end_date: Mapped[Optional[str]] = mapped_column(String(7), nullable=True)    # YYYY-MM
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    resume: Mapped["Resume"] = relationship(back_populates="custom_sections")
