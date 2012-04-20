/**
 * The store used for books
 */
Ext.define('Books.store.Books', {
    extend: 'Ext.data.Store',
    model: 'Books.model.Book',
    
    autoLoad: true
});