export const getHealth = (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Candle Server is running smoothly',
    timestamp: new Date().toISOString(),
  });
};
