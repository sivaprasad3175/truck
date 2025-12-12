import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  MenuItem,
  Select,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CssBaseline,
  ListItemButton,
  Menu,
  Tabs,
  Tab,
  CardActionArea
} from '@mui/material';
import {
  ChevronDown,
  Bell,
} from 'lucide-react';
import MapIcon from '../assets/maps.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PaymentIcon from '@mui/icons-material/Payment';
import ChatIcon from '@mui/icons-material/Chat';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import BuildIcon from '@mui/icons-material/Build';
import logo from '../assets/theme_logo.png';
import MyLoads from './MyLoads';
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ontimeDelivery from '../assets/on_Time_Deliveries.png';
import completed from '../assets/completed.png';
import lateDelivery from '../assets/late_Delivery.png';
import RightNow from './RightNow';
import MobilitySelectPage from './MobilitySelect';
import ComingSoonPage from './ComingSoon';
import CalendarScreen from './CalendarScreen';




const drawerWidth = 280;

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}
const statusTabs = [
  { label: "Active Loads", value: "all", color: "#1976d2" },
  { label: "Messages", value: "messages", color: "#0288d1" },
  { label: "Active Quotes & Bids", value: "quotes", color: "#f57c00" },
  { label: "Documents", value: "docs", color: "#673ab7" },
];

const PendingActions = [
  {
    id: 1,
    title: "Digital Signatures",
    subtitle: "Contracts awaiting signature",
    count: 3,
    icon: <DescriptionOutlinedIcon sx={{ fontSize: 28 }} />,
    highlight: true,
  },
  {
    id: 2,
    title: "Contract Approvals",
    subtitle: "New contracts for review",
    count: 7,
    icon: <CheckCircleOutlineIcon sx={{ fontSize: 28 }} />,
  },
  {
    id: 3,
    title: "License Renewals",
    subtitle: "Expiring within 30 days",
    count: 2,
    icon: <AutorenewOutlinedIcon sx={{ fontSize: 28 }} />,
  },
];



