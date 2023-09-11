export const daysLeft = ({
  updated_at,
  expiry,
}: {
  updated_at: Date;
  expiry: Date;
}) => {
  const daysFromNow = Math.round(
    (Date.now() - updated_at.getTime()) / (1000 * 60 * 60 * 24)
  );

  const daysFromExpiry = Math.round(
    (expiry.getTime() - updated_at.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysFromNow > daysFromExpiry) {
    return daysFromExpiry;
  }

  return daysFromNow;
};
