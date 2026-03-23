import { useLocation, useParams } from "react-router-dom";
import ParkingActionPanel from "../components/ParkingActionPanel";
import ParkingInfoSection from "../components/ParkingInfoSection";
import ParkingLocationPanel from "../components/ParkingLocationPanel";
import useParkingDetail from "../hooks/useParkingDetail";

const DEFAULT_PARKING_IMAGE = "/src/shared/image//parking-default.png";

function formatBasicFee(parking) {
  if (parking.basicFee) return `${Number(parking.basicFee).toLocaleString()}원`;
  if (parking.fee) return `${Number(parking.fee).toLocaleString()}원`;
  if (parking.feeInfo) return parking.feeInfo;
  return "정보 없음";
}

function ParkingDetailPage() {
  const { id } = useParams();
  const location = useLocation();

  const initialParking = location.state?.parking || null;

  const { parking, isLoading, errorMessage } = useParkingDetail(
    id,
    initialParking,
  );

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-73px)] bg-gradient-to-b from-pink-50 via-white to-pink-100/60">
        <section className="mx-auto max-w-5xl px-5 py-20">
          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-black/5">
            <p className="text-lg font-semibold text-gray-700">
              주차장 정보를 불러오는 중입니다...
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (errorMessage || !parking) {
    return (
      <main className="min-h-[calc(100vh-73px)] bg-gradient-to-b from-pink-50 via-white to-pink-100/60">
        <section className="mx-auto max-w-5xl px-5 py-20">
          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-black/5">
            <p className="text-lg font-semibold text-gray-700">
              {errorMessage || "주차장 정보를 찾을 수 없습니다."}
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-gradient-to-b from-pink-50 via-white to-pink-100/60">
      <section className="mx-auto max-w-5xl px-5 py-12">
        <div className="mb-6 rounded-3xl bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 transition-all duration-200">
          <p className="mb-2 text-sm font-semibold text-pink-400">DETAIL</p>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            주차장 상세 정보
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            운영시간, 요금, 위치 등 필요한 정보를 한눈에 확인해보세요.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
          <img
            src={parking.imageUrl || DEFAULT_PARKING_IMAGE}
            alt={parking.name}
            onError={(e) => {
              e.currentTarget.src = DEFAULT_PARKING_IMAGE;
            }}
            className="h-72 w-full object-cover sm:h-96"
          />

          <div className="p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-500">
                    {parking.type || "주차장"}
                  </span>

                  {parking.parkingType && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                      {parking.parkingType}
                    </span>
                  )}
                </div>

                <h2 className="text-3xl font-extrabold text-gray-900">
                  {parking.name}
                </h2>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {parking.address || "주소 정보 없음"}
                </p>
              </div>

              <div className="rounded-3xl bg-pink-50 px-5 py-4 text-left sm:min-w-[220px]">
                <p className="text-xs font-semibold text-pink-400">기본요금</p>
                <p className="mt-2 text-2xl font-extrabold text-pink-500">
                  {formatBasicFee(parking)}
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <ParkingInfoSection parking={parking} />

              <div className="space-y-6">
                <ParkingActionPanel parking={parking} />
                <ParkingLocationPanel parking={parking} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ParkingDetailPage;
