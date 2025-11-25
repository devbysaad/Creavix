import React from 'react'
import { ScrollProvider } from './context/ScrollContext'
import MainRouting from './router/mainRouting'

const App = () => {
  return (
    <>
    {/* <ScrollProvider> */}
      <MainRouting />
    {/* </ScrollProvider> */}
    </>
  )
}

export default App
