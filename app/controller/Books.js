/**
 * Books controller
 * Used to manage books; showing the first book, showing a spefied book, loading books, and showing their
 * related views
 */
Ext.define('Books.controller.Books', {
    extend: 'Ext.app.Controller',
    
    models: ['Book'],
    stores: ['Books', 'Reviews'],
    
    refs: [
        {ref: 'bookSideBar', selector: 'booksidebar'},
        {ref: 'bookView',    selector: 'bookview'},
        {ref: 'reviewList',  selector: 'reviewlist'}
    ],
    
    init: function() {
        var me = this;
        
        me.control({
            'booksidebar': {
                selectionchange: me.onSideBarSelectionChange
            }
        });
    },
    
    onLaunch: function() {
        this.getBookSideBar().bindStore(this.getBooksStore());
    },
    
    onSideBarSelectionChange: function(view, records) {
        if (records.length) {
            var url = booksApp.router.generate('booksView', {controller: 'Books', action: 'view', id: records[0].get('id')});
            Ext.util.History.add(url);
        }
    },
    
    /**
     * index action. This demo doesn't have an index view, so just select first record
     * @param config Route config
     */
    index: function(config) {
        var me = this, 
            store = me.getBookSideBar().getStore();
        
        if (store.isLoading()) {
            store.on('load', function(){
                me.getBookSideBar().getSelectionModel().select(0);
            }, me, {single: true});
        } else {
            me.getBookSideBar().getSelectionModel().select(0);
        }
        
    },
    
    /**
     * Shows a specified record by binding it to
     * @param config Route config
     */
    view: function(config) {
        var me = this, id = config.id;
        
        me.getBookView().setLoading(true);
        me.getReviewList().setLoading(true);
        Ext.ModelManager.getModel('Books.model.Book').load(id, {
            success: function(record, operation) {
                //DEBUG pretend to take longer to show load mask
                Ext.defer(function(){
                    me.getBookSideBar().getSelectionModel().select(record, false, true);
                    me.getBookView().bind(record);
                    me.getReviewList().bind(record, me.getReviewsStore());
                    me.getBookView().setLoading(false);
                    me.getReviewList().setLoading(false);
                }, 500);
            },
            failure: function() {
                Ext.MessageBox.alert('Request Failed', 'Failed to load Book');
                me.getBookView().setLoading(false);
                me.getReviewList().setLoading(false);
            },
            scope: me
        });
    }
});