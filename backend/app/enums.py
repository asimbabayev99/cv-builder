from enum import Enum


class TextStatusReason(str, Enum):
    inappropriate_content = "inappropriate_content"
    violence = "violence"


class VideoStatusReason(str, Enum):
    inappropriate_content = "inappropriate_content"
    violence = "violence"


class ImageStatusReason(str, Enum):
    inappropriate_content = "inappropriate_content"
    violence = "violence"


class UserChangeStatusReason(str, Enum): 
    inappropriate_content = "inappropriate_content"
    violence = "violence"


class PerformerStatusReason(str, Enum):
    inappropriate_content = "inappropriate_content"
    violence = "violence"


class VerificationStatusReason(str, Enum): 
    inappropriate_content = "inappropriate_content"
    violence = "violence"


class BannerVerificationStatusReason(str, Enum):
    inappropriate_content = "inappropriate_content"
    violence = "violence"


class ReviewVerificationStatusReason(str, Enum):
    inappropriate_content = "inappropriate_content"
    violence = "violence"

class ReviewAttachmentStatusReason(str, Enum):
    inappropriate_content = "inappropriate_content"
    violence = "violence"


class OrderStatusReason(str, Enum):
    inappropriate_content = "inappropriate_content"
    violence = "violence"


class OrderAttachmentStatusReason(str, Enum):
    inappropriate_content = "inappropriate_content"
    violence = "violence"


class PerformerCertificateStatusReason(str, Enum):
    inappropriate_content = "inappropriate_content"
    violence = "violence"


class PerformerServiceStatusReason(str, Enum):
    inappropriate_content = "inappropriate_content"
    violence = "violence"


class PerformerServiceAttachmentStatusReason(str, Enum):
    inappropriate_content = "inappropriate_content"
    violence = "violence"


class PerformerVideoStatusReason(str, Enum):
    inappropriate_content = "inappropriate_content"
    violence = "violence"



TEXT_REASON_DESCRIPTIONS = {
    TextStatusReason.inappropriate_content: {
        "ru": "Содержит неприемлемый или непристойный контент",
        "az": "Uyğunsuz və ya açıq-saçıq məzmun ehtiva edir",
    },
    TextStatusReason.violence: {
        "ru": "Сцены насилия или жестокости",
        "az": "Zorakılıq və qəddarlıq səhnələri mövcuddur",
    },
}


IMAGE_REASON_DESCRIPTIONS = {
    ImageStatusReason.inappropriate_content: {
        "ru": "Содержит неприемлемый или непристойный контент",
        "az": "Uyğunsuz və ya açıq-saçıq məzmun ehtiva edir",
    },
    ImageStatusReason.violence: {
        "ru": "Сцены насилия или жестокости",
        "az": "Zorakılıq və qəddarlıq səhnələri mövcuddur",
    },
}

VIDEO_REASON_DESCRIPTIONS = {
    VideoStatusReason.inappropriate_content: {
        "ru": "Содержит неприемлемый или непристойный контент",
        "az": "Uyğunsuz və ya açıq-saçıq məzmun ehtiva edir",
    },
    VideoStatusReason.violence: {
        "ru": "Сцены насилия или жестокости",
        "az": "Zorakılıq və qəddarlıq səhnələri mövcuddur",
    },
}


USER_CHANGE_REASON_DESCRIPTION = {
    UserChangeStatusReason.inappropriate_content: {
        "ru": "Содержит неприемлемый или непристойный контент",
        "az": "Uyğunsuz və ya açıq-saçıq məzmun ehtiva edir",
    },
    UserChangeStatusReason.violence: {
        "ru": "Сцены насилия или жестокости",
        "az": "Zorakılıq və qəddarlıq səhnələri mövcuddur",
    },
}


PERFORMER_STATUS_REASON_DESCRIPTION = {
    PerformerStatusReason.inappropriate_content: {
        "ru": "Содержит неприемлемый или непристойный контент",
        "az": "Uyğunsuz və ya açıq-saçıq məzmun ehtiva edir",
    },
    PerformerStatusReason.violence: {
        "ru": "Сцены насилия или жестокости",
        "az": "Zorakılıq və qəddarlıq səhnələri mövcuddur",
    },
}


VERIFICATION_REASON_DESCRIPTIONS = {
    VerificationStatusReason.inappropriate_content: {
        "ru": "Содержит неприемлемый или непристойный контент",
        "az": "Uyğunsuz və ya açıq-saçıq məzmun ehtiva edir",
    },
    VerificationStatusReason.violence: {
        "ru": "Сцены насилия или жестокости",
        "az": "Zorakılıq və qəddarlıq səhnələri mövcuddur",
    },
}


