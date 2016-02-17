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
            week: 'week',
            time_interval: 'hour_1',
            closeButton: true,
            time_range: '0,24'
        };

        // Create options by extending defaults with the passed in arguments
        this.options = extendDefaults(defaults, arguments[0]);
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
    var wk_dragging = false;
    var wk_dragging_state;

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
            parent_div.appendChild(this.weekli);
        } else{
            console.error('ELEMENT_ID: ' + this.options.element_id + ' not found');
        }

    }

    //HANDLE clicking on cell
    function mouse_down_cell(){
        var attribute = this.getAttribute('wk');
        if(this.classList.contains('available')){
            wk_dragging_state = 'available';
        } else{
            wk_dragging_state = 'unavailable';
        }

        change_state(this);
    }

    //HANDLE mousing over cell
    function mouse_hover_cell(){
        var attribute = this.getAttribute('wk');
        var cell_state;

        //GET the current state (available or unavailable) of the current cell
        if(this.classList.contains('available')){
            cell_state = 'available';
        } else{
            cell_state = 'unavailable';
        }

        //IF currently dragging and toggling the current type of state -> change state
        //Example: if user is dragging to change available -> unavailable, prevent
        //cells to go unavailable -> available
        if(wk_dragging && cell_state === wk_dragging_state){
            change_state(this);
        }
    }

    //alternate element from available -> unavailable or unavailable -> available
    function change_state(element){
        if(element.classList.contains('available')){
            element.classList.remove('available');
        } else{
            element.classList.add('available');
        }
    }


    //IF the user drags on the table, set dragging to true
    //deselect any text (prevents unsightly 'ghosting' movement)
    function table_mousedown(){
        wk_dragging = true;
        document.getSelection().removeAllRanges();
        return false;
    }

    //IF the user releases the mouse anywhere, turn of dragging
    document.onmouseup = function() {
        wk_dragging = false;
    };

    /////////////////////////////
    // Set events
    /////////////////////////////
    function initializeEvents() {
        if (this.closeButton) {
            this.closeButton.addEventListener('click', this.alert.bind(this));
        }

        //GET dom elements
        var wk_cell = document.getElementsByClassName('wk-cell');
        var table   = document.getElementsByClassName('weekli');


        //ADD event listener to table cells
        for (var i = 0; i < wk_cell.length; i++) {
            wk_cell[i].addEventListener('mousedown', mouse_down_cell, false);
            wk_cell[i].addEventListener('mouseover', mouse_hover_cell, false);
        }

        //ADD event listener to table for dragging functionality
        for (var j = 0; j < table.length; j++) {
            table[j].addEventListener('mousedown',table_mousedown, false);
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
        var weekli_html = '';
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