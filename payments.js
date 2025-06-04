// payments.js

import CONFIG from './config.js';

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

function getWalletLink(currency, network, wallet) {
    if (currency === 'BTC') return `https://blockchair.com/bitcoin/address/${wallet}`;
    if (currency === 'SOL') return `https://solscan.io/account/${wallet}`;
    if (network === 'TRON') return `https://tronscan.org/#/address/${wallet}`;
    return `https://debank.com/profile/${wallet}`;
}

// 🔧 Simuler les données ici
async function fetchPaymentData() {
    return {
        senderName: 'Demo Company',
        wallet: '0xABCDEF1234567890ABCDEF1234567890ABCDEF12',
        subtotal: '100',
        totalWorth: 100,
        currency: 'USDT',
        orderId: 'TEST123',
        date: '2025-06-04',
        status: 'Complete',
        title: 'Test Payment',
        paymentMethod: 'Ethereum',
        buttonText: 'Receive payment',
        buttonClass: '',
        emailReceipt: false,
        walletField: true,
        icon: './media/verified.png',
        logoDisplay: true,
        hideNetwork: false,
        coinbaseText: 'coinbase',
        coinbaseColor: '#0052ff',
        commerceText: 'commerce',
        commerceColor: '#1f2937',
    };
}

async function initializePage() {
    preloader.classList.remove('hidden');
    paymentContent.classList.add('hidden');

    const data = await fetchPaymentData();

    setTimeout(() => {
        preloader.classList.add('hidden');
        paymentContent.classList.remove('hidden');
    }, 1000); // petit délai pour l’effet

    const feeValue = parseFloat(data.totalWorth) * 0.01;
    senderNameDisplay.textContent = data.senderName;
    verifiedIcon.src = data.icon;
    subtotalDisplay.textContent = `${parseFloat(data.subtotal).toFixed(2)} ${data.currency}`;
    feeDisplay.textContent = feeValue.toFixed(2);
    amountDisplayTotal.textContent = parseFloat(data.totalWorth).toFixed(2);

    if (data.walletField && data.wallet) {
        walletFieldDisplay.style.display = 'block';
        walletShort.textContent = data.wallet.slice(0, 20) + '...';
        walletLink.href = getWalletLink(data.currency, data.paymentMethod, data.wallet);
    } else {
        walletFieldDisplay.style.display = 'none';
    }

    currencyDisplay.textContent = `${data.currency} `;
    currencyIcon.src = CONFIG.CURRENCIES[data.currency];
    networkDisplay.textContent = data.hideNetwork ? '' : `${data.paymentMethod} Network`;
    networkIcon.src = CONFIG.NETWORKS[data.paymentMethod];
    networkDisplay.style.display = data.hideNetwork ? 'none' : 'inline';
    networkIcon.style.display = data.hideNetwork ? 'none' : 'inline';

    dateDisplay.textContent = new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    orderCode.textContent = data.orderId;
    statusDisplay.textContent = data.status;
    statusDisplay.classList.remove('bg-blue-100', 'text-blue-800', 'bg-yellow-100', 'text-yellow-800', 'bg-red-100', 'text-red-800');
    if (data.status.toLowerCase() === 'complete') statusDisplay.classList.add('bg-blue-100', 'text-blue-800');
    else if (data.status.toLowerCase() === 'pending') statusDisplay.classList.add('bg-yellow-100', 'text-yellow-800');
    else statusDisplay.classList.add('bg-red-100', 'text-red-800');

    titleDisplay.textContent = data.title;
    actionButton.innerHTML = `
        <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path fill="currentColor" d="M512.1,692c-99.4,0-180-80.5-180-180s80.6-180,180-180c89.1,0,163.1,65,177.3,150h181.3c-15.3-184.8-170-330-358.7-330c-198.8,0-360,161.2-360,360s161.2,360,360,360c188.7,0,343.4-145.2,358.7-330H689.3C675,627,601.2,692,512.1,692z"/>
        </svg>
        <span>${data.buttonText}</span>
    `;
    actionButton.className = `action-btn flex items-center justify-center space-x-2 ${data.buttonClass}`;
    logoContainer.style.display = data.logoDisplay ? 'flex' : 'none';
    coinbaseTextDisplay.textContent = data.coinbaseText;
    coinbaseTextDisplay.style.color = data.coinbaseColor;
    commerceTextDisplay.textContent = data.commerceText;
    commerceTextDisplay.style.color = data.commerceColor;

    if (data.emailReceipt) {
        emailInputContainer.style.display = 'block';
        actionButton.disabled = true;
        emailInput.addEventListener('input', () => {
            const email = emailInput.value.trim();
            const valid = isValidEmail(email);
            emailInput.classList.toggle('border-red-500', !valid);
            actionButton.disabled = !valid;
        });
    }
}

initializePage();
