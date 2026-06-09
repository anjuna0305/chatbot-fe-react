# Custom Chatbot API — Updated Endpoint Specification

## GET /custom-chatbots

Retrieve a pagated, searchable, sortable, filterable list of custom chatbots.

**Authorization:** `admin_user` only.

### Query Parameters

| Parameter | Type | Default | Required | Description |
|---|---|---|---|---|
| `page` | integer | `1` | No | Page number (1-indexed) |
| `page_size` | integer | `20` | No | Items per page (min: 1, max: 100) |
| `search` | string | _(empty)_ | No | Search by chatbot name (case-insensitive partial match) |
| `sort_by` | string | `"created_at"` | No | Field to sort by: `"chatbot_name"` or `"created_at"` |
| `sort_order` | string | `"desc"` | No | Sort direction: `"asc"` or `"desc"` |
| `is_publish` | boolean | _(null)_ | No | Filter by publish state. `true` = published only, `false` = unpublished only. Omit to return all. |
| `is_public` | boolean | _(null)_ | No | Filter by visibility. `true` = public only, `false` = private only. Omit to return all. |
| `organization_uuid` | string | _(null)_ | No | Filter by organization UUID. Only returns chatbots belonging to the specified organization. |

### Response (200)

```json
{
  "items": [
    {
      "uuid": "abc-123",
      "chatbot_name": "Helpdesk Bot",
      "file_path": "/data/helpdesk.txt",
      "organization_uuid": "org-456",
      "description": "A helpful assistant for support queries",
      "hero_image": "helpdesk_hero.png",
      "url_path": "helpdesk-bot",
      "retrieval_key": "rk-helpdesk",
      "is_publish": true,
      "is_public": false,
      "created_at": "2026-04-15T10:30:00"
    }
  ],
  "total": 45,
  "page": 1,
  "page_size": 20,
  "total_pages": 3
}
```

### Error Responses

- `403 Forbidden` — if the authenticated user is not `admin_user`