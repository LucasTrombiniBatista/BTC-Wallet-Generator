// importando as dependencias necessárias
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// Definindo a rede
// Bitcoin mainnet
// Testnet rede para testes
const network = bitcoin.networks.testnet;

// derivaração de carteiras HD
const path = `m/49'/1'/0'/0`

//criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic() // gerando uma frase mnemônica
const seed = bip39.mnemonicToSeedSync(mnemonic) // convertendo a frase mnemônica em uma seed

// criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

// criando a conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada com sucesso!\n")
console.log("Endereço BTC: ", btcAddress)
console.log("Chave privada (WIF): ", node.toWIF())
console.log("Mnemonic (frase de recuperação): ", mnemonic)