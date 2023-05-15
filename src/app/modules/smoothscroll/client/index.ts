if (!("scrollBehavior" in document.documentElement.style)) {
    import('./polyfill').then((m) => {
        const { polyfill } = m;
        if (polyfill) {
            polyfill();
        }
    }).catch((e) => {
        console.log(e);
    });
}