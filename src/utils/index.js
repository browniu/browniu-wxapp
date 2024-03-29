/* eslint-disable */
function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function rgbToHex(R, G, B) {
  return toHex(R) + toHex(G) + toHex(B)
}
export function toHex(n) {
  n = parseInt(n, 10)
  if (isNaN(n)) return '00'
  n = Math.max(0, Math.min(n, 255))
  return '0123456789ABCDEF'.charAt((n - n % 16) / 16) +
    '0123456789ABCDEF'.charAt(n % 16)
}

export default {
  formatNumber,
  formatTime
}
