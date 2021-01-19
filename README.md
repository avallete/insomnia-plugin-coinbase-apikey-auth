<p align="center"> 
<img src="https://raw.githubusercontent.com/avallete/insomnia-plugin-coinbase-apikey-auth/master/icon.svg">
</p>

#Insomnia CoinBase ApiKey Auth Plugin

[![Build Status](https://travis-ci.com/avallete/insomnia-plugin-coinbase-apikey-auth.svg?token=txZxL36xTEx59s4pStm6&branch=master)](https://travis-ci.com/avallete/insomnia-plugin-coinbase-apikey-auth)

A simple insomnia plugin to easily authenticate and perform request to Coinbase.com using API_KEY.

## Usage:

To use this plugin with insomnia, first you need to [get your personals API_KEYS from CoinBase here](https://www.coinbase.com/settings/api)

Then on insomnia, you have to add two variables to your environment:
- `COINBASE_API_KEY`
- `COINBASE_SECRET_KEY`

Like so:

```json
{
  "COINBASE_API_KEY": "[YOUR_API_KEY]",
  "COINBASE_SECRET_KEY": "[YOUR_SECRET_KEY]"
}
```

And that's it. All your requests are now authenticated with your API credentials.