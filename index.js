const addEventListener = EventTarget.prototype.addEventListener

const createHTMLEvent = function(type) {
  const event = document.createEvent('HTMLEvents')
  event.initEvent(type)
  return event
}

const EventListenerWrapper = function addEventListenerWrapper(type) {
  
  if (type === 'resize') {
    registerEvent(this)
  }

  addEventListener.apply(this, arguments)
}
function initObserver(callback) {
  const observer = (initObserver.observer =
    initObserver.observer || new ResizeObserver(callback))
  observer.initialized = true

  return observer
}

function registerEvent(elm) {
  const observer = initObserver(entries => {
    console.log(entries)
    if (observer.initialized) {
      observer.initialized = false
      return
    }
    for (let entry of entries) {
      const event = createHTMLEvent('resize')
      entry.target.dispatchEvent(event)
      if (
        entry &&
        entry.target &&
        typeof entry.target.onresize === 'function'
      ) {
        entry.target.onresize(event)
      }
      // console.log('dispatch-event-resize')
    }
  })

  observer.observe(elm)
}
HTMLElement.prototype.addEventListener = EventListenerWrapper