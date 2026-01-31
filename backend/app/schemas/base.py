from typing import Any, Dict, List, OrderedDict
from pydantic import BaseModel, Field


class BaseLocalizedModel(BaseModel):
    accept_language: str = Field(default="en", exclude=True)


def order_data_by_fields(data: Dict[str, Any], field_order: List[str]) -> Dict[str, Any]:
    ordered = OrderedDict()
    for key in field_order:
        if key in data:
            ordered[key] = data[key]
    return ordered


USER_FIELD_ORDER = [
    'id', 'uid', 'email', 'first_name', 'last_name', 'image',
    'role', 'auth_provider', 'is_active', 'created_at',
]
