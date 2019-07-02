const fetch = require('node-fetch')
const qs = require('querystring')

function getIdentifierName(base = 'no-base', date = 'no-date') {
  return `exchange-rates-api-${base}-${date}`
}

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions,
) => {
  delete configOptions.plugins // eslint-disable-line no-param-reassign

  const { endpoint = 'latest', query = {} } = configOptions
  const apiOptions = qs.stringify({ ...query })

  function createNode(properties) {
    return actions.createNode({
      ...properties,
      id: createNodeId(getIdentifierName(query.base, properties.date)),
      parent: null,
      children: [],
      internal: {
        type: 'ExchangeRates',
        content: JSON.stringify(properties),
        contentDigest: createContentDigest(properties),
      },
    })
  }

  return fetch(`https://api.exchangeratesapi.io/${endpoint}?${apiOptions}`)
    .then(response => response.json())
    .then((data) => {
      if (endpoint === 'history') {
        return Object.entries(data.rates).forEach(([date, rate]) =>
          createNode({
            ...rate,
            date,
          }),
        )
      }

      return createNode({
        ...data.rates,
        date: data.date,
      })
    })
}
