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
            time_interval: '60',
            time_range: '7,17',
            time_format: '12'
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
        var html = buildHTML(this);
        this.weekli.appendChild(html);
        console.log(html);


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
        var week_type       = weekli.options.week;
        var time_range      = weekli.options.time_range;
        var time_interval   = weekli.options.time_interval;
        var time_format     = weekli.options.time_format;
        var weekli_days     = get_days_array(week_type);
        var weekli_hours    = get_hour_array(time_range, time_interval, time_format);

        var desktop_html = buildHTMLdesktop(weekli_days, time_range, time_interval, time_format);
        var weekli_html = desktop_html;


        return weekli_html;
    }

    function buildHTMLdesktop(weekli_days, time_range, time_interval, time_format){
        var table = document.createElement('table');
        table.className = 'weekli weekli_desktop';

        //CREATE thead and add column
        var thead = document.createElement('thead');
        var th = document.createElement('th');
        var tbody = document.createElement('tbody');
        var span_long;
        var span_abbrv;
        var day_abbrv = '';
        var day_long  = '';

        //ADD blank cell column (empty one in top left)
        th.className = 'wk-day';
        thead.appendChild(th);

        //ADD day columns
        for(var i = 0; i < weekli_days.length; i++){
            day_long = weekli_days[i];

            th = document.createElement('th');
            th.className = 'wk-day wk-column';

            //GET week abbreviation
            day_abbrv = day_long.substr(0,3);

            //SET week day column attribute to week day abbreviated
            th.setAttribute('data-wk-day-col', day_abbrv.toUpperCase());

            //CREATE span of abbreviated and long form week day names
            span_abbrv = document.createElement('span');
            span_abbrv.className = 'wk-day-abbrv';
            span_abbrv.innerHTML = day_abbrv;
            span_long = document.createElement('span');
            span_long.className = 'wk-day-long';
            span_long.innerHTML = day_long;

            //PUT spans in th
            th.appendChild(span_abbrv);
            th.appendChild(span_long);

            //PUT th in thead
            thead.appendChild(th);
        }



        //PUT thead in table
        table.appendChild(thead);

        return table;
    }

    //RETURN an array of days based of week type option
    function get_days_array(week_type){
        var weekli_days = [];
        switch(week_type){
            case 'workweek':
                weekli_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
                break;

            case 'weekend':
                weekli_days = ['Saturday', 'Sunday'];
                break;

            default:
                weekli_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        }
        return weekli_days;
    }

    //RETURN an array of hours based off time range, intervals, and format
    function get_hour_array(time_range, time_interval, time_format){
        var weekli_hours = [];

        //CALCULATE the interval between times when creating array
        var hour_interval       = Math.floor(time_interval / 60);
        var minutes_interval    = time_interval - hour_interval * 60;
        var minutes_fraction    = 60 / minutes_interval;
        minutes_fraction        = 1 / minutes_fraction;
        time_interval           = hour_interval + minutes_fraction;

        console.log(time_interval);
        time_interval           = (Math.round(time_interval*1000)/1000);

        console.log(time_interval);


        //CALCULATE and push times into weekli_hours array
        var start_stop   = time_range.split(',');
        var start        = parseInt(start_stop[0]);
        var stop         = parseInt(start_stop[1]);
        var minute;
        var hour;
        var i = start;
        var pretty_time;
        while(i < stop){

            hour   = Math.floor(i);

            minute = Math.ceil((i % 1) * 60);
            console.log(minute);
            if(minute >= 60){ minute -= 60; hour += 1; }
            if(minute < 10){ minute = '0' + minute; }
            pretty_time = hour + ':' + minute;

            weekli_hours.push(pretty_time);

            console.log(i);
            i += time_interval;
        } //end while



        console.log(weekli_hours);

        return weekli_hours;
    }

}());