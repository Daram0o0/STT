interface schedule { // time_block - type( Object )
  id: number, // 수업 구분할 id값
  className: String, //수업 이름
  where: String, // 수업 장소
  week: number, // 수업 요일
  startTime: number, // 수업 시작 시간
  endTime: number, // 수업 종료 시간
}

interface time_table {
  name: String,
  ownerId: String,
  description: String,
  schedules: schedule[],
}

export type { schedule, time_table };