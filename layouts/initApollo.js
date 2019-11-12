import { ApolloClient } from 'apollo-client'
import fetch from 'isomorphic-unfetch'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, from } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import CONFIG from '@/utils/config';

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

// const link = middlewareLogger.concat(middlewareContext).concat(httpLink)

function create(initialState, { getToken, getI18n }) {
  const middlewareLogger = new ApolloLink((operation, forward) =>
    // console.log("APOLLO LOGGER: ", operation.operationName);
    forward(operation).map((result) =>
      // console.log(`APOLLO LOGGER => received result from ${operation.operationName}`);
      result
    )
  );

  const middlewareContext = setContext((_, { headers }) => {
    const token = getToken();
    const i18n = getI18n();
    return {
      headers: {
        ...headers,
        // authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNvbm5lY3RkZWFsdm4iLCJ0aW1lIjoiMjAxOC0wNy0zMVQxNToyNzozOC4zNTBaIiwiaWF0IjoxNTMzMDUwODU4LCJleHAiOjE1NjQ1ODY4NTh9.rHk9MbCgnIsumq4VS6t6Rc5H2Ep7F9nsbVoxx5bhHNc",
        token: token ? `Bearer ${token}` : '',
        i18n: i18n || 'vi'
      }
    }
  });

  const httpLink = createHttpLink({
    uri: 'http://web.api.nhatnam.nbm.vn/api',
    // Server URL (must be absolute) //http://125.212.226.150:9008/api
    // uri: `${CONFIG.API_ENDPOINT}/api`,
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  })

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: from([
      middlewareLogger,
      middlewareContext,
      httpLink
    ]),
    cache: new InMemoryCache(),
    /* cache: new InMemoryCache({
      dataIdFromObject: object => object.id || null,
    }).restore(initialState || {}) */
  })
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
