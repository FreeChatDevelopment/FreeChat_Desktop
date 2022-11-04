/*****************************************************
 *                     web3 Wallet                   *
 ****************************************************/
import * as Etherjs from 'ethers'
const { REACT_APP_API_URL } = process.env as { REACT_APP_API_URL: string };
class Wallet {
  private wallet?: {}
  private provider: {}
  constructor() {
    let path = "m/44'/60'/0'/0/0";
    this.provider = new Etherjs.providers.JsonRpcProvider(REACT_APP_API_URL);
  }
  /**
   * Create a mnemonic
   * @returns string
   */
  public getFromMnemonic(): string | boolean {
    const Rand = Etherjs.utils.randomBytes(16)
    const mnemonic = Etherjs.utils.entropyToMnemonic(Rand)
    // 检查助记词是否有效。
    if (!Etherjs.utils.isValidMnemonic(mnemonic)) {
      return false
    }
    return mnemonic
  }
}

let wallet = new Wallet()

export default wallet