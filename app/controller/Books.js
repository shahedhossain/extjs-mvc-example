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
        
        me.getBooksStore().on({
            scope: me,
            load : me.onBooksStoreLoad
        });
    },
    
    onLaunch: function() {
        this.getBookSideBar().bindStore(this.getBooksStore());
    },
    
    onSideBarSelectionChange: function(view, records) {
        if (records.length) {
            this.showBook(records[0].get('id'));
        }
    },
    
    /**
     * Called when the books store is loaded.
     * Checks if there are any records, and if there are, it delegates to show the first record
     * as well as selecting that record in the sidebar
     */
    onBooksStoreLoad: function(store, records) {
        Ext.defer(function() {
            if (records && records.length) {
                var record = records[0],
                    me = this;
                
                me.getBookSideBar().getSelectionModel().select(record);
            }
        }, 500, this);
    },
    
    /**
     * Shows a specified record by binding it to
     */
    showBook: function(id) {
        var me = this;
        
        me.getBookView().setLoading(true);
        me.getReviewList().setLoading(true);
        Ext.ModelManager.getModel('Books.model.Book').load(id, {
            success: function(record, operation) {
                //DEBUG pretend to take longer to show load mask
                Ext.defer(function(){
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