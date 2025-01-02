console.log('SV loaded');
// chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
//     if (changeInfo.status === 'complete') {
//         chrome.tabs.sendMessage(tabId, { action: 'DOMContentLoaded' });
//     }
//     console.log('SV DOMContentLoaded');
// })



let firstId;

chrome.runtime.onMessage.addListener(async message => {
    console.log('SV Message received:', message);
    const result = await chrome.storage.local.get(['promoEditorSettings', 'promoProgress']);
    const { settings, progressMap } = result;

    if (message.action === "startPromo") {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        const currentTab = tabs[0];
        // console.log('currentTab', currentTab);
        await chrome.tabs.reload(currentTab.id);

        const progressMap = new Map(Object.entries(result.promoProgress || {}));
        const unprocessed = [...progressMap].filter(([, processed]) => !processed);

        if (unprocessed.length) {
            console.log('unprocessed length', unprocessed.length);
            console.log('unprocessed', unprocessed);
            chrome.tabs.update({
                url: `https://www.avito.ru/cpxpromo/${unprocessed[0]}?vasFrom=avito_osp_applied`
            });
            // waitForComplete(currentTab.id, "startPromo1", settings);
        }

        if (currentTab.url.includes("items")) {   //https://www.avito.ru/profile/pro/items....
            console.log('sending msg to', currentTab.id);
            waitForComplete(currentTab.id, "startSearch");
            // const result = await chrome.storage.local.get(['promoEditorSettings', 'promoProgress']);
            // console.log('result', progressMap);
        }
        // if (window.location.href.includes("cpxpromo")) {  //https://www.avito.ru/cpxpromo/4441912585?vasFrom=avito_osp_applied
        //     // waitForComplete(currentTab.id, "startPromo1", settings);
        // }
        // if (window.location.href.includes("performance")) {  //https://www.avito.ru/pro/performance?vasFrom=avito_osp_applied
        //     // promo2(settings);
        // }
    }
    if (message.action === 'updateUrl') {
        if (message.firstId) firstId = message.firstId;
console.log('message.firstId', message.firstId);
        await chrome.tabs.update({ url: message.url });
        соnsole.log('Щедёт обновление страницы');
        waitForComplete(currentTab.id, "urlUpdated", message.page);
    }
    if (message.action === "mapCreated" || message.action === "promo2Complete") {
        window.location.href = ({
            url: `https://www.avito.ru/cpxpromo/${message.nextId}?vasFrom=avito_osp_applied`
        });
        promo1(settings);
    }
    if (message.action === "promo1Complete") {
        promo2(settings);
    }
    /*         if (message.action === "promo2Complete") {
        search();
        } */
    // chrome.tabs.onUpdated.removeListener(listener);
});

const waitForComplete = (tabId, message, data = null) => {
    const listener = (tabId, changeInfo,) => {
        if (changeInfo.status === 'complete') {
            chrome.tabs.sendMessage(tabId, {
                action: message,
                data
            });
            chrome.tabs.onUpdated.removeListener(listener);
        }
    };
    chrome.tabs.onUpdated.addListener(listener);
};
