import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Box,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ColorBgButton from "@/components/ColorBgButton";
import ColorBgIconButton from "@/components/ColorBgIconButton";
import { API_ENDPOINTS } from "@/utils/api";
import AdminGuard from "@/components/AdminGuard";
import { Organization } from "@/types/organizations";
import { useAlert } from "@/hooks/useAlert";
import axiosInstance from "@/api/axios";

export default function OrganizationDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const orgId = Number(id);
  const { addAlert } = useAlert();

  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [togglingActive, setTogglingActive] = useState(false);

  const fetchOrganization = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<Organization>(
        API_ENDPOINTS.ORGANIZATION_DETAIL(orgId),
      );
      setOrg(response.data);
    } catch {
      // Error alert handled by axios interceptor
    } finally {
      setLoading(false);
    }
  }, [orgId]);

  useEffect(() => {
    fetchOrganization();
  }, [fetchOrganization]);

  const handleToggleActivate = async () => {
    setTogglingActive(true);
    try {
      const path =
        org && org.is_active
          ? API_ENDPOINTS.ORGANIZATION_DEACTIVATE(orgId)
          : API_ENDPOINTS.ORGANIZATION_ACTIVATE(orgId);

      const response = await axiosInstance.put<Organization>(path);
      setOrg(response.data);
      addAlert(
        "success",
        response.data.is_active
          ? "Organization activated"
          : "Organization deactivated",
      );
    } catch {
      // Error alert handled by axios interceptor
    } finally {
      setTogglingActive(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!org) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Organization not found.</Typography>
      </Box>
    );
  }

  return (
    <AdminGuard>
      <Box sx={{ p: 3, maxWidth: "800px", mx: "auto" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <ColorBgIconButton
            tooltip="Back to list"
            onClick={() => navigate("/admin/organizations")}
          >
            <ArrowBackIcon />
          </ColorBgIconButton>
          <Typography variant="h5" sx={{ fontWeight: 600, ml: 1 }}>
            Organization Details
          </Typography>
        </Box>

        <Stack spacing={3}>
          <Paper sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="h6">{org.name}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={org?.is_active ? "Active" : "Deactive"}
                  color={org?.is_active ? "success" : "default"}
                  size="small"
                />
                <ColorBgButton
                  size="small"
                  onClick={handleToggleActivate}
                  disabled={togglingActive}
                  variant="contained"
                  color={org?.is_active ? "warning" : "success"}
                  sx={{ ml: 1 }}
                >
                  {togglingActive
                    ? "Updating..."
                    : org?.is_active
                      ? "deactivate"
                      : "activate"}
                </ColorBgButton>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Created
                </Typography>
                <Typography>
                  {new Date(org.created_at).toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </AdminGuard>
  );
}
