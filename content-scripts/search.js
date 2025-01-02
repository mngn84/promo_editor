export default async () => {
    const progressMap = new Map();
    const pages = document.querySelectorAll('[data-marker^="page"]');
    const lastPage = pages[pages.length - 1];
    const totalPages = lastPage.getAttribute('data-marker').match(/\d+/)[0];
    let firstId;

    for (let page = 1; page <= totalPages; page++) {
        const itemIds = await chrome.scripting.executeScript({
            code: `[...document.querySelectorAll('[role-marker="offer"]')]
        .map(item => item.querySelector('[data-marker^="select-offer"]')
        .getAttribute('data-marker').match(/\d+/)[0])`
        });

        itemIds[0].forEach(id => progressMap.set(id, false));

        if(page === 1) firstId = itemIds[0][0];

        if (page < totalPages) {
            await chrome.tabs.update({
                url: window.location.href.replace(/pageFrom=\d+&pageTo=\d+/, `pageFrom=${page + 1}&pageTo=${page + 1}`)
            });
        }
    }

    chrome.storage.local.set({ promoProgress: progressMap });
    chrome.runtime.sendMessage({ action: "mapCreated", nextId: firstId });  
}
/* const result = await chrome.storage.local.get('promoProgress');
let progressMap;

if (!result.promoProgress) {
    const itemIds = [...document.querySelectorAll('[role-marker="offer"]')]
        .map(item => item.querySelector('[data-marker^="select-offer"]')
        .getAttribute('data-marker').match(/\d+/)[0]);

    progressMap = new Map();
    itemIds.forEach(id => progressMap.set(id, false));

    chrome.storage.local.set({ promoProgress: progressMap });
} else {
    progressMap = result.promoProgress;
}

for (const [id] of [...progressMap].filter(([, processed]) => !processed)) {
    window.location.href = `https://www.avito.ru/profile/pro/items?filters={"tabs":"active","search":"${id}"}&pageFrom=1&pageTo=1`;
    chrome.runtime.sendMessage({ action: "startPromo" });
}
 */
