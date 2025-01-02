// import { getDelay } from './utils.js';

const promo1 = async (settigs) => {
    const tabStatus = await chrome.runtime.sendMessage({ type: 'getTabStatus' });
    
        console.log('tab status ', tab[0]);
        console.log('DOMContentLoaded'); 
    console.log('Promo1 script loaded');
    // })
//     const settingTypeSwitch = document.querySelector('[data-marker="bid-type-switcher/toggle"]');
//     const viewPriceInput = document.querySelector('[data-marker="bid-setting-input/input"]');
//     const dailyLimitInput = document.querySelector('[data-marker="limit-settings-input/input"]');
    
//     if (settings.autoSetting && settingTypeSwitch.checked !== settings.autoSetting) {
//         setTimeout(() => {
//             settingTypeSwitch.checked = settings.autoSetting;
//         }, getDelay());
//     }
//     if (settings.viewPrice && viewPriceInput.value !== settings.viewPrice) {
//         setTimeout(() => {
//             viewPriceInput.value = settings.viewPrice;
//         }, getDelay());
//     }
//     if (settings.dailyLimit && dailyLimitInput.value !== settings.dailyLimit) {
//         setTimeout(() => {
//             dailyLimitInput.value = settings.dailyLimit;
//         }, getDelay());
//     }

// /*     setTimeout(() => {
//         //прооверить возможные кнопки
//         const button = document.querySelector('[data-marker=""]');//action-buttons-primary action-buttons-secondary
//         chrome.runtime.sendMessage({ action: "promo1Complete" });
//         button.click();
//     }, getDelay()); */

//     const observer = new MutationObserver(async mutations => {
//         const popup = document.querySelector('[data-marker="action-popup/popup"]');
//         if (popup) {
//             const button = document.querySelector('[data-marker="action-popup-primary-button"]');
//             await {
//                 then: resolve => setTimeout(() => {
//                     button.click();
//                     resolve();
//                 }, getDelay())
//             }
//         }
//         observer.disconnect();
//     });

//     observer.observe(document.body, {
//         subtree: true
//     });
}