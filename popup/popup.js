console.log('POPUP loaded');

document.addEventListener('DOMContentLoaded', async () => {
    console.log('POPUP DOM loaded');
    const settingTypeSwitch = document.getElementById('settingTypeSwitch');
    const viewPriceInput = document.getElementById('viewPriceInput');
    const dailyLimitInput = document.getElementById('dailyLimitInput');
    const isColorSwitch = document.getElementById('isColorSwitch');
    const isXLSwitch = document.getElementById('isXLSwitch');
    const promoStartButton = document.getElementById('promoStartButton');
    console.log(promoStartButton);

    const result = await chrome.storage.local.get('promoEditorSettings');
    const settings = result.promoEditorSettings || {};
    settingTypeSwitch.checked = settings.autoSetting || false;
    viewPriceInput.value = settings.viewPrice || 0;
    dailyLimitInput.value = settings.dailyLimit || 0;
    isColorSwitch.checked = settings.isColor || false;
    isXLSwitch.checked = settings.isXL || false;

    async function updateSettings(setting, value) {
        const result = await chrome.storage.local.get('promoEditorSettings');
        const settings = result.promoEditorSettings || {};
        settings[setting] = value;
        await chrome.storage.local.set({ promoEditorSettings: settings });
    }
    settingTypeSwitch.addEventListener('change', () => {
        updateSettings('autoSetting', settingTypeSwitch.checked);
    })
    viewPriceInput.addEventListener('input', () => {
        updateSettings('viewPrice', viewPriceInput.value);
    })
    dailyLimitInput.addEventListener('input', () => {
        updateSettings('dailyLimit', dailyLimitInput.value);
    })
    isColorSwitch.addEventListener('change', () => {
        updateSettings('isColor', isColorSwitch.checked);
    })
    isXLSwitch.addEventListener('change', () => {
        updateSettings('isXL', isXLSwitch.checked);
    })


    promoStartButton.addEventListener('click', async () => {
        /*         console.log('Sending message');
                const tab = await chrome.tabs.query({ active: true, currentWindow: true });
                console.log('tab ', tab);
                console.log('tab id ', tab[0].id); */
        await chrome.runtime.sendMessage({ action: 'startPromo' })
        console.log('POPUP Message sent');
    })
})



