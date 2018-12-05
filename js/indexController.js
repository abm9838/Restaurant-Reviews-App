if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('sw.js').catch(err => {
      console.log('Service Worker: Error');
    });
}


//based on online help
    