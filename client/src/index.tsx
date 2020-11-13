import React from 'react'
import ReactDOM from 'react-dom'
import {ApolloClient, NormalizedCacheObject, ApolloProvider} from '@apollo/client';
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { cache } from './cache';
import { persistCache } from 'apollo3-cache-persist';

const init = async () => {
  await persistCache({
    cache,
    storage: window.localStorage,
  })
}
init()


const client: ApolloClient<NormalizedCacheObject>= new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
  )
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
