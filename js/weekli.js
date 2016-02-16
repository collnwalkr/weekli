/**
 * Created by Collin Walker
 */

(function() {

    // Define our constructor
    this.Weekli = function() {

        // Create global element references
        //this.overlay = null;

        // Define option defaults
        var defaults = {
            week: '7-day',
            time_interval: 'hour_1',
            time_range: '0,24'
        };

        // Create options by extending defaults with the passed in arguments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

    };

    Weekli.prototype.build = function() {
        buildOut.call(this);
        initializeEvents.call(this);
    };

    function buildOut() {
        console.log(this.options.time_range);
    }

    function initializeEvents() {
        //if (this.closeButton) {
        //    this.closeButton.addEventListener('click', this.close.bind(this));
        //}

    }

    // Utility method to extend defaults with user options
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

}());