export default function Dashboard({ user, onLogout }: { user: { name: string, role: string }; onLogout: () => void }) {
  const [location, setLocation] = useState("Dashboard");
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [pendingAselectedId, setPendingSelectedId] = useState<number | null>(null);



  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => setMenuAnchor(null);

  const handleLogout = () => {
    setMenuAnchor(null);
    onLogout()
  };

  const [tabValue, setTabValue] = useState("all");

  // Sample data for loads


  // Sidebar items
  const sidebarItems: (SidebarItem | null)[] = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { label: 'Search', icon: <SearchIcon />, path: '/search' },
    { label: 'My Loads', icon: <LocalShippingIcon />, path: '/my-loads' },
    { label: 'Right Now', icon: <FlashOnIcon />, path: '/right-now' },
    { label: 'Mobility Select', icon: <CheckCircleIcon />, path: '/mobility-select' },
    { label: 'Compliance & Safety', icon: <SecurityIcon />, path: '/compliance-safety' },
    null,
    { label: 'MobiTrac ELD', icon: <InsertDriveFileIcon />, path: '/mobitrac-eld' },
    { label: 'Calendar', icon: <CalendarTodayIcon />, path: '/calendar' },
    { label: 'Reports', icon: <InsertDriveFileIcon />, path: '/reports' },
    { label: 'Documents', icon: <InsertDriveFileIcon />, path: '/documents' },
    { label: 'Track My Stuff', icon: <LocalShippingIcon />, path: '/track-my-stuff' },
    { label: 'Payment Gateway', icon: <PaymentIcon />, path: '/payment-gateway' },
    null,
    { label: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { label: 'Live Support', icon: <LiveHelpIcon />, path: '/live-support' },
    { label: 'Tools', icon: <BuildIcon />, path: '/tools' },
  ];

  // Mock Data
  const performanceKpis = [
    {
      label: 'On-Time Deliveries',
      value: '99.2%',
      change: '+2.3%',
      icon: ontimeDelivery,
      bgColor: '#d1fae5',
      color: '#065f46',
    },
    {
      label: 'Late Deliveries',
      value: '5.8%',
      change: '-1.2%',
      icon: lateDelivery,
      bgColor: '#fee2e2',
      color: '#b91c1c',
    },
    {
      label: 'Total Completed',
      value: '1,247',
      change: '+125',
      icon: completed,
      bgColor: '#dbeafe',
      color: '#1e3a8a',
    },
  ];



  const items = [
    {
      id: 1,
      title: "Broker License",
      subtitle: "Expires: Dec 2024",
      status: "success",
    },
    {
      id: 3,
      title: "Carrier Compliance",
      subtitle: "2 carriers need renewal",
      status: "warning",
      highlight: true,
    },
    {
      id: 4,
      title: "Driver Compliance",
      subtitle: "3 drivers expired DOT",
      status: "error",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircleOutlineIcon color="success" />;
      case "warning":
        return <WarningAmberOutlinedIcon color="warning" />;
      case "error":
        return <CancelOutlinedIcon color="error" />;
      default:
        return null;
    }
  }


  const activeLoads = [
    {
      id: "LD-2025-003",
      route: "Houston, TX → Houston, TX",
      pickup: "Feb 4, 2025",
      delivery: "Feb 7, 2025",
      carrierId: "DRV-1002",
      cargo: "Home Appliances",
      weight: "55,000 lbs",
      driverId: "DRV-1001",
      status: "Active",
    },
    {
      id: "LD-2025-004",
      route: "Dallas, TX → Austin, TX",
      pickup: "Feb 3, 2025",
      delivery: "Feb 5, 2025",
      carrierId: "DRV-1001",
      cargo: "Consumer Electronics",
      weight: "45,000 lbs",
      driverId: "DRV-1003",
      status: "In Transit",
    },
    {
      id: "LD-2025-005",
      route: "Irving, TX → Garland, TX",
      pickup: "Feb 2, 2025",
      delivery: "Feb 5, 2025",
      carrierId: "DRV-1005",
      cargo: "Mobile Devices",
      weight: "60,000 lbs",
      driverId: "DRV-1007",
      status: "Delivered",
    },
    {
      id: "LD-2025-006",
      route: "Laredo, TX → Plano, TX",
      pickup: "Feb 4, 2025",
      delivery: "Feb 8, 2025",
      carrierId: "DRV-1008",
      cargo: "Computing Devices",
      weight: "48,000 lbs",
      driverId: "DRV-1009",
      status: "Booked",
    },
    {
      id: "LD-2025-007",
      route: "El Paso, TX → Corpus Christi, TX",
      pickup: "Feb 5, 2025",
      delivery: "Feb 8, 2025",
      carrierId: "DRV-1010",
      cargo: "Audio Equipment",
      weight: "52,000 lbs",
      driverId: "DRV-1003",
      status: "Cancelled",
    },
    {
      id: "LD-2025-008",
      route: "San Antonio, TX → Fort Worth, TX",
      pickup: "Feb 6, 2025",
      delivery: "Feb 9, 2025",
      carrierId: "DRV-1006",
      cargo: "Wearable Technology",
      weight: "47,500 lbs",
      driverId: "DRV-1004",
      status: "Delivered",
    },
  ];
  console.log(user, 'namm');
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            height: 64,
            alignItems: 'center',
          }}
        >
          <Box aria-label="Logo">
            <img src={logo} alt="App Logo" />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <Box aria-label="Notifications">
              <Badge badgeContent={4} color="error">
                <Bell size={20} color='black' />
              </Badge>
            </Box>

            <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }} aria-label="User Menu">

              <Typography variant="subtitle1" sx={{ width: 32, height: 32 }}
              >
                {"A".toUpperCase()}
              </Typography>
              <ChevronDown size={18} />
            </IconButton>

            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: 64, // Ensure Drawer starts below AppBar
            height: 'calc(100vh - 64px)', // Prevent Drawer from overlapping AppBar
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            {user?.role} View
          </Typography>

          <Divider />
          <List>
            {sidebarItems.map((item, index) =>
              item === null ? (
                <Divider key={`divider-${index}`} />
              ) : (
                <ListItem
                  key={item.label}
                  disablePadding
                  sx={{
                    backgroundColor: location === item.path ? 'action.selected' : 'transparent',
                  }}
                >
                  <ListItemButton
                    onClick={() => setLocation(item.label)}
                    sx={{ py: 0.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          minHeight: 'calc(100vh - 64px)', // Ensure content fills height
        }}
      >
        <Toolbar />

        {/* Dashboard Page */}
        {location === "Dashboard" &&
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Card sx={{ flex: 1 }}>
                <CardContent sx={{ p: 1, height: "100%" }}>
                  <Typography variant="h6" gutterBottom>
                    Performance KPIs
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "stretch", // 🔑 makes children take equal height
                      height: '90%'
                    }}
                  >
                    {performanceKpis.map((kpi) => (
                      <Box
                        key={kpi.label}
                        sx={{
                          flex: 1,
                          bgcolor: kpi.bgColor,
                          borderRadius: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          p: 1,
                          height: "100%", // child will stretch fully
                        }}
                      >
                        <img src={kpi.icon} alt="App Logo" />
                        <Typography variant="subtitle2" sx={{ mt: 1 }}>
                          {kpi.label}
                        </Typography>
                        <Typography variant="h5">{kpi.value}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {kpi.change}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ display: 'flex', p: 2, gap: 2, bgcolor: '#f9f9f9' }}>
                <Box sx={{ flex: 1 }}>

                  <Typography variant="h6" gutterBottom>
                    Pending Actions
                  </Typography>
                  <Card variant="outlined" sx={{ borderRadius: 3, p: 2 }}>

                    {PendingActions.map((action) => (
                      <CardActionArea
                        key={action.id}
                        onClick={() => setSelectedId(action.id)}
                        sx={{
                          borderRadius: 2,
                          mb: 2,
                          "&:hover": { backgroundColor: "transparent" },
                          "&.Mui-focusVisible": { backgroundColor: "transparent" },

                        }}
                      >
                        <Box
                          sx={{
                            border:
                              selectedId === action.id
                                ? "2px solid rgba(25,118,210,0.08)"
                                : "1px solid transparent",
                            borderRadius: 2,
                            p: 2,
                            bgcolor: selectedId === action.id ? "rgba(25,118,210,0.08)" : "grey.50",
                          }}
                        >
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box display="flex" alignItems="center" gap={1}>
                              <span style={{ fontSize: "20px" }}>{action.icon}</span>
                              <Box>
                                <Typography variant="subtitle1">{action.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {action.subtitle}
                                </Typography>
                              </Box>
                            </Box>

                            <Badge
                              badgeContent={action.count}
                              color="error"
                              sx={{
                                "& .MuiBadge-badge": {
                                  fontSize: "0.75rem",
                                  minWidth: 20,
                                  height: 20,
                                },
                              }}
                            />
                          </Box>
                        </Box>
                      </CardActionArea>
                    ))}
                  </Card>

                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Complaince at a Glance
                  </Typography>
                  <Card variant="outlined" sx={{ borderRadius: 3, p: 2 }}>
                    {items.map((item) => (
                      <CardActionArea
                        key={item.id}
                        disableRipple
                        onClick={() => setPendingSelectedId(item.id)}
                        sx={{

                          borderRadius: 2,
                          mb: 2,
                          "&:hover": { backgroundColor: "transparent" },
                        }}
                      >
                        <Box
                          sx={{
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            bgcolor:
                              pendingAselectedId === item.id ? "rgba(25,118,210,0.08)" : "grey.50",
                            borderRadius: 2,
                            transition: "0.2s",
                          }}
                        >
                          {getStatusIcon(item.status)}
                          <Box>
                            <Typography variant="subtitle1">{item.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.subtitle}
                            </Typography>
                          </Box>
                        </Box>
                      </CardActionArea>
                    ))}

                  </Card>

                </Box>
              </Card>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Card sx={{ flex: 1 }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={tabValue}
                    onChange={(_e, newValue) => setTabValue(newValue)}
                    variant="fullWidth"
                    sx={{
                      "& .MuiTab-root": {
                        textTransform: "none",
                        minWidth: "auto",         // ✅ allow shrinking
                        flex: 1,                  // ✅ distribute evenly
                        borderRadius: "12px",
                        marginRight: 1,
                        backgroundColor: "#f5f7fa",
                        color: "#333",
                        fontWeight: 500,
                        display: "flex",
                        padding: "1px 2px",       // ✅ tighter padding
                      },
                      "& .Mui-selected": {
                        backgroundColor: "#fff",
                        color: (theme) => theme.palette.primary.main,
                      },
                    }}
                  >
                    {statusTabs.map((tab) => (
                      <Tab
                        key={tab.value}
                        value={tab.value}
                        label={tab.label}

                      />
                    ))}
                  </Tabs>
                </Box>

                {/* Tab Panels */}
                {tabValue === "all" && (
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Active Loads</Typography>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Load ID</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Pickup</TableCell>
                            <TableCell>Carrier</TableCell>
                            <TableCell>Value</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {[
                            { id: "L-1001", status: "In Transit", pickup: "Dallas, TX", carrier: "Swift", value: "$5,200" },
                            { id: "L-1002", status: "Pending", pickup: "Chicago, IL", carrier: "FedEx", value: "$2,800" },
                            { id: "L-1003", status: "Delivered", pickup: "Atlanta, GA", carrier: "UPS", value: "$6,100" },
                          ].map((load) => (
                            <TableRow key={load.id}>
                              <TableCell>{load.id}</TableCell>
                              <TableCell>{load.status}</TableCell>
                              <TableCell>{load.pickup}</TableCell>
                              <TableCell>{load.carrier}</TableCell>
                              <TableCell>{load.value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}

                {tabValue === "messages" && (
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Messages</Typography>
                      <ul style={{ paddingLeft: "16px", marginTop: 8 }}>
                        <li>📨 Dispatch updated Load <b>L-1002</b> pickup time.</li>
                        <li>📨 Carrier Swift confirmed delivery for <b>L-1001</b>.</li>
                        <li>📨 Rate inquiry received for route Dallas → Houston.</li>
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {tabValue === "quotes" && (
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Active Quotes & Bids</Typography>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Quote ID</TableCell>
                            <TableCell>Carrier</TableCell>
                            <TableCell>Bid</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {[
                            { id: "Q-5001", carrier: "Swift", bid: "$4,800", status: "Pending" },
                            { id: "Q-5002", carrier: "FedEx", bid: "$5,050", status: "Countered" },
                            { id: "Q-5003", carrier: "UPS", bid: "$5,200", status: "Accepted" },
                          ].map((q) => (
                            <TableRow key={q.id}>
                              <TableCell>{q.id}</TableCell>
                              <TableCell>{q.carrier}</TableCell>
                              <TableCell>{q.bid}</TableCell>
                              <TableCell>{q.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}

                {tabValue === "docs" && (
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Documents</Typography>
                      <ul style={{ paddingLeft: "16px", marginTop: 8 }}>
                        <li>📂 Bill of Lading – <i>L-1001</i></li>
                        <li>📂 Proof of Delivery – <i>L-1003</i></li>
                        <li>📂 Rate Confirmation – <i>L-1002</i></li>
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {tabValue === "calendar" && (
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Calendar & Reminders</Typography>
                      <Select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        size="small"
                        sx={{ mb: 1, minWidth: 150 }}
                      >
                        <MenuItem value="all">All US States</MenuItem>
                        <MenuItem value="west">West Coast</MenuItem>
                        <MenuItem value="east">East Coast</MenuItem>
                        <MenuItem value="central">Central</MenuItem>
                      </Select>
                      <ul style={{ paddingLeft: "16px", marginBottom: "12px" }}>
                        <li>📅 Pickup scheduled for <b>L-1002</b> – Sep 15, 10:00 AM</li>
                        <li>📅 Delivery expected for <b>L-1001</b> – Sep 16, 3:00 PM</li>
                        <li>📅 Reminder: Quote deadline for <b>Q-5002</b> – Sep 18</li>
                      </ul>
                      <Box
                        sx={{
                          mt: 1,
                          height: 250,
                          bgcolor: "grey.200",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          component="img"
                          src={MapIcon}
                          alt="Truck Map"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                )}

              </Card>

              <Card sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="h6">Truck Map View</Typography>
                  <Select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    size="small"
                    sx={{ mb: 1, minWidth: 150 }}
                  >
                    <MenuItem value="all">All US States</MenuItem>
                    <MenuItem value="west">West Coast</MenuItem>
                    <MenuItem value="east">East Coast</MenuItem>
                    <MenuItem value="central">Central</MenuItem>
                  </Select>
                  <Box
                    sx={{
                      mt: 1,
                      height: 250,
                      bgcolor: "grey.200",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 2,
                      overflow: "hidden", // ensures no overflow if image is larger
                    }}
                  >
                    <Box
                      component="img"
                      src={MapIcon}
                      alt="App Logo"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // fills the box while cropping if needed
                      }}
                    />
                  </Box>

                </CardContent>
              </Card>
            </Box>
          </Box>}
        {location === 'My Loads' && <MyLoads loads={activeLoads} />}
        {location === 'Right Now' && <RightNow loads={activeLoads} />}
        {location === 'Mobility Select' && <MobilitySelectPage />}
        {location === 'Calendar' && <CalendarScreen />}
        {!["Dashboard", "My Loads", "Right Now", "Mobility Select", "Calendar"].includes(location) && <ComingSoonPage />}

      </Box>
    </Box>
  );
}