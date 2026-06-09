export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  is_active: boolean;
  organization_id: number;
  organization_name: string;
};

export type UsersResponse = {
  items: User[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
};