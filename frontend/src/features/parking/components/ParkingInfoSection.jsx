import {
  formatOperatingHours,
  formatCapacity,
  formatBasicFee,
  formatAdditionalFee,
  formatDayTicket,
  formatMonthlyTicket,
  formatFeeType,
  getFeeTypeStyle,
} from "../utils/formatParking";

function InfoRow({ label, value, highlight = false }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-gray-100 py-4 last:border-b-0">
      <span className="shrink-0 text-sm font-medium text-gray-500">
        {label}
      </span>
      <span
        className={`text-right text-sm font-semibold leading-6 ${
          highlight ? "text-pink-500" : "text-gray-800"
        }`}
      >
        {value || "정보 없음"}
      </span>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 sm:px-5">
      <h4 className="border-b border-gray-100 py-4 text-sm font-bold text-gray-900">
        {title}
      </h4>
      {children}
    </div>
  );
}

function ParkingInfoSection({ parking }) {
  if (!parking) return null;

  const feeType = getFeeTypeStyle(parking);

  return (
    <section className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-xs font-semibold tracking-wider text-pink-400">
          INFO
        </p>
        <h3 className="mt-1 text-xl font-bold text-gray-900">기본 정보</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-gray-100">
          <p className="text-xs font-semibold text-gray-400">요금 구분</p>
          <div className="mt-2">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${feeType.className}`}
            >
              {feeType.label}
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 ring-1 ring-gray-100">
          <p className="text-xs font-semibold text-gray-400">주차면수</p>
          <p className="mt-2 text-2xl font-extrabold text-violet-500">
            {formatCapacity(parking.totalSpaces)}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <SectionCard title="운영 정보">
          <InfoRow label="주소" value={parking.address || "주소 정보 없음"} />
          <InfoRow
            label="평일 운영시간"
            value={formatOperatingHours(
              parking.weekdayStart,
              parking.weekdayEnd,
            )}
          />
          <InfoRow
            label="토요일 운영시간"
            value={formatOperatingHours(
              parking.saturdayStart,
              parking.saturdayEnd,
            )}
          />
          <InfoRow
            label="공휴일 운영시간"
            value={formatOperatingHours(
              parking.holidayStart,
              parking.holidayEnd,
            )}
          />
        </SectionCard>

        <SectionCard title="요금 정보">
          <InfoRow label="요금 구분" value={formatFeeType(parking)} />
          <InfoRow
            label="기본 요금"
            value={formatBasicFee(parking)}
            highlight
          />
          <InfoRow label="추가 요금" value={formatAdditionalFee(parking)} />
          <InfoRow label="1일권" value={formatDayTicket(parking)} />
          <InfoRow label="월정기권" value={formatMonthlyTicket(parking)} />
        </SectionCard>

        <SectionCard title="부가 정보">
          <InfoRow
            label="전화번호"
            value={parking.phoneNumber || "전화번호 정보 없음"}
          />
          <InfoRow
            label="운영 기관"
            value={parking.institutionName || "운영 기관 정보 없음"}
          />
        </SectionCard>
      </div>
    </section>
  );
}

export default ParkingInfoSection;
