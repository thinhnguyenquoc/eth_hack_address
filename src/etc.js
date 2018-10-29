const HDKey             = require('ethereumjs-wallet/hdkey')
const Wallet            = require('ethereumjs-wallet')
const Util              = require('ethereumjs-util')
const Common            = require('./common.js')
const HD_PATH_STRING    = "m/44'/60'/0'/0" 

var common = new Common()

class ETC {
    getWallet(mnemonic, path, child) {
        if (mnemonic === undefined || mnemonic === null || mnemonic === '') {
            mnemonic = common.generateMnemonic();
            console.log(mnemonic);
        }
        let masterSeed  = common.mnemonicToSeed(mnemonic)
        let _wallet     = HDKey.fromMasterSeed(masterSeed).derivePath(path || HD_PATH_STRING).deriveChild(child || 0).getWallet()
        return _wallet
    }

    generateWallet() {
        return Wallet.generate()
    }

    fromV3(input, password) {
        return Wallet.fromV3(input, password)
    }

    createWalletFromSeed(mnemonic, path, child) {
        let _wallet  = this.getWallet(mnemonic, path, child)
        if (_wallet !== null) {
            //console.log("address: ",    _wallet.getAddressString())
            //console.log("privateKey: ", _wallet.getPrivateKeyString())
            //1284console.log("\n")
            return {
                address:    _wallet.getAddressString(),
                privateKey: _wallet.getPrivateKeyString()
            }
        }
        return null
    }

    validateAddress(address) {
        return Util.isValidAddress(address.toLowerCase())
    }
}

module.exports = ETC
