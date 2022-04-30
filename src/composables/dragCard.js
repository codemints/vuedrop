import { ref } from 'vue'
import { data as DATA } from '@scripts/data'
import { getDate } from '@scripts/helpers'

//Data store for current element data
const cardData = ref({})

//Shorthand for the CARDDATA ref above
const $_ = cardData.value

const handleData = (card, zone, obj) => {
  const dataSet = zone.dataset.progress
  const foundItem = obj.find(item => card.id.slice(6) === item.id)
  card.setAttribute('class', dataSet)

  if (dataSet === 'inprogress' && !foundItem?.startDate ) foundItem.startDate = getDate()
  if ( dataSet === 'completed' ) foundItem.completeDate = getDate()
  if (dataSet === 'requested' ) {
    delete foundItem.startDate
    delete foundItem.completeDate
  }
  if ( dataSet !== "completed" && foundItem?.completeDate ) delete foundItem.completeDate
}

/**
 * INITIAL PLACEHOLDER
 * Used to create the initial placeholder element
 * @param {DOMElement} el - element to append to body
 * @param {DOMElement} sibling - location where placeholder element should be placed
 * @param {Function} funct - function name for appending placeholder
 * @returns boolean
 */
const initialPlaceholder = (el, sibling, funct) => {
  document.body.append(el)
  const placeholder = createPlaceholder()
  sibling[funct](placeholder)
  return true
}

/**
 * CREATEPLACEHOLDER
 * Returns a created placholder element with same dimensions of current element
 * @returns DOMElement
 */
const createPlaceholder = () => {
  //Configure placeholder elment
  const placeholder = document.createElement('div')
  placeholder.style.width = `${$_.w}px`
  placeholder.style.height = `${$_.h}px`
  placeholder.classList.add('placeholder');

  //Add placeholder to CARDDATA object for removal later
  $_.placeholder = placeholder
  
  return placeholder
}

/**
 * HANDLEPLACEHOLDER
 * Creates and removes placeholder elements in the correct positions
 * @param {DOMElement} sibling - closest sibling element returned from GETNEXTSIBLING function
 * @param {DOMElement} zone - dropzone the current dragged element is over
 * @returns undefined
 */
const handlePlaceholder = (sibling, zone) => {
  //Exit function if not in a drop zone
  if ( !zone ) return
  //Shorthand for this function
  const that = handlePlaceholder

  //Last child of current zone
  const last = zone.lastElementChild
  
  //Set placeholder on initial click
  if ( $_.card === last && !that.kill ) {
    $_.prevZone = zone
    that.kill = initialPlaceholder($_.card, zone, 'append')
  } else if ( $_.card !== last && !that.kill ) {
    $_.prevZone = zone
    that.kill = initialPlaceholder($_.card, $_.sibling, 'before')
  }
  
  //Create new placeholder when changing zones
  if ( $_.prevZone !== zone ) {
    $_.placeholder.remove()
    const placeholder = createPlaceholder()
    zone.append(placeholder)
    $_.prevZone = zone
  }
  
  //Prevent from firing unless sibling changes
  if ( $_.prevSibling === sibling ) return

  //Remove old placeholder and insert new one above current closest sibling
  $_.placeholder.remove()
  const placeholder = createPlaceholder()
  if ( sibling !== undefined ) sibling.before(placeholder)
  else zone.append(placeholder)

  $_.prevSibling = sibling
}

/**
 * GETNEXTSIBLING
 * Gets the closest element below the current dragged element
 * @param {DOMElement} zone - the current zone the current element is in
 * @param {integer} y - the y-coordinate of the mouse
 * @returns DOMElement
 */
const getNextSibling = (zone, y) => {
  //If not over a dropzone exit function
  if ( zone === null ) return
  //Get an array of child elements for the current zone
  const siblings = Array.from(zone.children).filter(child => child !== $_.card && !child.classList.contains('placeholder'))
  
  //Return the closest sibling to current dragged element in the current zone
  return siblings.reduce((closestSibling, sibling) => {
    const rect = sibling.getBoundingClientRect()
    const offset = y - rect.top - rect.height / 2
    
    if ( offset < 0 && offset > closestSibling.offset ) {
      return { offset: offset, sibling: sibling }
    } else { 
      return closestSibling
    }
  }, { offset: Number.NEGATIVE_INFINITY }).sibling
}

/**
 * STARTDRAG
 * Configures item to be dragged, and sets up required data
 * @param {object} payload - returned DOMElement ref and event returned from component emit
 * @param {object} cardObj - current element's associated object from data object array
 * @param {DOMElement} zone - current element's current parent container
 */

