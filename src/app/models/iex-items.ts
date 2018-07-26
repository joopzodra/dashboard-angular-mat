export interface IexDayItem {
  company: string,
  quote: {
    company_name: string,
    latest_update: number,
    latest_price: number
  },
  day: {
    symbol: string,
    chart_data: {
      date: string,
      time: string,
      price: number
    }[]
  }
}

export interface IexLongtermItem {
  month: {
    symbol: string,
    chart_data: {
      date: string,
      price: number
    }[]
  },
  twoYears: {
    symbol: string,
    chart_data: {
      date: string,
      price: number
    }
  }[]
}
