import CommandPrompt from './CommandPrompt'
import * as configuration from '../lib/configuration'
import Machinomy from '../index'
import Web3 = require('web3')

function channels (command: CommandPrompt): void {
  let settings = configuration.sender()
  let provider = configuration.currentProvider()
  let web3 = new Web3(provider)

  if (settings.account) {
    let account = settings.account
    let machinomy = new Machinomy(account, web3, {engine: settings.engine})
    machinomy.channels().then((channels: any) => {
      console.log(channels)
    }).catch((e: Error) => {
      console.log(e)
    }).then(() => {
      return machinomy.shutdown()
    }).catch((e) => {
      console.error('Failed to cleanly shut down:')
      console.error(e)
      process.exit(1)
    })
  }
}

export default channels
