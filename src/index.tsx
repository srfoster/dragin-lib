import * as React from 'react';

export function useDraginOutgoing(initialData:any, currentData:any,triggers:any){
  React.useEffect(() => {
    let top = window.top

    if (JSON.stringify(initialData) == JSON.stringify(currentData)) {
      //BUG: What about when the data changes and then changes back to the initial value?  (e.g. going back to sentence 0)

      currentData._initializationFlag = true
    }
    console.log("App: Outgoing data", currentData)

    if (top)
      top.postMessage(
        JSON.stringify(currentData),
        '*'
      );
  }, triggers)
}

export function useDraginIncoming(callback:any){
  React.useEffect(() => {
    const handler = (event:any) => {
      if(!event || !event.data) return
      let card
      try {
        card = JSON.parse(event.data)
      }
      catch (e) {
        console.error(e)
      }
      console.log("App: Incoming data", card)

      if(card && card.data)
        callback(card)
    }

    window.addEventListener("message", handler)

    // clean up
    return () => window.removeEventListener("message", handler)
  }, [])
}