export const startDrag = (payload) => {
  //Set up variables
  const event = payload.e
  const card = payload.el
  const owner = card.parentElement
  const cardRect = card.getBoundingClientRect()
  let sibling = card.nextElementSibling || owner

  // Used for consecutive drags
  if ( $_?.prevCard !== undefined ) {
    if ( $_.prevCard === card && $_.currentZone !== undefined ) {
      sibling = card.nextElementSibling || $_.currentZone
    }
    if ( $_.prevCard === card && $_.currentZone === undefined ) {
      sibling = card.nextElementSibling || owner
    }
    if ( $_.prevCard !== card  && card.dataset.drag === 'dragged') {
      sibling = card.nextElementSibling || owner
    }
  }
  
  //Data about current element stored in Vue ref
  //Allows data about current element to be access by other functions
  $_.zone = owner
  $_.startX = cardRect.x
  $_.startY = cardRect.y
  $_.w = cardRect.width
  $_.h = cardRect.height
  $_.card = card
  $_.sibling = sibling
  $_.dimensions = cardRect
  $_.osX = Math.round(event.clientX - cardData.value.startX)
  $_.osY = Math.round(event.clientY - cardData.value.startY)

  // console.log(card, $_?.prevCard, $_.sibling)


  //Set width and height of current element
  //Maintains element's size when positioning absolutely
  card.style.width = `${cardRect.width}px`
  card.style.height = `${cardRect.height}px`
  
  //Set event listeners on when mousedown
  //Call DRAGGING and ONDROP functions respectively
  document.addEventListener('mousemove', dragging)
  document.addEventListener('mouseup', onDrop)
}

/**
 * DRAGGING
 * Controls current element's position when dragged, and create's placeholder elements
 * @param {event} e - event passed implicityly from handler
 */

const dragging = (e) => {
  //Prevent default behavior and event propagation
  e.preventDefault()
  e.stopPropagation()

  //Set current element's position to follow mouse
  $_.card.style.left = `${e.clientX - $_.osX}px`
  $_.card.style.top = `${e.clientY - $_.osY}px`

  //Add class to style card rotation and absolute positioning
  $_.card.classList.add('drag')

  //Hide card to 'see' element below it
  $_.card.hidden = true

  //Return the topmost element under current element
  //Use to 'see' if element is droppable zone
  const elementBelow = document.elementFromPoint(e.clientX, e.clientY)

  //Show card once under element is stored
  $_.card.hidden = false

  //Get the closest dropzone to the element under current element
  const closestZone = elementBelow.closest('.zone')

  //Check to see if current zone is same as closest zone
  if ( $_.curZone !== closestZone ) {
    // if ( $_.curZone ) $_.curZone.style.backgroundColor = ''

    $_.curZone = closestZone
  
    if ( $_.curZone ) {
      // $_.curZone.style.backgroundColor = '#666666'
    }
  }

  const nextSibling = getNextSibling($_.curZone, e.clientY)

  handlePlaceholder(nextSibling, $_.curZone)
}

/**
 * ONDROP
 * Controls required events when item is 'dropped'
 * @param {event} e - event passed implicitly from handler
 */
const onDrop = (e) => {
  //Prevent default behavior and event propagation
  e.preventDefault()
  e.stopPropagation()
  
  //Remove mousemove event handler added in STARTDRAG function
  document.removeEventListener('mousemove', dragging)

  //If card hasn't moved, reset and exit function
  if ( Math.round($_.startX) === $_.card.offsetLeft && Math.round($_.startY) === $_.card.offsetTop ) {
    $_.card.classList.remove('drag')
    $_.card.style.width = ''
    $_.card.style.height = ''
    document.removeEventListener('mouseup', onDrop)
    return
  }
  
  //Get the current element's nextElementSibling data property
  const type = $_.sibling.dataset.type
  
  //If placeholder exists delete it
  if ( $_.placeholder !== undefined ) $_.placeholder.remove()
  
  //Insert current element in sorted position
  if ( $_.prevSibling === undefined ) $_.prevZone.append($_.card)
  else $_.prevSibling.before($_.card)

  //Function call to handle label colors, due dates, and completed dates
  handleData($_.card, $_.curZone, DATA.value)

  //Remove styles for rotation and absolute positioning
  $_.card.classList.remove('drag')

  //Set previous card dragged to the currently dropped
  $_.prevCard = $_.card

  //Set previous zone to card's current parent
  $_.prevZone = $_.card.parentElement
  
  //Set data property to check if previous card has been dragged
  $_.card.dataset.drag = 'dragged'
  
  //Remove inline style attributes required for dragging
  $_.card.style.width = ''
  $_.card.style.height = ''
  $_.card.style.top = ''
  $_.card.style.left = ''
  
  //Reset HANDLEPLACEHOLDER kill flag so it can be ran on next mousemove
  handlePlaceholder.kill = false
  
  //TEMP
  if ( $_.curZone !== null ) $_.curZone.style.backgroundColor = ''
  
  //Remove mouseup event handler added in STARTDRAG function
  //Event handler used to call this function
  document.removeEventListener('mouseup', onDrop)
}
