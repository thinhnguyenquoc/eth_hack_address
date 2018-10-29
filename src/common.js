const bip39 = require('bip39')

class Common {
	generateMnemonic () {
		return bip39.generateMnemonic()
	}

	validateMnemonic (mnemonic) {
		return bip39.validateMnemonic(mnemonic)
	}

	mnemonicToSeed (mnemonic) {
		return bip39.mnemonicToSeed(mnemonic)
	}
}

module.exports = Common