BANNER_STATUS_REASON_DESCRIPTIONS = {
    BannerVerificationStatusReason.inappropriate_content: {
        "ru": "Содержит неприемлемый или непристойный контент",
        "az": "Uyğunsuz və ya açıq-saçıq məzmun ehtiva edir",
    },
    BannerVerificationStatusReason.violence: {
        "ru": "Сцены насилия или жестокости",
        "az": "Zorakılıq və qəddarlıq səhnələri mövcuddur",
    },
}


ORDER_STATUS_REASON_DESCRIPTIONS = {
    OrderStatusReason.inappropriate_content: {
        "ru": "Содержит неприемлемый или непристойный контент",
        "az": "Uyğunsuz və ya açıq-saçıq məzmun ehtiva edir",
    },
    OrderStatusReason.violence: {
        "ru": "Сцены насилия или жестокости",
        "az": "Zorakılıq və qəddarlıq səhnələri mövcuddur",
    },
}


ORDER_ATTACHMENT_STATUS_REASON_DESCRIPTIONS = {
    OrderAttachmentStatusReason.inappropriate_content: {
        "ru": "Содержит неприемлемый или непристойный контент",
        "az": "Uyğunsuz və ya açıq-saçıq məzmun ehtiva edir",
    },
    OrderAttachmentStatusReason.violence: {
        "ru": "Сцены насилия или жестокости",
        "az": "Zorakılıq və qəddarlıq səhnələri mövcuddur",
    },
}


PERFORMER_CERTIFICATE_STATUS_REASON_DESCRIPTIONS = {
    PerformerCertificateStatusReason.inappropriate_content: {
        "ru": "Содержит неприемлемый или непристойный контент",
        "az": "Uyğunsuz və ya açıq-saçıq məzmun ehtiva edir",
    },
    PerformerCertificateStatusReason.violence: {
        "ru": "Сцены насилия или жестокости",
        "az": "Zorakılıq və qəddarlıq səhnələri mövcuddur",
    },
}


PERFORMER_SERVICE_STATUS_REASON_DESCRIPTIONS = {
    PerformerServiceStatusReason.inappropriate_content: {
        "ru": "Содержит неприемлемый или непристойный контент",
        "az": "Uyğunsuz və ya açıq-saçıq məzmun ehtiva edir",
    },
    PerformerServiceStatusReason.violence: {
        "ru": "Сцены насилия или жестокости",
        "az": "Zorakılıq və qəddarlıq səhnələri mövcuddur",
    },
}


PERFORMER_SERVICE_ATTACHMENT_STATUS_REASON_DESCRIPTIONS = {
    PerformerServiceAttachmentStatusReason.inappropriate_content: {
        "ru": "Содержит неприемлемый или непристойный контент",
        "az": "Uyğunsuz və ya açıq-saçıq məzmun ehtiva edir",
    },
    PerformerServiceAttachmentStatusReason.violence: {
        "ru": "Сцены насилия или жестокости",
        "az": "Zorakılıq və qəddarlıq səhnələri mövcuddur",
    },
}


REVIEW_STATUS_REASON_DESCRIPTIONS = {
    ReviewVerificationStatusReason.inappropriate_content: {
        "ru": "Содержит неприемлемый или непристойный контент",
        "az": "Uyğunsuz və ya açıq-saçıq məzmun ehtiva edir",
    },
    ReviewVerificationStatusReason.violence: {
        "ru": "Сцены насилия или жестокости",
        "az": "Zorakılıq və qəddarlıq səhnələri mövcuddur",
    },
}

REVIEW_ATTACHMENT_STATUS_REASON_DESCRIPTIONS = {
    ReviewAttachmentStatusReason.inappropriate_content: {
        "ru": "Содержит неприемлемый или непристойный контент",
        "az": "Uyğunsuz və ya açıq-saçıq məzmun ehtiva edir",
    },
    ReviewAttachmentStatusReason.violence: {
        "ru": "Сцены насилия или жестокости",
        "az": "Zorakılıq və qəddarlıq səhnələri mövcuddur",
    },
}

PERFORMER_VIDEO_STATUS_REASON_DESCRIPTIONS = {
    PerformerVideoStatusReason.inappropriate_content: {
        "ru": "Содержит неприемлемый или непристойный контент",
        "az": "Uyğunsuz və ya açıq-saçıq məzmun ehtiva edir",
    },
    PerformerVideoStatusReason.violence: {
        "ru": "Сцены насилия или жестокости",
        "az": "Zorakılıq və qəddarlıq səhnələri mövcuddur",
    },
}



