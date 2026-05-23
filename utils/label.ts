const getDrivetrainLabel = (drivetrain: string) => {
  switch (drivetrain) {
    case "allwd":
      return "All-Wheel Drive";
    case "frontwd":
      return "Front-Wheel Drive";
    case "rearwd":
      return "Rear-Wheel Drive";
    case "fourwd":
      return "4-Wheel Drive";
    default:
      return drivetrain;
  }
};

export { getDrivetrainLabel };
