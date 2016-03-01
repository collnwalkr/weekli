/**
 * Created by Collin Walker
 */

(function() {

    /////////////////////////////
    // Constructor
    /////////////////////////////
    this.Weekli = function() {

        // Option defaults
        var defaults = {
            wk_id: 'weekli',
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


    Weekli.prototype.get_output = function(){
        //GET div id containing weekli
        var wk_id = this.options.wk_id;
        //GET the cells, but only the desktop version (remains synced with mobile)
        var wk_cell = document.getElementById(wk_id).getElementsByClassName('weekli_desktop')[0].getElementsByClassName('wk-cell');

        var output = {available: [], unavailable: []};
        var cell_day  = '';
        var cell_time = '';
        var cell_available = true;
        var cell_tuple = {};

        //PUSH cells into output based of availability
        for(var i = 0; i < wk_cell.length; i++){
            cell_day  = wk_cell[i].getAttribute('data-wk-day');
            cell_time = wk_cell[i].getAttribute('data-wk-hr');
            //create object containing day and time
            cell_tuple = {day: cell_day, time: cell_time};
            cell_available = wk_cell[i].classList.contains('available');

            //IF cell is available, push into available object
            //ELSE put in unavailable object
            if(cell_available){
                output.available.push(cell_tuple);
            }
            else{
                output.unavailable.push(cell_tuple);
            }
        } //end for

        return output;
    };


    /////////////////////////////
    // Private Methods
    /////////////////////////////
    var wk_dragging = false;
    var wk_dragging_state;

    function buildOut() {
        var parent_div  = document.getElementById(this.options.wk_id);
        this.weekli  = document.createElement('div');
        //this.weekli.innerHTML = buildHTML(this);


        if(parent_div){
            parent_div.appendChild(this.weekli);
        } else{
            console.error('wk_id: ' + this.options.wk_id + ' not found');
        }

    }

    //HANDLE clicking on cell
    function mouse_down_cell(evt){
        var attribute = this.getAttribute('data-wk-val');
        var time_attr = this.getAttribute('data-wk-hr');
        var day_attr = this.getAttribute('data-wk-day');
        var wk_id = evt.target.wk_id;

        if(this.classList.contains('available')){
            wk_dragging_state = 'available';
        } else{
            wk_dragging_state = 'unavailable';
        }

        //GET the other cell that match current selection
        //this is used to sync mobile and desktop tables
        var cell_match = document.getElementById(wk_id).querySelectorAll("[data-wk-hr= '" + time_attr + "'][data-wk-day= '" + day_attr + "']");

        for (var i = 0; i < cell_match.length; i++) {
            toggle_state(cell_match[i]);
        }
    }

    //HANDLE mousing over cell
    function mouse_hover_cell(evt){
        var attribute = this.getAttribute('data-wk-val');
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


            var time_attr = this.getAttribute('data-wk-hr');
            var day_attr  = this.getAttribute('data-wk-day');
            var wk_id = evt.target.wk_id;


            var cell_match = document.getElementById(wk_id).querySelectorAll("[data-wk-hr= '" + time_attr + "'][data-wk-day= '" + day_attr + "']");
            for (var i = 0; i < cell_match.length; i++) {
                toggle_state(cell_match[i]);
            }

        }//end if
    }

    //alternate element from available -> unavailable or unavailable -> available
    function toggle_state(element){
        if(element.classList.contains('available')){
            element.classList.remove('available');
        } else{
            element.classList.add('available');
        }
    }

    //force element from to change state
    function change_state(element, state){
        if(state === 'available'){
            element.classList.add('available');
        } else{
            element.classList.remove('available');
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

    //HANDLE clicking on time row
    //IF the user clicks on a time row, toggle the entire row
    function time_row_mousedown(evt){
        var wk_id = evt.target.wk_id;
        var time_attr = this.getAttribute('data-wk-time-row');
        var time_cell_match = document.getElementById(wk_id).querySelectorAll("[data-wk-hr= '" + time_attr + "']");
        var all_available = true;

        //CHECK to see if the row contains any unavailable cells
        for (var i = 0; i < time_cell_match.length; i++) {
            if(time_cell_match[i].classList.contains('available')){
                all_available = true;
            } else{
                all_available = false;
                break;
            }
        }//end for

        //IF row contains a single unavailable, change
        //  all cells to available
        //Else, change all cells to unavailable
        for (var k = 0; k < time_cell_match.length; k++) {
            if(all_available){
                change_state(time_cell_match[k], 'unavailable');
            }
            else{
                change_state(time_cell_match[k], 'available');
            }
        }//end for

    }

    //HANDLE clicking on day column
    //IF the user clicks on a day column, toggle the entire column
    function day_column_mousedown(evt){
        var wk_id = evt.target.wk_id;
        var day_attr = this.getAttribute('data-wk-day-col');
        var day_cell_match = document.getElementById(wk_id).querySelectorAll("[data-wk-day= '" + day_attr + "']");
        var all_available = true;



        //CHECK to see if the column contains any unavailable cells
        for (var i = 0; i < day_cell_match.length; i++) {
            if(day_cell_match[i].classList.contains('available')){
                all_available = true;
            } else{
                all_available = false;
                break;
            }
        }//end for


        //IF column contains a single unavailable, change
        //  all cells to available
        //Else, change all cells to unavailable
        for (var k = 0; k < day_cell_match.length; k++) {
            if(all_available){
                change_state(day_cell_match[k], 'unavailable');
            }
            else{
                change_state(day_cell_match[k], 'available');
            }
        }//end for
    }

    /////////////////////////////
    // Set events
    /////////////////////////////
    function initializeEvents() {


        //GET dom elements
        var wk_id         = this.options.wk_id;
        var wk_cell       = document.getElementById(wk_id).getElementsByClassName('wk-cell');
        var table         = document.getElementById(wk_id).getElementsByClassName('weekli');
        var time_row      = document.getElementById(wk_id).getElementsByClassName('wk-time');
        var day_column    = document.getElementById(wk_id).getElementsByClassName('wk-day');


        //ADD event listener to table cells
        for (var i = 0; i < wk_cell.length; i++) {
            wk_cell[i].addEventListener('mousedown', mouse_down_cell, false);
            wk_cell[i].addEventListener('mouseover', mouse_hover_cell, false);
            wk_cell[i].wk_id = wk_id;
        }

        //ADD event listener to table for dragging functionality
        for (var j = 0; j < table.length; j++) {
            table[j].addEventListener('mousedown',table_mousedown, false);
        }

        //ADD event listener to time column to toggle row on click
        for (var k = 0; k < time_row.length; k++) {
            time_row[k].addEventListener('mousedown',time_row_mousedown, false);
            time_row[k].wk_id = wk_id;
        }

        //ADD event listener to time column to toggle row on click
        for (var l = 0; l < day_column.length; l++) {
            day_column[l].addEventListener('mousedown',day_column_mousedown, false);

            //ADD event listener to span children
            for(var m = 0; m < day_column[l].childNodes.length; m++){
                day_column[l].childNodes[m].addEventListener('mousedown',day_column_mousedown, false);
                day_column[l].childNodes[m].wk_id = wk_id;
            }
            day_column[l].wk_id = wk_id;
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