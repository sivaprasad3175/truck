/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MoreVert } from "@mui/icons-material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import  activeLoads from "../assets/activeLoads.png";
import  pendingLoads from "../assets/pendingLoads.png";
import  revenue from "../assets/revenue.png";
import  totalMiles from "../assets/totalMiles.png";


const statusTabs = [
  { label: "All", value: "all", icon: <ListAltIcon />, color: "#1976d2" },
  { label: "Active", value: "active", icon: <LocalShippingIcon />, color: "#0288d1" },
  { label: "In Transit", value: "in transit", icon: <AssignmentTurnedInIcon />, color: "#f57c00" },
  { label: "Booked", value: "booked", icon: <AssignmentTurnedInIcon />, color: "#673ab7" },
  { label: "Delivered", value: "delivered", icon: <CheckCircleIcon />, color: "#2e7d32" },
  { label: "Cancelled", value: "cancelled", icon: <CancelIcon />, color: "#d32f2f" },
];


interface Load {
  id: string;
  route: string;
  pickup: string;
  delivery: string;
  carrierId: string;
  cargo: string;
  weight: string;
  driverId: string;
  status: string;
}

const MyLoads = ({ loads }: { loads: Load[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [driver, setDriver] = useState("All Drivers");
  const [carrier, setCarrier] = useState("All Carriers");
  const [allLoads, setAllLoads] = useState("All Loads");

  const [dateRange, setDateRange] = useState<any>(null);
  const [tabValue, setTabValue] = useState("all");
  console.log("Loads data:", loads);

  // ✅ Filtering logic
  const filteredLoads = loads.filter((load) => {
    const matchesStatus =
      tabValue === "all" || load.status.toLowerCase() === tabValue;
    const matchesSearch =
      load.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.cargo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <Box>
      {/* Top Stats Cards */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
        {[
          { title: "Active Loads", value: 1, icon: activeLoads,bgColor:'#007AFF1A' },
          { title: "Pending Loads", value: 2 ,icon: pendingLoads,bgColor:'#FF95001A' },
          { title: "Total Revenue", value: "$4,720" ,icon: revenue ,bgColor:'#5856D61A'},
          { title: "Total Miles", value: "1,340",icon: totalMiles ,bgColor:'#FF2D551A' },
        ].map((card, i) => (
          <Card key={i} sx={{ flex: "1 1 200px", minWidth: 200,minHeight: 150,alignItems: "center", display: "flex" ,backgroundColor: card.bgColor,justifyContent:'space-between'}}>
              <Box  mb={1} padding={2}>
                <Typography variant='subtitle1' color="textSecondary">
                  {card.title}
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {card.value}
                </Typography>
              </Box>

              <Box  mb={1} padding={2}>
                 <img src={card.icon} alt="App Logo"  />
              </Box>

          </Card>
        ))}
      </Box>

      {/* Search + Filters */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        alignItems="center"
        mb={2}
      >
        <TextField
          size="small"
          placeholder="Search loads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: "1 1 200px", minWidth: 200 }}
        />

        <TextField
          select
          size="small"
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
          label="Driver"
          sx={{ flex: "1 1 150px", minWidth: 150 }}
        >
          <MenuItem value="All Drivers">All Drivers</MenuItem>
          <MenuItem value="DRV-1001">DRV-1001</MenuItem>
          <MenuItem value="DRV-1002">DRV-1002</MenuItem>
        </TextField>

        <TextField
          select
          size="small"
          value={carrier}
          onChange={(e) => setCarrier(e.target.value)}
          label="Carrier"
          sx={{ flex: "1 1 150px", minWidth: 150 }}
        >
          <MenuItem value="All Carriers">All Carriers</MenuItem>
          <MenuItem value="CARR-001">CARR-001</MenuItem>
        </TextField>


        <TextField
          select
          size="small"
          value={allLoads}
          onChange={(e) => setAllLoads(e.target.value)}
          label="Loads"
          sx={{ flex: "1 1 150px", minWidth: 150 }}
        >
          <MenuItem value="All Loads">All Loads</MenuItem>
          <MenuItem value="Load-001">Load-001</MenuItem>
        </TextField>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
            slotProps={{ textField: { size: "small", fullWidth: true } }}
          />
        </LocalizationProvider>
      </Box>

      {/* Status Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(_e, newValue) => setTabValue(newValue)}
          variant="fullWidth"   // ✅ force tabs to share equal width
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              minHeight: 40,
              minWidth: "auto",         // ✅ allow shrinking
              flex: 1,                  // ✅ distribute evenly
              borderRadius: "12px",
              marginRight: 1,
              backgroundColor: "#f5f7fa",
              color: "#333",
              fontWeight: 500,
              display: "flex",
              gap: "4px",
              padding: "4px 8px",       // ✅ tighter padding
            },
            "& .Mui-selected": {
              backgroundColor: "#fff",
              border: "2px solid",
              color: (theme) => theme.palette.primary.main,
            },
          }}
        >
          {statusTabs.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
              sx={{
                "&.Mui-selected": {
                  borderColor: tab.color,
                  color: tab.color,
                },
                "& svg": {
                  fontSize: 16,
                  color: tab.color,
                },
              }}
            />
          ))}
        </Tabs>


      </Box>

      {/* Loads Table */}
      <Card>
        <CardContent>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Load ID</TableCell>
                <TableCell>Route</TableCell>
                <TableCell>Pickup</TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell>Carrier ID</TableCell>
                <TableCell>Cargo</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Driver ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLoads.length > 0 ? (
                filteredLoads.map((load) => (
                  <TableRow key={load.id}>
                    <TableCell>{load.id}</TableCell>
                    <TableCell>{load.route}</TableCell>
                    <TableCell>{load.pickup}</TableCell>
                    <TableCell>{load.delivery}</TableCell>
                    <TableCell>{load.carrierId}</TableCell>
                    <TableCell>{load.cargo}</TableCell>
                    <TableCell>{load.weight}</TableCell>
                    <TableCell>{load.driverId}</TableCell>
                    <TableCell>{load.status}</TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    No loads found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyLoads;
