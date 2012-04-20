Ext.define('Books.ConnectionLocalAjaxOverride', {
    override: 'Ext.data.Connection',
    parseStatus: function(status) {
        if (status == 0) {
            status = 200;
        }
        return this.callParent([status]);
    }
});

