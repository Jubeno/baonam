/* eslint-disable no-unused-expressions */
import log from '@/utils/log';
import * as supplierService from '@/services/supplierServices';
import * as articlesServices from '@/services/articlesServices'

const typeLog = 'log'
export const suppliers = (apolloClient, variables) => apolloClient.query({
    variables: { ...variables },
    query: supplierService.getAll
}).catch(error => {
    error.graphQLErrors && log(typeLog, "graphQLErrors: ", error.graphQLErrors)
    error.networkError && log(typeLog, "networkError: ", error.networkError)
})

export const articlers = (apolloClient, variables) => apolloClient.query({
    variables: { ...variables },
    query: articlesServices.getAll
}).catch(error => {
    error.graphQLErrors && log(typeLog, "graphQLErrors: ", error.graphQLErrors)
    error.networkError && log(typeLog, "networkError: ", error.networkError)
})