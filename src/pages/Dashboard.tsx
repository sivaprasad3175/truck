import React, { useState } from 'react';
import { useLocation, Route } from 'wouter';
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
  Avatar,
  Menu,
} from '@mui/material';
import {
  Truck,
  Clock,
  ChevronDown,
  Bell,
  CheckCircle,
} from 'lucide-react';
import MapIcon from '../assets/maps.png';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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

const drawerWidth = 280;

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

export default function DashboardFull() {
  const [location, setLocation] = useState("Dashboard");
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);


  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => setMenuAnchor(null);

  const handleLogout = () => {
    setMenuAnchor(null);
  };

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
      icon: <Truck />,
      bgColor: '#d1fae5',
      color: '#065f46',
    },
    {
      label: 'Late Deliveries',
      value: '5.8%',
      change: '-1.2%',
      icon: <Clock />,
      bgColor: '#fee2e2',
      color: '#b91c1c',
    },
    {
      label: 'Total Completed',
      value: '1,247',
      change: '+125',
      icon: <CheckCircle />,
      bgColor: '#dbeafe',
      color: '#1e3a8a',
    },
  ];

  const pendingActions = [
    { title: 'Digital Signatures', count: 3 },
    { title: 'Contract Approvals', count: 7 },
    { title: 'License Renewals', count: 2 },
  ];

  const complianceItems = [
    { title: 'Broker License', status: 'Expires Dec 2024', type: 'success' as const },
    { title: 'Insurance Coverage', status: 'Expires Mar 2025', type: 'success' as const },
    { title: 'Carrier Compliance', status: '2 carriers need renewal', type: 'warning' as const },
    { title: 'Driver Compliance', status: '3 drivers expired DOT', type: 'error' as const },
  ];


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
              <Avatar
                alt="User Avatar"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 32, height: 32 }}
              />
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
            Broker View
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
                <CardContent sx={{ p: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Performance KPIs
                  </Typography>
                  <Box sx={{
                    display: 'flex', gap: 1
                  }}>
                    {performanceKpis.map((kpi) => (
                      <Box
                        key={kpi.label}
                        sx={{
                          flex: 1,
                          bgcolor: kpi.bgColor,
                          borderRadius: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          p: 1,
                          height: 300
                        }}
                      >
                        {kpi.icon}
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
                  {pendingActions.map((action) => (
                    <Box
                      key={action.title}
                      sx={{ mb: 1, p: 1, bgcolor: '#fff', borderRadius: 1, boxShadow: 1 }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" fontWeight="500">
                          {action.title}
                        </Typography>
                        <Badge badgeContent={action.count} color="error" />
                      </Box>
                      <Typography variant="caption" color="textSecondary">
                        View Tasks
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Compliance at a Glance
                  </Typography>
                  {complianceItems.map((item) => (
                    <Box
                      key={item.title}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                        p: 1,
                        bgcolor: '#fff',
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    >
                      <CheckCircle
                        color={item.type === 'success' ? 'success' : item.type === 'warning' ? '#ff9800' : '#b91c1c'}
                        size={18}
                        style={{ marginRight: 8 }}
                      />
                      <Box>
                        <Typography variant="body2" fontWeight="500">
                          {item.title}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {item.status}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Card>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Card sx={{ flex: 1 }}>
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
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {activeLoads.map((load) => (
                        <TableRow key={load.id}>
                          <TableCell>{load.id}</TableCell>
                          <TableCell>{load.status}</TableCell>
                          <TableCell>{load.pickup}</TableCell>
                          <TableCell>{load.carrier}</TableCell>
                          <TableCell>{load.value}</TableCell>
                          <TableCell>
                            <MoreVertIcon fontSize="small" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
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

      </Box>
    </Box>
  );
}