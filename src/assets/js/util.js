/**
 * 时间格式化
 * @param time
 * @return yy-MM-dd hh:mm:ss
 */
export const formatDate = (time) => {
  let yy, MM, dd, hh, mm, ss
  const date = new Date(time)
  yy = date.getFullYear()
  MM = date.getMonth() + 1 > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
  dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  hh = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  mm = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  ss = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  return yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
}
