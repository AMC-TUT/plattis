
Crafty.c("Controls", {
    init: function() {
        this.requires('Twoway');
        this.enableControl();
    },
    
    Controls: function(speed, jump) {
        this.twoway(speed, jump);
        return this;
    }
});
