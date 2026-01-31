from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel


# ---------------------------------------------------------------------------
# Request models
# ---------------------------------------------------------------------------

class ResumeCreateRequest(BaseModel):
    title: str = "Untitled Resume"


class PersonalInfoUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    professional_title: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    summary: Optional[str] = None
    photo_url: Optional[str] = None


class EducationItem(BaseModel):
    institution: str
    degree: Optional[str] = None
    field_of_study: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    currently_studying: bool = False
    description: Optional[str] = None
    sort_order: int = 0


class ExperienceItem(BaseModel):
    job_title: str
    company: Optional[str] = None
    employment_type: Optional[str] = None
    location: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    currently_working: bool = False
    description: Optional[str] = None
    sort_order: int = 0


class SkillItem(BaseModel):
    name: str
    category: str = "technical"
    sort_order: int = 0


class LanguageItem(BaseModel):
    name: str
    proficiency: str = "intermediate"
    sort_order: int = 0


class CertificateItem(BaseModel):
    name: str
    organization: Optional[str] = None
    issue_date: Optional[str] = None
    expiration_date: Optional[str] = None
    no_expiry: bool = False
    credential_link: Optional[str] = None
    description: Optional[str] = None
    sort_order: int = 0


class CustomSectionItem(BaseModel):
    title: str
    description: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    sort_order: int = 0


class TemplateUpdate(BaseModel):
    template_name: Optional[str] = None
    color_hex: Optional[str] = None


# ---------------------------------------------------------------------------
# Response models
# ---------------------------------------------------------------------------

class EducationOut(BaseModel):
    id: int
    institution: str
    degree: Optional[str] = None
    field_of_study: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    currently_studying: bool
    description: Optional[str] = None
    sort_order: int

    model_config = {"from_attributes": True}


class ExperienceOut(BaseModel):
    id: int
    job_title: str
    company: Optional[str] = None
    employment_type: Optional[str] = None
    location: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    currently_working: bool
    description: Optional[str] = None
    sort_order: int

    model_config = {"from_attributes": True}


class SkillOut(BaseModel):
    id: int
    name: str
    category: str
    sort_order: int

    model_config = {"from_attributes": True}


class LanguageOut(BaseModel):
    id: int
    name: str
    proficiency: str
    sort_order: int

    model_config = {"from_attributes": True}


class CertificateOut(BaseModel):
    id: int
    name: str
    organization: Optional[str] = None
    issue_date: Optional[str] = None
    expiration_date: Optional[str] = None
    no_expiry: bool
    credential_link: Optional[str] = None
    description: Optional[str] = None
    sort_order: int

    model_config = {"from_attributes": True}


class CustomSectionOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    sort_order: int

    model_config = {"from_attributes": True}


class ResumeResponse(BaseModel):
    id: int
    uid: str
    title: str
    template_name: Optional[str] = None
    color_hex: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    professional_title: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    summary: Optional[str] = None
    photo_url: Optional[str] = None
    completion: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    educations: List[EducationOut] = []
    experiences: List[ExperienceOut] = []
    skills: List[SkillOut] = []
    languages: List[LanguageOut] = []
    certificates: List[CertificateOut] = []
    custom_sections: List[CustomSectionOut] = []

    model_config = {"from_attributes": True}


class ResumeListItem(BaseModel):
    id: int
    uid: str
    title: str
    completion: int
    template_name: Optional[str] = None
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}
