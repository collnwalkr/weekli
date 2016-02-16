/**
 * Created by Collin Walker
 */

(function() {

    /////////////////////////////
    // Constructor
    /////////////////////////////
    this.Weekli = function() {

        // Global element references
        this.output = 'output';

        // Option defaults
        var defaults = {
            element_id: 'weekli',
            week: '7 day',
            time_interval: 'hour_1',
            closeButton: true,
            time_range: '0,24'
        };

        // Create options by extending defaults with the passed in arguments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }
    };

    /////////////////////////////
    // Public Methods
    /////////////////////////////
    Weekli.prototype.build = function() {
        buildOut.call(this);
        initializeEvents.call(this);
    };

    Weekli.prototype.alert = function(){
        console.log(this.options.element_id + ' ' + this.output);
    };

    Weekli.prototype.get_output = function(){
        return this.output;
    };


    /////////////////////////////
    // Private Methods
    /////////////////////////////
    function buildOut() {
        var parent_div  = document.getElementById(this.options.element_id);
        this.weekli  = document.createElement('div');
        this.weekli.innerHTML = buildHTML(this);

        // if closeButton option is true, add a close button
        if (this.options.closeButton === true) {
            this.closeButton = document.createElement('button');
            this.closeButton.innerHTML = '×';
            this.weekli.appendChild(this.closeButton);
        }

        if(parent_div){
            parent_div.appendChild(this.weekli)
        } else{
            console.error('ELEMENT_ID: ' + this.options.element_id + ' not found');
        }


    }

    /////////////////////////////
    // Set events
    /////////////////////////////
    function initializeEvents() {
        if (this.closeButton) {
            this.closeButton.addEventListener('click', this.alert.bind(this));
        }

    }

    /////////////////////////////
    // Get Custom Options
    /////////////////////////////
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    /////////////////////////////
    // Weekli HTML structure
    /////////////////////////////
    function buildHTML(weekli){
        var weekli_html = 'hello world';
        var week_type = weekli.options.week;

        switch(week_type){
            case 'workweek':
                weekli_html = '5';
                break;

            case 'weekend':
                weekli_html = '2';
                break;

            default:
                weekli_html = '7';
        }


        return weekli_html;
    }


}());