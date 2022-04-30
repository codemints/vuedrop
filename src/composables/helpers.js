const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

export const getCards = (data, zoneID) => {
  return data.filter(item => item.owner === zoneID)
}

export const handleDelete = (e, dataID, dataObj) => {
  dataObj.splice(dataObj.findIndex(index => index.id === dataID), 1)
}

export const getDate = () => {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const m = months[today.getMonth()]
  const yyyy = today.getFullYear()

  const hh = today.getHours()
  const mm = String(today.getMinutes()).padStart(2, '0')

  const t = hh > 12 ? `${hh - 12}:${mm}PM` : `${hh}:${mm}AM`

  return `${dd} ${m} ${yyyy} @ ${t}`
}