# User Block/Unblock API Endpoints

## PUT /users/:user-id/block

Block a user, preventing them from accessing services.

**Authorization:** `admin_user` or `org_admin`

- `admin_user` can block any user.
- `org_admin` can only block users belonging to their own organization. Returns `403` if the target user belongs to a different organization.

**Request Body:** None

**Response (200):**

```json
{
  "id": 5,
  "name": "kavishka",
  "email": "kavishka@gmail.com",
  "role": "admin_user",
  "created_at": "2026-05-11T07:20:00",
  "is_active": false,
  "organization_id": 1,
  "organization_name": "Department of Finance"
}
```

**Error Responses:**
- `403 Forbidden` — requester is not `admin_user` or `org_admin`, or `org_admin` trying to block a user outside their organization
- `404 Not Found` — user does not exist

---

## PUT /users/:user-id/unblock

Unblock a user, restoring their access to services.

**Authorization:** `admin_user` or `org_admin`

- `admin_user` can unblock any user.
- `org_admin` can only unblock users belonging to their own organization. Returns `403` if the target user belongs to a different organization.

**Request Body:** None

**Response (200):**

```json
{
  "id": 5,
  "name": "kavishka",
  "email": "kavishka@gmail.com",
  "role": "admin_user",
  "created_at": "2026-05-11T07:20:00",
  "is_active": true,
  "organization_id": 1,
  "organization_name": "Department of Finance"
}
```

**Error Responses:**
- `403 Forbidden` — requester is not `admin_user` or `org_admin`, or `org_admin` trying to unblock a user outside their organization
- `404 Not Found` — user does not exist

---

## Also relevant: Updated GET /users query parameters

The following parameter was added to the existing `GET /users` endpoint:

| Parameter | Type | Default | Required | Description |
|---|---|---|---|---|
| `is_active` | boolean | _(null)_ | No | Filter by active status. `true` = active users only, `false` = blocked users only. Omit to return all. |