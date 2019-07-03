[![NPM version](https://img.shields.io/npm/v/gatsby-source-exchange-rates-api.svg)](https://www.npmjs.com/package/gatsby-source-exchange-rates-api)

## Description
A Gatsby source plugin for retrieving data from the exchangeratesapi.io API.

## How to install
Install the package as a dependency

`yarn add gatsby-source-exchange-rates-api`

Add the plugin to your `gatsby-config.js` file
```javascript
// gatsby-config.js
{
  plugins: [
    {
      resolve: 'gatsby-source-exchange-rates-api',
    }
  ]
}
```

## How to query data
You can select the endpoint to fetch from by specifying `endpoint` in the plugins `options` object. The default is the endpoint `latest`. You can also specify query parameters as a `query` object (default is no query).

Exchange Rates API documentation: [(Github)](https://github.com/exchangeratesapi/exchangeratesapi) [(Website)](https://exchangeratesapi.io/)

```javascript
// gatsby-config.js
{
  resolve: 'gatsby-source-exchange-rates-api',
  options: {
    endpoint: 'history', // (optional) default is "latest"
    query: { // (optional)
      base: 'SEK',
      symbols: 'EUR,USD',
      start_at: '2019-02-01',
      end_at: '2019-02-03',
    },
  }
}
```

If you use the default endpoint `latest` you will get one node with the latest rates. If you use the endpoint `history` there will be multiple rates returned as an array instead.

### Latest endpoint usage example
```javascript
// Get the latest rates
useStaticQuery(graphql`
  query {
    exchangeRates {
      id
      date
      USD
    }
  }
`)
```

### History endpoint usage example
```javascript
// Get an array of history rates
useStaticQuery(graphql`
  query {
    allExchangeRates {
      edges {
        node {
          id
          date
          USD
          EUR
        }
      }
    }
  }
`)
```

## Credits
[Madis Väin](https://github.com/madisvain), creator of the Exchange Rates API

https://exchangeratesapi.io/