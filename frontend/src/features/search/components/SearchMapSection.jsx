import MultiMap from "../../parking/components/MultiMap";

function SearchMapSection({
  parkings,
  selectedParking,
  onSelectParking,
  onBoundsChange,
  userLocation,
  onMoveToCard,
}) {
  return (
    <div className="mb-6 overflow-hidden rounded-3xl bg-white p-3 shadow-sm ring-1 ring-black/5">
      <MultiMap
        parkings={parkings}
        selectedParking={selectedParking}
        onSelectParking={onSelectParking}
        onBoundsChange={onBoundsChange}
        userLocation={userLocation}
        onMoveToCard={onMoveToCard}
      />
    </div>
  );
}

export default SearchMapSection;
