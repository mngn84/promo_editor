console.log('search.js loaded');
chrome.runtime.onMessage.addListener(message => {
    console.log('search Message received:', message);
    if (message.action === 'startSearch' || message.action === 'urlUpdated') {
        search(message.page);
    }
});

const search = async (page = 1) => {
    console.log('start search');
    const progressMap = new Map();
    const pages = document.querySelectorAll('[data-marker^="page"]');
    const lastPage = pages[pages.length - 1];
    const totalPages = lastPage.getAttribute('data-marker').match(/\d+/)[0];
    
console.log('page', page);
    console.log('totalPages', totalPages);


    const itemIds = [...document.querySelectorAll('[role-marker="offer"]')]
        .map(item => item.querySelector('[data-marker^="select-offer"]')
            .getAttribute('data-marker').match(/\d+/)[0]);


    itemIds.forEach(id => progressMap.set(id, false));

    if (page === 1) firstId = itemIds[0][0];

    const url = location.href;
    if (page < totalPages && url.includes("pageFrom") && url.includes("pageTo") && totalPages > 1) {
        const newUrl = url.replace(/pageFrom=\d+&pageTo=\d+/, `pageFrom=${++page}&pageTo=${page}`);
        chrome.runtime.sendMessage({
            action: "updateUrl",
            url: newUrl,
            page: ++page,
            firstId
        });
    }

    console.log('progressMap', progressMap);
    chrome.storage.local.set({ promoProgress: progressMap });
    chrome.runtime.sendMessage({ action: "mapCreated", nextId: firstId });

}