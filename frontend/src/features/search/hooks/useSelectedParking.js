import { useEffect, useState } from "react";

function useSelectedParking(parkings) {
  const [selectedParking, setSelectedParking] = useState(null);

  useEffect(() => {
    if (!parkings.length) return;

    setSelectedParking((prev) => {
      if (!prev) return null;

      const stillExists = parkings.some(
        (parking) => String(parking.id) === String(prev.id),
      );

      return stillExists ? prev : null;
    });
  }, [parkings]);

  return {
    selectedParking,
    setSelectedParking,
  };
}

export default useSelectedParking;
