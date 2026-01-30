import io
from typing import List

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from dependency_injector.wiring import Provide, inject

from app.core.container import Container
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.cv import (
    CertificateItem,
    CustomSectionItem,
    EducationItem,
    ExperienceItem,
    LanguageItem,
    PersonalInfoUpdate,
    ResumeCreateRequest,
    ResumeListItem,
    ResumeResponse,
    SkillItem,
    TemplateUpdate,
)
from app.services.cv_service import CvService
from app.services.export_service import ExportService

router = APIRouter(tags=["Resumes"])


@router.post("", response_model=ResumeResponse)
@inject
async def create_resume(
    data: ResumeCreateRequest,
    current_user: User = Depends(get_current_user),
    service: CvService = Depends(Provide[Container.cv_service]),
) -> ResumeResponse:
    resume = await service.create_resume(current_user, data)
    return ResumeResponse.model_validate(resume)


@router.get("", response_model=List[ResumeListItem])
@inject
async def list_resumes(
    current_user: User = Depends(get_current_user),
    service: CvService = Depends(Provide[Container.cv_service]),
) -> List[ResumeListItem]:
    resumes = await service.list_resumes(current_user)
    return [ResumeListItem.model_validate(r) for r in resumes]


@router.get("/{resume_id}", response_model=ResumeResponse)
@inject
async def get_resume(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    service: CvService = Depends(Provide[Container.cv_service]),
) -> ResumeResponse:
    resume = await service.get_resume(resume_id, current_user)
    return ResumeResponse.model_validate(resume)


@router.delete("/{resume_id}")
@inject
async def delete_resume(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    service: CvService = Depends(Provide[Container.cv_service]),
):
    await service.delete_resume(resume_id, current_user)
    return {"detail": "Resume deleted"}


@router.put("/{resume_id}/personal-info", response_model=ResumeResponse)
@inject
async def update_personal_info(
    resume_id: int,
    data: PersonalInfoUpdate,
    current_user: User = Depends(get_current_user),
    service: CvService = Depends(Provide[Container.cv_service]),
) -> ResumeResponse:
    resume = await service.update_personal_info(resume_id, current_user, data)
    return ResumeResponse.model_validate(resume)


@router.put("/{resume_id}/education")
@inject
async def replace_education(
    resume_id: int,
    items: List[EducationItem],
    current_user: User = Depends(get_current_user),
    service: CvService = Depends(Provide[Container.cv_service]),
):
    await service.replace_education(resume_id, current_user, items)
    return {"detail": "Education updated"}


@router.put("/{resume_id}/experience")
@inject
async def replace_experience(
    resume_id: int,
    items: List[ExperienceItem],
    current_user: User = Depends(get_current_user),
    service: CvService = Depends(Provide[Container.cv_service]),
):
    await service.replace_experience(resume_id, current_user, items)
    return {"detail": "Experience updated"}


@router.put("/{resume_id}/skills")
@inject
async def replace_skills(
    resume_id: int,
    items: List[SkillItem],
    current_user: User = Depends(get_current_user),
    service: CvService = Depends(Provide[Container.cv_service]),
):
    await service.replace_skills(resume_id, current_user, items)
    return {"detail": "Skills updated"}


@router.put("/{resume_id}/languages")
@inject
async def replace_languages(
    resume_id: int,
    items: List[LanguageItem],
    current_user: User = Depends(get_current_user),
    service: CvService = Depends(Provide[Container.cv_service]),
):
    await service.replace_languages(resume_id, current_user, items)
    return {"detail": "Languages updated"}


@router.put("/{resume_id}/certificates")
@inject
async def replace_certificates(
    resume_id: int,
    items: List[CertificateItem],
    current_user: User = Depends(get_current_user),
    service: CvService = Depends(Provide[Container.cv_service]),
):
    await service.replace_certificates(resume_id, current_user, items)
    return {"detail": "Certificates updated"}


@router.put("/{resume_id}/custom-sections")
@inject
async def replace_custom_sections(
    resume_id: int,
    items: List[CustomSectionItem],
    current_user: User = Depends(get_current_user),
    service: CvService = Depends(Provide[Container.cv_service]),
):
    await service.replace_custom_sections(resume_id, current_user, items)
    return {"detail": "Custom sections updated"}


@router.put("/{resume_id}/template", response_model=ResumeResponse)
@inject
async def update_template(
    resume_id: int,
    data: TemplateUpdate,
    current_user: User = Depends(get_current_user),
    service: CvService = Depends(Provide[Container.cv_service]),
) -> ResumeResponse:
    resume = await service.update_template(resume_id, current_user, data)
    return ResumeResponse.model_validate(resume)


@router.get("/{resume_id}/export/pdf")
@inject
async def export_pdf(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    service: CvService = Depends(Provide[Container.cv_service]),
):
    resume = await service.get_resume_for_export(resume_id, current_user)
    pdf_bytes = ExportService.generate_pdf(resume)
    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="resume_{resume_id}.pdf"'},
    )


@router.get("/{resume_id}/export/docx")
@inject
async def export_docx(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    service: CvService = Depends(Provide[Container.cv_service]),
):
    resume = await service.get_resume_for_export(resume_id, current_user)
    docx_bytes = ExportService.generate_docx(resume)
    return StreamingResponse(
        io.BytesIO(docx_bytes),
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": f'attachment; filename="resume_{resume_id}.docx"'},
    )
