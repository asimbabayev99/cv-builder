# Backend API Improvements & Optimization Suggestions

This document outlines recommendations for further improving the codebase architecture, performance, and maintainability.

## Table of Contents
- [Completed Improvements](#completed-improvements)
- [Architecture Recommendations](#architecture-recommendations)
- [Performance Optimizations](#performance-optimizations)
- [Security Enhancements](#security-enhancements)
- [Code Quality Improvements](#code-quality-improvements)
- [Testing Recommendations](#testing-recommendations)
- [Monitoring & Observability](#monitoring--observability)

---

## Completed Improvements

### Bug Fixes
- ✅ Fixed missing `await` in `delete_user()` method (`user_repository.py`)
- ✅ Fixed duplicate function names in admin performer endpoints
- ✅ Fixed typos in function names (`get_curernt_websocket_user`, `get_perforemrs_*`)

### Code Cleanup
- ✅ Removed all debug `print()` statements
- ✅ Removed commented-out dead code
- ✅ Added comprehensive docstrings to all dependency functions

### Security
- ✅ Moved Sentry DSN to environment variables
- ✅ Made CORS origins configurable via environment
- ✅ Reduced Sentry trace sample rate for production

### Logging
- ✅ Created centralized logging configuration (`app/core/logging.py`)
- ✅ Replaced print statements with structured logging
- ✅ Added slow request detection (>1s) with warnings

### Database
- ✅ Added indexes on frequently filtered columns (`user`, `performer`)

---

## Architecture Recommendations

### 1. Implement Repository Interface Pattern
Create abstract base classes for repositories to enable easier testing and swapping implementations.

```python
# app/repositories/interfaces.py
from abc import ABC, abstractmethod

class IUserRepository(ABC):
    @abstractmethod
    async def get_by_id(self, id: int) -> User: ...

    @abstractmethod
    async def get_by_username(self, username: str) -> User: ...
```

### 2. Extract Business Logic from Repositories
Some repositories contain business logic that should be in services:

**Current (`user_repository.py:309-324`):**
```python
async def approve_change(self, change: UserChanges):
    if change.field_name == "first_name":
        stmt = update(User)...
    elif change.field_name == "last_name":
        ...
```

**Recommended:** Move field-specific logic to a service or use a strategy pattern.

### 3. Consolidate Duplicate Query Loading Strategies
Multiple repositories have similar `selectinload` chains:

```python
# Create a reusable loader configuration
class LoaderConfig:
    USER_WITH_PERFORMER = [
        selectinload(User.performer).selectinload(Performer.city),
        selectinload(User.changes)
    ]

    USER_DETAILED = [
        *USER_WITH_PERFORMER,
        selectinload(User.performer).selectinload(Performer.certificates),
        ...
    ]
```

### 4. Implement Domain Events
For operations that trigger side effects (e.g., user registration → send welcome email):

```python
# app/events/user_events.py
class UserRegistered:
    user_id: int
    email: str

# app/events/handlers.py
@event_handler(UserRegistered)
async def send_welcome_email(event: UserRegistered):
    ...
```

---

## Performance Optimizations

### 1. Implement Response Caching
Add Redis caching for frequently accessed, rarely changing data:

```python
# Categories, Cities, Banners could be cached
@cached(ttl=300)  # 5 minutes
async def get_categories(self) -> List[Category]:
    ...
```

**Priority targets:**
- Category listings
- City listings
- Active banners
- Performer public profiles

### 2. Optimize N+1 Queries
Review and optimize these locations:

| File | Method | Issue |
|------|--------|-------|
| `chat_repository.py:22-45` | `get_all_chats()` | Deep nested selectinload |
| `user_repository.py:71-87` | `get_user_performer_detailed()` | Multiple selectinload calls |

**Recommendation:** Use `joinedload` for single relationships, `selectinload` for collections.

### 3. Implement Pagination Cursor
Replace offset-based pagination with cursor-based for large datasets:

```python
# Current: /performers?page=100 (slow - needs to skip 99 pages)
# Better: /performers?after=cursor_token (constant time)
```

### 4. Add Database Connection Pooling Tuning
Review pool settings in `database.py`:

```python
engine = create_async_engine(
    DATABASE_URI,
    pool_size=20,           # Increase for high traffic
    max_overflow=10,
    pool_pre_ping=True,     # Detect stale connections
    pool_recycle=3600,      # Recycle connections hourly
)
```

### 5. Implement Bulk Operations
For batch updates (e.g., admin status changes):

```python
# Instead of looping with individual updates
async def bulk_update_status(self, ids: List[int], status: str):
    stmt = update(Model).where(Model.id.in_(ids)).values(status=status)
    await self.session.execute(stmt)
```

---

## Security Enhancements

### 1. Add Rate Limiting
Implement rate limiting on sensitive endpoints:

```python
from slowapi import Limiter

limiter = Limiter(key_func=get_remote_address)

@app.post("/api/v1/user/login")
@limiter.limit("5/minute")
async def login(...):
    ...
```

**Priority endpoints:**
- `/login` - 5 requests/minute per IP
- `/sign-up` - 3 requests/minute per IP
- `/otp/*` - 3 requests/minute per phone

### 2. Strengthen Password Requirements
Update `SignUpRequest` schema:

```python
class SignUpRequest(BaseModel):
    password: str = Field(
        ...,
        min_length=8,
        pattern=r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
    )
```

### 3. Add JSON Parsing Error Handling
In performer endpoints (`app/api/v1/endpoints/performer.py`):

```python
# Current (unsafe):
address = json.loads(address)

# Recommended:
try:
    address = json.loads(address)
except json.JSONDecodeError:
    raise HTTPException(400, "Invalid JSON in address field")
```

### 4. Implement Input Sanitization
For LIKE queries to prevent SQL pattern injection:

```python
def sanitize_search_input(value: str) -> str:
    """Escape SQL LIKE special characters."""
    return value.replace('%', r'\%').replace('_', r'\_')
```

### 5. Add Request ID Tracking
For debugging and audit trails:

```python
class RequestIDMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        with logger.contextualize(request_id=request_id):
            response = await call_next(request)
            response.headers["X-Request-ID"] = request_id
            return response
```

---

## Code Quality Improvements

### 1. Add Type Hints Consistently
Several functions are missing return type annotations:

```python
# Current:
async def get_by_username(self, username: str):
    ...

# Better:
async def get_by_username(self, username: str) -> Optional[User]:
    ...
```

### 2. Create Custom Exception Classes
Replace generic HTTPException with domain-specific exceptions:

```python
# app/core/exceptions.py
class UserNotFoundError(AppException):
    status_code = 404
    detail = "User not found"

class InvalidCredentialsError(AppException):
    status_code = 401
    detail = "Invalid credentials"
```

### 3. Implement API Versioning Strategy
Prepare for future API versions:

```python
# app/api/v2/routers.py
api_v2_router = APIRouter()

# In main.py
app.include_router(api_v1_router, prefix='/api/v1')
app.include_router(api_v2_router, prefix='/api/v2')
```

### 4. Add OpenAPI Documentation
Add detailed endpoint descriptions:

```python
@router.post(
    '/login',
    response_model=SignInResponse,
    summary="User login",
    description="Authenticate user and return JWT tokens",
    responses={
        200: {"description": "Successful login"},
        400: {"description": "Invalid credentials"},
        403: {"description": "User blocked"},
    }
)
async def login(...):
    ...
```

---

## Testing Recommendations

### 1. Unit Tests
Add unit tests for:
- All service methods
- Repository methods (with mocked sessions)
- Authentication dependencies
- Schema validation

### 2. Integration Tests
Test complete flows:
- User registration → login → profile update
- Performer registration → service creation → order flow
- Admin moderation workflows

### 3. Test Configuration
```python
# conftest.py
@pytest.fixture
async def test_db():
    """Create test database with migrations."""
    ...

@pytest.fixture
async def authenticated_client(test_db):
    """Client with valid JWT token."""
    ...
```

### 4. API Contract Tests
Use schema validation to ensure API contracts:

```python
def test_login_response_schema():
    response = client.post("/api/v1/user/login", json={...})
    SignInResponse.model_validate(response.json())
```

---

## Monitoring & Observability

### 1. Add Health Check Endpoints

```python
@router.get("/health")
async def health_check():
    return {"status": "healthy"}

@router.get("/health/ready")
async def readiness_check(db: AsyncSession = Depends(get_db)):
    try:
        await db.execute(text("SELECT 1"))
        return {"status": "ready", "database": "connected"}
    except Exception:
        raise HTTPException(503, "Database unavailable")
```

### 2. Add Metrics Collection
Using prometheus-fastapi-instrumentator:

```python
from prometheus_fastapi_instrumentator import Instrumentator

Instrumentator().instrument(app).expose(app)
```

### 3. Structured Logging Format
For log aggregation systems:

```python
logger.bind(
    user_id=user.id,
    action="login",
    ip=request.client.host
).info("User logged in")
```

### 4. Add Distributed Tracing
For microservices debugging:

```python
from opentelemetry import trace
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

FastAPIInstrumentor.instrument_app(app)
```

---

## Environment Variables to Add

Add these to your `.env` file:

```bash
# Sentry (move from hardcoded)
SENTRY_DSN=https://...@sentry.io/...
SENTRY_TRACES_SAMPLE_RATE=0.1
SENTRY_SEND_PII=false

# CORS (configure for production)
CORS_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com

# Rate Limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_DEFAULT=100/minute

# Logging
LOG_LEVEL=INFO
LOG_FORMAT=json
```

---

## Migration Notes

When applying database index changes, create an Alembic migration:

```bash
alembic revision --autogenerate -m "Add performance indexes"
alembic upgrade head
```

**New indexes added:**
- `ix_user_is_staff` on `user.is_staff`
- `ix_user_is_active` on `user.is_active`
- `ix_user_date_joined` on `user.date_joined`
- `ix_performer_active_status_verified` on `performer(active, status, verified)`
- `ix_performer_city_id` on `performer.city_id`
- `ix_performer_created_at` on `performer.created_at`

---

## Priority Recommendations

| Priority | Task | Impact | Effort |
|----------|------|--------|--------|
| 🔴 High | Add rate limiting | Security | Medium |
| 🔴 High | Add JSON error handling | Stability | Low |
| 🟡 Medium | Implement response caching | Performance | Medium |
| 🟡 Medium | Add unit tests | Quality | High |
| 🟢 Low | Add health endpoints | Operations | Low |
| 🟢 Low | Add OpenAPI docs | Developer Experience | Medium |
