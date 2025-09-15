import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const sampleData = [
  {
    id: "C-001",
    name: "Swift Transportation",
    location: "Phoenix, AZ",
    fleetSize: "18,500",
    onTime: "96.5%",
    responseTime: "< 15 min",
    specialization: ["Temperature Controlled", "Hazmat"],
    lastActivity: "1/8/2025",
    completedLoads: "1,247",
    averageRate: "$2.45/mile",
    equipmentTypes: ["Dry Van", "Reefer", "Flatbed"],
    status: "active",
    rating: "4.6",
  },
  {
    id: "C-002",
    name: "Swift Transportation",
    location: "Phoenix, AZ",
    fleetSize: "18,500",
    onTime: "96.5%",
    responseTime: "< 15 min",
    specialization: ["Temperature Controlled", "Hazmat"],
    lastActivity: "1/8/2025",
    completedLoads: "1,247",
    averageRate: "$2.45/mile",
    equipmentTypes: ["Dry Van", "Reefer", "Flatbed"],
    status: "active",
    rating: "4.6",
  },
  {
    id: "C-003",
    name: "Swift Transportation",
    location: "Phoenix, AZ",
    fleetSize: "18,500",
    onTime: "96.5%",
    responseTime: "< 15 min",
    specialization: ["Temperature Controlled", "Hazmat"],
    lastActivity: "1/8/2025",
    completedLoads: "1,247",
    averageRate: "$2.45/mile",
    equipmentTypes: ["Dry Van", "Reefer", "Flatbed"],
    status: "active",
    rating: "4.6",
  },
];

const MobilitySelectPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  return (
    <Box p={4}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Mobility Select
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="outlined">+ Add by VLM ID</Button>
          <Button variant="contained">+ Add Manually</Button>
        </Box>
      </Box>

      {/* Search + Status Filter */}
      <Box display="flex" gap={2} alignItems="center" mb={3}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
        <TextField
          select
          variant="outlined"
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="All Status">All Status</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
        <Button variant="outlined" startIcon={<FilterListIcon />}>
          Advanced Filters
        </Button>
      </Box>

      {/* Cards List */}
      <Box display="flex" flexDirection="column" gap={2}>
        {sampleData.map((item) => (
          <Card key={item.id} variant="outlined">
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {item.name}
                  </Typography>
                  <Typography color="textSecondary">{item.id} | {item.location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Chip label={item.status} color="success" />
                  <Typography>⭐ {item.rating}</Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box display="flex" gap={4} flexWrap="wrap">
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Fleet Size</Typography>
                  <Typography>{item.fleetSize}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">On-Time</Typography>
                  <Typography>{item.onTime}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Response Time</Typography>
                  <Typography>{item.responseTime}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Specialization</Typography>
                  {item.specialization.map((spec) => (
                    <Chip key={spec} label={spec} size="small" sx={{ mr: 1, mt: 0.5 }} />
                  ))}
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Last Activity</Typography>
                  <Typography>{item.lastActivity}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Completed Loads</Typography>
                  <Typography>{item.completedLoads}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Average Rate</Typography>
                  <Typography>{item.averageRate}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Equipment Types</Typography>
                  {item.equipmentTypes.map((eq) => (
                    <Chip key={eq} label={eq} size="small" sx={{ mr: 1, mt: 0.5 }} />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MobilitySelectPage;
