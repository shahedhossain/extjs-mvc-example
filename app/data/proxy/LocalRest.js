Ext.define('Books.data.proxy.LocalRest', {
    extend: 'Ext.data.proxy.Ajax',
    alias : 'proxy.localrest',
    
    buildUrl: function(request) {
        var me        = this,
            operation = request.operation,
            records   = operation.records || [],
            record    = records[0],
            format    = me.format,
            url       = me.getUrl(request),
            id        = record ? record.getId() : operation.id;
            
        if (id !== undefined) {
            url += '/' + id + '.json';
        } else {
            url += '.json';
        }   
        
        request.url = url;
        
        return me.callParent(arguments);
    }
}, function() {
    Ext.apply(this.prototype, {
        /**
         * @property {Object} actionMethods
         * Mapping of action name to HTTP request method. These default to RESTful conventions for the 'create', 'read',
         * 'update' and 'destroy' actions (which map to 'POST', 'GET', 'PUT' and 'DELETE' respectively). This object
         * should not be changed except globally via {@link Ext#override Ext.override} - the {@link #getMethod} function
         * can be overridden instead.
         */
        actionMethods: {
            create : 'POST',
            read   : 'GET',
            update : 'PUT',
            destroy: 'DELETE'
        }
    });
});
