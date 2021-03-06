(function () {
    chrome.devtools.network.onRequestFinished.addListener(function (request) {
        if (typeof window.Message === 'undefined') return; // Required for anything

        if (request.request.url.indexOf('.css') !== -1 && request.request.url.indexOf('/css/common/index.css') === -1) {
            Message.Post({pageLoad: true});
        }
        if (request.request.url.indexOf('http://gbf.game.mbga.jp/') !== -1 || request.request.url.indexOf('http://game.granbluefantasy.jp/') !== -1) {
            request.getContent(function (responseBody) {
                if (request.request.postData !== undefined) {
                    try {
                        Message.Post({
                            'request': {
                                url: request.request.url,
                                response: JSON.parse(responseBody),
                                payload: JSON.parse(request.request.postData.text)
                            }
                        });
                    } catch (ignored) {}
                } else {
                    try {
                        Message.Post({
                            'request': {
                                url: request.request.url,
                                response: JSON.parse(responseBody),
                                payload: undefined
                            }
                        });
                    } catch (ignored) {}
                }
            });
        }
    });
})();