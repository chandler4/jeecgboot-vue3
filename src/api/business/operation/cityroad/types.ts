export type OverviewType = {
    section_code: string
    section_name: string
    index: Number
    close: Number
    maintenance: Number
    event: Number
    congestion: Number
    warn: Number
    normal: Number
    total: Number
  }
  export type CityRoadWarnType={
    section_code: string
    section_name: string
    index: Number
    duration:Number
    status:Number
  }
  export type CityRoadRealTimeType={
    section_code: string
    section_name: string
    update_time:Date
    index: Number
    describe: string
    slow: string
    congestion: string
    severe:string
    avg: string
    report:Number
  }

  export type CityRoadCongestionType ={
    section_code: string
    section_name: string
    degree:Number
    speed:Number
    length: Number
  }
