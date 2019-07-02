const fetch = require('node-fetch')
const qs = require('querystring')

function getIdentifierName(data = {}) {
  const base = data.base || 'no-base'
  const date = data.date || 'no-date'

  return `exchange-rates-api-${base}-${date}`
}

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions,
) => {
  delete configOptions.plugins // eslint-disable-line no-param-reassign

  const { endpoint = 'latest', query = {} } = configOptions
  const apiOptions = qs.stringify({ ...query })

  return fetch(`https://api.exchangeratesapi.io/${endpoint}?${apiOptions}`)
    .then(response => response.json())
    .then((data) => {
      actions.createNode({
        ...data,
        id: createNodeId(getIdentifierName(data)),
        parent: null,
        children: [],
        internal: {
          type: 'ExchangeRates',
          content: JSON.stringify(data),
          contentDigest: createContentDigest(data),
        },
      })
    })
}
