/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import  activeLoads from "../assets/activeLoads.png";
import  pendingLoads from "../assets/pendingLoads.png";
import  revenue from "../assets/revenue.png";
import  totalMiles from "../assets/totalMiles.png";



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

const RightNow = ({ loads }: { loads: Load[] }) => {
  const [searchTerm] = useState("");
  const [tabValue] = useState("all");
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



      {/* Loads Table */}
     {/* Loads Table */}
{/* Loads List as Cards */}
<Card>
  <CardContent>
    <Typography variant="h6" fontWeight={600} mb={2}>
      Recent Requests
    </Typography>

    <Box display="flex" flexDirection="column" gap={2}>
      {filteredLoads.length > 0 ? (
        filteredLoads.map((load) => (
          <Card key={load.id} variant="outlined" sx={{ p: 2, borderRadius: '12px' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Right Now ID
                </Typography>
                <Typography fontWeight={600}>{load.id}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Route
                </Typography>
                <Typography>{load.route}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Pickup
                </Typography>
                <Typography>{load.pickup}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Delivery
                </Typography>
                <Typography>{load.delivery}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Status
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <CheckCircleIcon fontSize="small" color="success" />
                  <Typography>Completed</Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  Action
                </Typography>
                <Typography
                  variant="button"
                  sx={{
                    backgroundColor: '#007AFF1A',
                    color: '#007AFF',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'inline-block',
                  }}
                >
                  Track
                </Typography>
              </Box>
            </Box>
          </Card>
        ))
      ) : (
        <Typography align="center">No loads found</Typography>
      )}
    </Box>
  </CardContent>
</Card>

    </Box>
  );
};

export default RightNow;
