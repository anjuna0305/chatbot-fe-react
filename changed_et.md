# Changed Response Entities

All response entities that previously used integer `id` or FK fields now use string `uuid` fields instead.

## Response Schema Changes

| Schema | Field Removed | Field Added | Notes |
|---|---|---|---|
| `UserOut` | `id: int` | `uuid: str` | `organization_id: int \| None` → `organization_uuid: str \| None` |
| `UserListItemOut` | `id: int` | `uuid: str` | `organization_id: int \| None` → `organization_uuid: str \| None` |
| `ApiKeyOut` | `id: int` | `uuid: str` | `user_id: int` → `user_uuid: str` |
| `ServiceOut` | `id: int` | `uuid: str` | |
| `ServiceUsageOut` | `id: int` | `uuid: str` | `api_key_id: int` → `api_key_uuid: str`, `service_id: int` → `service_uuid: str` |
| `UsageLogOut` | `id: int` | `uuid: str` | `api_key_id: int` → `api_key_uuid: str`, `service_id: int` → `service_uuid: str` |
| `CurrentUsageOut` | | | `api_key_id: int` → `api_key_uuid: str`, `service_id: int` → `service_uuid: str` |
| `TaskSubmitOut` | `task_id: int` | `task_uuid: str` | |
| `TaskStatusOut` | `task_id: int` | `task_uuid: str` | |
| `TaskResultOut` | `task_id: int` | `task_uuid: str` | |
| `CustomChatbotOut` | `id: int` | `uuid: str` | `organization_id: int \| None` → `organization_uuid: str \| None` |
| `OrganizationOut` | `id: int` | `uuid: str` | |
| `TokenOut` | | | `organization_id: str` → `organization_uuid: str` |
| `AssignUsersToOrgOut` | `user_ids: List[int]` | `user_uuids: List[str]` | |
| `OrganizationUserIdsOut` | `user_ids: List[int]` | `user_uuids: List[str]` | |

## Request Schema Changes

| Schema | Field Changed | Notes |
|---|---|---|
| `UserCreate` | `organization_id: int` → `organization_uuid: str` | |
| `UserUpdate` | `organization_id: int` → `organization_uuid: str` | |
| `AssignOrgToUser` | `organization_id: int` → `organization_uuid: str` | |
| `ServiceUsageCreate` | `api_key_id: int` → `api_key_uuid: str`, `service_id: int` → `service_uuid: str` | |
| `UsageLogCreate` | `api_key_id: int` → `api_key_uuid: str`, `service_id: int` → `service_uuid: str` | |
| `AssignOrgAdmin` | `user_id: int` → `user_uuid: str` | |
| `AssignUsersToOrg` | `user_ids: List[int]` → `user_uuids: List[str]` | |
| `CustomChatbotCreate` | `organization_id: int \| None` → `organization_uuid: str \| None` | |

## Path Parameter Changes

| Endpoint | Old Param | New Param |
|---|---|---|
| `PUT /users/{user_id}` | `user_id: int` | `user_uuid: str` |
| `GET /users/{user_id}` | `user_id: int` | `user_uuid: str` |
| `PUT /users/{user_id}/block` | `user_id: int` | `user_uuid: str` |
| `PUT /users/{user_id}/unblock` | `user_id: int` | `user_uuid: str` |
| `PUT /users/{user_id}/organization` | `user_id: int` | `user_uuid: str` |
| `POST /api-keys/users/{user_id}/api-keys` | `user_id: int` | `user_uuid: str` |
| `GET /api-keys/{api_key_id}` | `api_key_id: int` | `api_key_uuid: str` |
| `GET /services/{service_id}` | `service_id: int` | `service_uuid: str` |
| `GET /usage/current/{api_key_id}/{service_id}` | `api_key_id: int`, `service_id: int` | `api_key_uuid: str`, `service_uuid: str` |
| `GET /tasks/{task_id}/status` | `task_id: int` | `task_uuid: str` |
| `GET /tasks/{task_id}/result` | `task_id: int` | `task_uuid: str` |
| `GET /tasks/{task_id}/download` | `task_id: int` | `task_uuid: str` |
| `POST /orgs/{organization_id}/users` | `organization_id: int` | `organization_uuid: str` |
| `GET /orgs/{organization_id}` | `organization_id: int` | `organization_uuid: str` |
| `PUT /orgs/activate/{org_id}` | `org_id: int` | `org_uuid: str` |
| `PUT /orgs/deactivate/{org_id}` | `org_id: int` | `org_uuid: str` |
| `PUT /orgs/{org_id}/admin` | `org_id: int` | `org_uuid: str` |
| `GET /orgs/{organization_id}/admin` | `organization_id: int` | `organization_uuid: str` |
| `GET /custom-chatbots/{chatbot_id}` | `chatbot_id: int` | `chatbot_uuid: str` |
| `GET /custom-chatbots/by-url-organization/{organization_id}` | `organization_id: int` | `organization_uuid: str` |
| `POST /custom-chatbots/publish/{chatbot_id}` | `chatbot_id: int` | `chatbot_uuid: str` |
| `POST /custom-chatbots/unpublish/{chatbot_id}` | `chatbot_id: int` | `chatbot_uuid: str` |
| `POST /custom-chatbots/make-public/{chatbot_id}` | `chatbot_id: int` | `chatbot_uuid: str` |
| `POST /custom-chatbots/make-private/{chatbot_id}` | `chatbot_id: int` | `chatbot_uuid: str` |
| `POST /custom-chatbots/{chatbot_id}/upload-image` | `chatbot_id: int` | `chatbot_uuid: str` |
| `POST /custom-chatbots/{chatbot_id}/upload-file` | `chatbot_id: int` | `chatbot_uuid: str` |

## Query Parameter Changes

| Endpoint | Old Param | New Param |
|---|---|---|
| `GET /users` | `organization_id: int \| None` | `organization_uuid: str \| None` |

## Authentication Changes

JWT token payload now uses:
- `sub` (was `user_id` as int) → now stores `user.uuid` as string
- `organization_uuid` (was `organization_id` as int) → now stores `organization.uuid` as string (or `null`)

`CurrentUser` dataclass:
- `uuid: str` (was `id: int`)
- `organization_uuid: str | None` (was `organization_id: int | None`)