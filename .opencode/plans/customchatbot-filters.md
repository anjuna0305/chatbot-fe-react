# Plan: Add Search, Sort, and Filters to CustomChatbotList (Server-Side)

## Overview

Add the same search, sort, and filter UI from UserList to CustomChatbotList, backed by server-side pagination and filtering (requires backend changes). Also create `customchatbot.md` with API specs.

---

## 1. Update `src/types/custom-chatbot.ts`

Add `ChatbotsResponse` type for the paginated response envelope:

```ts
export type ChatbotsResponse = {
  items: CustomChatbot[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
};
```

---

## 2. Update `src/api/chatbot.ts`

- Add `FetchChatbotsParams` type with fields: `page`, `page_size`, `search`, `sort_by`, `sort_order`, `is_publish`, `is_public`
- Modify `fetchChatbots` to accept these params and return `ChatbotsResponse` instead of `CustomChatbot[]`

```ts
export type FetchChatbotsParams = {
  page?: number;
  page_size?: number;
  search?: string;
  sort_by?: "chatbot_name" | "created_at";
  sort_order?: "asc" | "desc";
  is_publish?: boolean;
  is_public?: boolean;
};

export const fetchChatbots = async (params: FetchChatbotsParams = {}): Promise<ChatbotsResponse> => {
  const res = await axiosInstance.get(API_ENDPOINTS.CUSTOM_CHATBOT_LIST, { params });
  return res.data;
};
```

> Note: This changes the return type from `CustomChatbot[]` to `ChatbotsResponse`. All consumers need updating.

---

## 3. Update `src/pages/CustomChatbotList.tsx`

Major rewrite to add:

- **Search**: TextField + Search button + Clear button (same pattern as UserList)
- **Sort**: Dropdown (Name / Created Date) + asc/desc toggle button
- **Filters**: 
  - Published state dropdown: All / Published / Unpublished
  - Visibility dropdown: All / Public / Private
- **Pagination**: `TablePagination` with rows per page options [10, 20, 50, 100]
- **State**: `page`, `rowsPerPage`, `search`, `searchInput`, `sortBy`, `sortOrder`, `publishFilter`, `publicFilter`

Keep existing features: Add new chatbot dialog, refresh button, clickable rows → detail page.

The filter bar layout (same row, flex-wrap):
```
[Search TextField] [Search] [Clear] | [Sort by v] [asc/desc] | [Published v] | [Visibility v]
```

Query key becomes `["custom-chatbots", params]` to refetch on filter/sort/page changes.

---

## 4. Create `customchatbot.md` in project root

Document the updated `GET /custom-chatbots` endpoint with new query parameters:

| Parameter | Type | Default | Required | Description |
|---|---|---|---|---|
| `page` | integer | `1` | No | Page number (1-indexed) |
| `page_size` | integer | `20` | No | Items per page (min: 1, max: 100) |
| `search` | string | _(empty)_ | No | Search by chatbot name (case-insensitive partial match) |
| `sort_by` | string | `"created_at"` | No | `"chatbot_name"` or `"created_at"` |
| `sort_order` | string | `"desc"` | No | `"asc"` or `"desc"` |
| `is_publish` | boolean | _(null)_ | No | Filter by publish state. `true` = published, `false` = unpublished |
| `is_public` | boolean | _(null)_ | No | Filter by visibility. `true` = public, `false` = private |

Response envelope matches `ChatbotsResponse`:
```json
{
  "items": [...],
  "total": 45,
  "page": 1,
  "page_size": 20,
  "total_pages": 3
}
```

Authorization: `admin_user` only (same as current).

---

## 5. Typecheck verification

Run `npx tsc --noEmit` after all changes.

---

## Files changed summary

| File | Change |
|---|---|
| `src/types/custom-chatbot.ts` | Add `ChatbotsResponse` type |
| `src/api/chatbot.ts` | Add `FetchChatbotsParams`, update `fetchChatbots` return type |
| `src/pages/CustomChatbotList.tsx` | Add search, sort, filters, pagination UI |
| `customchatbot.md` | New file — API spec for updated endpoint |

No changes needed to: App.tsx, AppLayout.tsx, Sidebar.tsx, utils/api.ts