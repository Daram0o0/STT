interface time_table { // time_block - type( Object )
  className: String, //수업 이름
  where: String, // 수업 장소
  week: number, // 수업 요일
  startTime: number, // 수업 시작 시간
  endTime: number, // 수업 종료 시간
}

export type { time_table };