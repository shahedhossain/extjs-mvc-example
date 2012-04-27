booksApp = Ext.create('Util.AbstractApplication', {
    
    name: 'Books',
    
    controllers: ['Books'],
    
    autoCreateViewport: true,
    
    defaultHistoryToken: 'Books',
    
    initRoutes: function(router) {
        router.name('booksView', 'Books/:id', {controller: 'Books', action: 'view'});
        router.name('booksIndex', 'Books', {controller: 'Books', action: 'index'});
    }
    
});