import { DateFormat, priceToString } from "./StaticComponents";
import { ReservationSummaryBlock } from "./SummaryBlock";
import { FetchReservation, FetchReservationByPostKey } from "./FetchList";

function ReservationByPostKeyInfo({ post_key }) {
  const [reservation, loading] = FetchReservationByPostKey(post_key)

  return (
    <div className="mb-4">
      <h2 className="text-2xl font-extrabold">예약 현황</h2>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {loading ?
        (
          <p className="text-base font-extrabold">예약이 아직 없습니다.</p>
        ) : (reservation.length > 0 ? reservation.map((res) => {
          const startStr = DateFormat(res.r_start_day)
          const endStr = DateFormat(res.r_end_day)
          const pay = priceToString(res.pay)

          return (
            <>
              <p className="ml-3 text-lg font-medium">게스트: {res.User.username}</p>
              <p className="ml-3 text-lg font-medium">기간: {startStr} ~ {endStr}</p>
              <p className="ml-3 text-lg font-medium">비용: {pay}</p>
              <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
            </>
          )

        }
        ) : <p className="text-base font-extrabold">예약이 아직 없습니다.</p>)
      }
    </div>
  )
};

function ReservationInfo() {
  const [reservation, loading] = FetchReservation()
  console.log('[reservation]', reservation)
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-extrabold">예약 현황</h2>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {loading ?
        (
          <p className="text-base font-extrabold">예약이 아직 없습니다.</p>
        ) : (reservation.length > 0 ? reservation.map((res) => (
          <ReservationSummaryBlock
            title={res.Post.title}
            host={res.Post.postuser.user_id}
            start_day={res.r_start_day}
            end_day={res.r_end_day}
            pay={res.pay}
            key_num={res.key}
            room_image={res.Post.image_id[0]}
          />
        )
        ) : <p className="text-base font-extrabold">예약이 아직 없습니다.</p>)
      }
    </div>
  )

};

export { ReservationInfo, ReservationByPostKeyInfo };