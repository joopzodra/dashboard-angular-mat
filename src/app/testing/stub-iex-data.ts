const stubDayData = [
  { date: "20180725", time: "09:30", price: 216 },
  { date: "20180725", time: "09:45", price: 216.44 },
  { date: "20180725", time: "10:10", price: 214.31 },
  { date: "20180725", time: "12:21", price: 216.73 },
  { date: "20180725", time: "12:42", price: 218.28 },
  { date: "20180725", time: "13:57", price: 217.13 },
  { date: "20180725", time: "15:59", price: 218.17 },
];

export const stubIexDayItem = {
  company: 'AAAA',
  quote: {
    company_name: 'a company',
    latest_update: {
      amsterdamTimeIso: '2018-07-27T22:00:00.248+02:00',
      newYorkTimeIso: '2018-07-27T16:00:00.248-04:0',
      weekday: 5
    },
    latest_price: 217.5
  },
  day: {
    symbol: 'AAAA',
    chart_data: stubDayData
  }
};
