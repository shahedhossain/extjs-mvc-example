/**
 * Abstract subclass of Ext.app.Application that sets up a Router and History
 */
Ext.define('Util.AbstractApplication', {
    extend: 'Ext.app.Application',
    
    router: Ext.create('Util.Router'),
    
    /**
     * @cfg {String} defaultHistoryToken history token to use if there isn't none.
     */
    defaultHistoryToken: undefined,
    
    launch: function() {
        var me = this;
        me.initRoutes(me.router);
        me.initHistory();
        
    },
    
    /**
     * Template function for connecting routes
     * @param router
     */
    initRoutes: function(router) {
        
    },
    
    initHistory: function() {
        var me = this;
        Ext.History.init(function() {
            var token = Ext.History.getToken();
            if (!token) {
                Ext.util.History.add(me.defaultHistoryToken);
            } else {
                this.historyChange(token);
            }
        }, me);
        
        // set listener to change event of history token
        Ext.util.History.on('change', this.historyChange, this);
    },
    
    historyChange: function(token) {
        var me = this;
        if(token) {
            var route = me.router.recognize(token);
            this.dispatch(route);
        }
    },
    
    dispatch: function(config) {
        // get the specific controller
        var controller = this.getController(Ext.String.capitalize(config.controller));
        // call the action
        controller[config.action](config);
    }
});