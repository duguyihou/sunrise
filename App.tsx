import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { store, persistor } from 'app/store'
import Routes from 'routes/index'

const queryClient = new QueryClient()

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Routes />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
