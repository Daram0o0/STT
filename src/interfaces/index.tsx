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

interface ITimeCell {
  time_table?: time_table,
  style?: React.CSSProperties,
  readonly?: boolean,
  clickEvent?: (info: info) => void,
}

interface info {
  id?: number,
  week?: number,
  startTime?: number,
  endTime?: number,
  className?: String,
  where?: String,
  color?: string,
  text?: string,
}

export type { schedule, time_table, ITimeCell, info };