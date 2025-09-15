import  { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Card,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [events, setEvents] = useState<{ date: string; title: string }[]>([]);

  const handleAddEvent = () => {
    if (selectedDate && eventTitle.trim()) {
      const dateStr = selectedDate.toDateString();
      setEvents([...events, { date: dateStr, title: eventTitle }]);
      setEventTitle("");
      setOpenModal(false);
    }
  };

  const eventsForSelectedDate = events.filter(
    (e) => e.date === selectedDate?.toDateString()
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box p={4}>
        <Typography variant="h4" fontWeight={600} mb={4}>
          Calendar
        </Typography>

        <Box display="flex" gap={4} flexWrap="wrap">
          {/* Calendar Picker */}
          <Card sx={{ flex: "1 1 300px", p: 2 }}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
            />
          </Card>

          {/* Events List */}
          <Card sx={{ flex: "1 1 300px", p: 2 }}>
            <Typography variant="h6" mb={2}>
              Events on {selectedDate?.toDateString()}
            </Typography>

            <List>
              {eventsForSelectedDate.length > 0 ? (
                eventsForSelectedDate.map((e, idx) => (
                  <ListItem key={idx}>
                    <ListItemText primary={e.title} />
                  </ListItem>
                ))
              ) : (
                <Typography color="textSecondary">No events yet</Typography>
              )}
            </List>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenModal(true)}
            >
              Add Event
            </Button>
          </Card>
        </Box>

        {/* Add Event Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              p: 4,
              borderRadius: "12px",
              boxShadow: 24,
            }}
          >
            <Typography variant="h6" mb={2}>
              Add New Event
            </Typography>

            <TextField
              label="Event Title"
              fullWidth
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              margin="normal"
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddEvent}
            >
              Save Event
            </Button>
          </Box>
        </Modal>
      </Box>
    </LocalizationProvider>
  );
};

export default CalendarScreen;
