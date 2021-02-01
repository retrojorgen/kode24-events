const getMonth = (numericMonth) => {
  const months = [
    "januar",
    "februar",
    "mars",
    "april",
    "mai",
    "juni",
    "juli",
    "august",
    "september",
    "november",
    "desember",
  ];
  return months[numericMonth];
};

export { getMonth };
