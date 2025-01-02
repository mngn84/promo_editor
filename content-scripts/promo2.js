const promo2 = async settings => {
    const isColorSwitch = document.querySelector('[data-marker="vas-configurator/widget/simple/switcher"]');
    const isXLSwitch = document.querySelector('[data-marker="vas-configurator/widget/xl/switcher"]');
    
    const result = await chrome.storage.local.get('promoProgress');
    const unprocessed = [...result.promoProgress].filter(([, processed]) => !processed);

    setTimeout(() => {
        isColorSwitch.checked = settings.isColor || false;
    }, getDelay());
    setTimeout(() => {
        isXLSwitch.checked = settings.isXL || false;
    }, getDelay());

    setTimeout(() => {
        if (unprocessed.length === 1) {
            const button = document.querySelector('[data-marker^="vas-configurator/pay-button"]');//проверить возможные кнопки
            chrome.storage.local.remove('promoProgress');
            chrome.runtime.sendMessage({ action: "endPromo" });
            button.click();
        } else {
            result.promoProgress.set(unprocessed[0], true);
            chrome.storage.local.set({promoProgress: result.promoProgress});
            chrome.runtime.sendMessage({ action: "promo2Complete", nextId: unprocessed[1] });
        }
    }, getDelay());
}