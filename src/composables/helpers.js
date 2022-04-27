export const handleError = (data) => {
  if ( data?.date && data?.title ) return false
  if ( !data?.date && !data?.title ) {
    return 'Feature requests require a title and desired due date'
  } else if ( !data?.title ) {
    return 'Please provide a title for this feature request'
  } else if ( !data?.date ) {
    return 'Please provide a desired due date for this feature request'
  }
}

export const createUUID = () => {
  return Math.random().toString(36).replace(/[^a-z-0-9]+/g, '').substring(6);
}

export const formatDate = (date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  //2022-04-07T18:38
  const getMonth = () => {
    const m = date.slice(5, 7)
    return m.charAt(0) === 0 ? months[parseInt(m.length-1)] : months[parseInt(m) - 1]
  }

  const getTime = () => {
    const t = date.slice(11)
    const h = t.slice(0, 2)
    const m = t.slice(2)
    let time
    if ( t === '00:00') return '12:00AM'
    return h > 12 ? time = `${h - 12}${m}PM` : time = `${h}${m}AM`
  }

  const month = getMonth()
  const year = date.slice(0, 4)
  const day = date.slice(8, 10)
  const time = getTime()

  return `${day} ${month} ${year} @ ${time}`
}

export const onDrag = (e, item) => {
  e.dataTransfer.dropEffect = 'move'
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('itemId', item.id)
  console.log(e)
}

export const onDrop = (e, list) => {
  e.preventDefault()
  console.log(e, list)
  // const itemId = e.dataTransfer.getData('itemId')
}