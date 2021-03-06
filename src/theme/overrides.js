const overrides = {
  MuiCard: {
    root: {
      borderRadius: "6px",
      boxShadow: "0 0 14px 0 rgba(53, 64, 82, 0.2)",
    },
  },
  MuiCardHeader: {
    action: {
      marginTop: "-4px",
      marginRight: "-4px",
    },
  },
  MuiPickersDay: {
    day: {
      fontWeight: "300",
    },
  },
  MuiPickersYear: {
    root: {
      height: "64px",
    },
  },
  MuiPickersCalendar: {
    transitionContainer: {
      marginTop: "6px",
    },
  },
  MuiPickersCalendarHeader: {
    iconButton: {
      backgroundColor: "transparent",
      "& > *": {
        backgroundColor: "transparent",
      },
    },
    switchHeader: {
      marginTop: "2px",
      marginBottom: "4px",
    },
  },
  MuiPickersClock: {
    container: {
      margin: `32px 0 4px`,
    },
  },
  MuiPickersClockNumber: {
    clockNumber: {
      left: `calc(50% - 16px)`,
      width: "32px",
      height: "32px",
    },
  },
  MuiPickerDTHeader: {
    dateHeader: {
      "& h4": {
        fontSize: "2.125rem",
        fontWeight: 400,
      },
    },
    timeHeader: {
      "& h3": {
        fontSize: "3rem",
        fontWeight: 400,
      },
    },
  },
  MuiPickersTimePicker: {
    hourMinuteLabel: {
      "& h2": {
        fontSize: "3.75rem",
        fontWeight: 300,
      },
    },
  },
  MuiPickersToolbar: {
    toolbar: {
      "& h4": {
        fontSize: "2.125rem",
        fontWeight: 400,
      },
    },
  },
  MuiChip: {
    root: {
      borderRadius: "6px",
    },
  },
};

export default overrides;
