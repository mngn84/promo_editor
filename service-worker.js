console.log('Main script loaded');

// chrome.runtime.onMessage.addListener(async message => {
//     console.log('Message received:', message);

// });
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tabId, { action: 'DOMContentLoaded' });
    }
    console.log('DOMContentLoaded');
})
chrome.runtime.onMessage.addListener(async message => {
    console.log('Message received:', message);
    const result = await chrome.storage.local.get(['promoEditorSettings', 'promoProgress']);
    const { settings, progressMap } = result;
//  window.location.href = `https://www.avito.ru`;

    if (message.action === "startPromo") {
        // const unprocessed = [...progressMap].filter(([, processed]) => !processed);
        if (unprocessed.length) {
            // window.location.href = `https://www.avito.ru/cpxpromo/${unprocessed[0]}?vasFrom=avito_osp_applied`;
            // promo1(settings);
        }
        if (window.location.href.includes("items")) {   //https://www.avito.ru/profile/pro/items....
            // search();
        }
        if (window.location.href.includes("cpxpromo")) {  //https://www.avito.ru/cpxpromo/4441912585?vasFrom=avito_osp_applied
            // promo1(settings);
        }
        if (window.location.href.includes("performance")) {  //https://www.avito.ru/pro/performance?vasFrom=avito_osp_applied
            // promo2(settings);
        }
    }
    if (message.action === "mapCreated" || message.action === "promo2Complete") {
        // window.location.href = `https://www.avito.ru/cpxpromo/${message.nextId}?vasFrom=avito_osp_applied`;
        // promo1(settings);
    }
    if (message.action === "promo1Complete") {
        // promo2(settings);
    }
    /*         if (message.action === "promo2Complete") {
                search();
            } */
});

