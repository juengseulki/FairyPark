import ParkingCard from "../../parking/components/ParkingCard";
import SearchEmptyState from "./SearchEmptyState";

function SearchResultsSection({
  parkings,
  selectedParking,
  onSelectParking,
  shouldScrollIntoView = false,
  scrollTargetParkingId = null,
  onCardScrollComplete,
}) {
  if (parkings.length === 0) {
    return <SearchEmptyState />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {parkings.map((parking, index) => (
        <ParkingCard
          key={`${parking.id}-${index}`}
          parking={parking}
          onSelect={onSelectParking}
          isSelected={selectedParking?.id === parking.id}
          shouldScrollIntoView={
            shouldScrollIntoView && scrollTargetParkingId === parking.id
          }
          onScrollComplete={onCardScrollComplete}
        />
      ))}
    </div>
  );
}

export default SearchResultsSection;
