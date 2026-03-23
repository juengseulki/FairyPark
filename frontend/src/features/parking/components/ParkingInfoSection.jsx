import { formatBasicFee, formatTime } from "../utils/formatParking";

function InfoItem({ label, value, highlight = false }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl bg-gray-50 px-4 py-3">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span
        className={`text-right text-sm font-semibold ${
          highlight ? "text-pink-500" : "text-gray-800"
        }`}
      >
        {value || "정보 없음"}
      </span>
    </div>
  );
}

function ParkingInfoSection({ parking }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-xl font-bold text-gray-900">핵심 이용 정보</h3>

        <div className="space-y-3">
          <InfoItem
            label="평일 운영시간"
            value={formatTime(parking.weekdayStart, parking.weekdayEnd)}
          />
          <InfoItem
            label="주차 구획 수"
            value={parking.totalSpaces ?? "정보 없음"}
          />
          <InfoItem
            label="기본요금"
            value={formatBasicFee(parking)}
            highlight
          />
          <InfoItem
            label="전화번호"
            value={parking.phone || parking.phoneNumber || "정보 없음"}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-bold text-gray-900">위치 정보</h3>

        <div className="space-y-3">
          <InfoItem
            label="도로명 주소"
            value={parking.roadAddress || "정보 없음"}
          />
          <InfoItem
            label="지번 주소"
            value={parking.jibunAddress || "정보 없음"}
          />
          <InfoItem label="카테고리" value={parking.category || "정보 없음"} />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-bold text-gray-900">추가 정보</h3>

        <div className="space-y-3">
          <InfoItem
            label="결제방법"
            value={parking.paymentMethod || "정보 없음"}
          />
          <InfoItem
            label="장애인 주차구획 여부"
            value={parking.hasDisabledParking || "정보 없음"}
          />
          <InfoItem
            label="특기사항"
            value={parking.specialNote || "정보 없음"}
          />
        </div>
      </div>
    </div>
  );
}

export default ParkingInfoSection;
