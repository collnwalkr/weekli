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
            minute_interval: '60',
            time_range: '7,17',
            editable: true,
            time_format: '12hour'
        };

        // Create options by extending defaults with the passed in arguments
        this.options = extendDefaults(defaults, arguments[0]);
    };

    /////////////////////////////
    // Public Methods
    /////////////////////////////
    Weekli.prototype.build = function() {

        //IF the build is successful
        if(buildOut.call(this)){

            //IF weekli is editable, add events
            //ELSE remove events
            if(this.options.editable){
                addEvents.call(this);
            } else{
                removeEvents.call(this);
            }
        }
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

    Weekli.prototype.make_uneditable = function(){
        removeEvents.call(this);
    };

    Weekli.prototype.make_editable = function(){
        addEvents.call(this);
    };

    Weekli.prototype.load_data = function(data){
        loadData(data, this);
    };

    Weekli.prototype.all_available = function(){
        changeAll('available', this);
    };

    Weekli.prototype.all_unavailable = function(){
        changeAll('unavailable', this);
    };

    /////////////////////////////
    // Private Methods
    /////////////////////////////
    var wk_dragging = false;
    var wk_dragging_state;

    function buildOut() {
        //GET parent div
        var parent_div  = document.getElementById(this.options.wk_id);
        this.weekli     = document.createElement('div');


        if(parent_div){
            //SCAFFOLD out the html
            var html = buildHTML(this);
            this.weekli.appendChild(html.desktop);
            this.weekli.appendChild(html.mobile);

            parent_div.appendChild(this.weekli);

            return true;
        } else{
            console.error('wk_id: ' + this.options.wk_id + ' element not found');

            return false;
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
    function addEvents() {

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

        //GIVE weekli divs editable class
        var weekli_div = document.getElementById(wk_id).getElementsByClassName('weekli');
        for(var n = 0; n < weekli_div.length; n++){ 
            weekli_div[n].classList.remove('weekli_uneditable');
            weekli_div[n].classList.add('weekli_editable');
        }

    }

    /////////////////////////////
    // Set events
    /////////////////////////////
    function removeEvents() {

        //GET dom elements
        var wk_id         = this.options.wk_id;
        var wk_cell       = document.getElementById(wk_id).getElementsByClassName('wk-cell');
        var table         = document.getElementById(wk_id).getElementsByClassName('weekli');
        var time_row      = document.getElementById(wk_id).getElementsByClassName('wk-time');
        var day_column    = document.getElementById(wk_id).getElementsByClassName('wk-day');


        //REMOVE event listener to table cells
        for (var i = 0; i < wk_cell.length; i++) {
            wk_cell[i].removeEventListener('mousedown', mouse_down_cell, false);
            wk_cell[i].removeEventListener('mouseover', mouse_hover_cell, false);
            wk_cell[i].wk_id = wk_id;
        }

        //REMOVE event listener to table for dragging functionality
        for (var j = 0; j < table.length; j++) {
            table[j].removeEventListener('mousedown',table_mousedown, false);
        }

        //REMOVE event listener to time column to toggle row on click
        for (var k = 0; k < time_row.length; k++) {
            time_row[k].removeEventListener('mousedown',time_row_mousedown, false);
            time_row[k].wk_id = wk_id;
        }

        //REMOVE event listener to time column to toggle row on click
        for (var l = 0; l < day_column.length; l++) {
            day_column[l].removeEventListener('mousedown',day_column_mousedown, false);

            //ADD event listener to span children
            for(var m = 0; m < day_column[l].childNodes.length; m++){
                day_column[l].childNodes[m].removeEventListener('mousedown',day_column_mousedown, false);
                day_column[l].childNodes[m].wk_id = wk_id;
            }
            day_column[l].wk_id = wk_id;
        }

        //GIVE weekli divs uneditable class
        var weekli_div = document.getElementById(wk_id).getElementsByClassName('weekli');
        for(var n = 0; n < weekli_div.length; n++){
            weekli_div[n].classList.remove('weekli_editable');
            weekli_div[n].classList.add('weekli_uneditable');
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
        var minute_interval = weekli.options.minute_interval;
        var time_format     = weekli.options.time_format;
        var custom_days     = weekli.options.week_days;

        var weekli_days     = get_days_array(week_type, custom_days);
        var weekli_hours    = get_hour_array(time_range, minute_interval, time_format);

        var desktop_html = buildHTMLdesktop(weekli_days, weekli_hours);
        var mobile_html  = buildHTMLmobile(weekli_days, weekli_hours);

        return {'desktop': desktop_html, 'mobile': mobile_html};
    }

    /////////////////////////////
    // returns table for desktop
    /////////////////////////////
    function buildHTMLdesktop(weekli_days, weekli_hours){
        var table = document.createElement('table');
        table.className = 'weekli weekli_desktop';

        //CREATE thead and add column
        var thead   = document.createElement('thead');
        var th      = document.createElement('th');
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
            th.className = 'wk-day wk-header';

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

        //CREATE tbody
        var tbody   = document.createElement('tbody');
        var td;
        var tr;
        var day_attr;
        var hour_attr;
        //ADD hour rows to tbody
        for(var k = 0; k < weekli_hours.length - 1; k++){
            //CREATE the hour attribute using the current time and next time
            hour_attr = weekli_hours[k] + '-' + weekli_hours[k+1];
            //start time row cell
            td = document.createElement('td');
            tr = document.createElement('tr');
            td.setAttribute('data-wk-time-row', hour_attr);
            td.innerHTML = weekli_hours[k] + '-' + weekli_hours[k+1];
            td.className = 'wk-time wk-header';
            tr.appendChild(td);
            //end time row cell

            for(var j = 0; j < weekli_days.length; j++){
                //CREATE the day attribute using first 3 chars of day name
                day_attr = weekli_days[j].substr(0,3).toUpperCase();
                //start table cell
                td = document.createElement('td');
                td.setAttribute('data-wk-hr', hour_attr);
                td.setAttribute('data-wk-day', day_attr);
                td.className = 'wk-cell';
                tr.appendChild(td);
                //end table cell
            }

            //add row to tbody
            tbody.appendChild(tr);
        }

        //PUT thead in table
        table.appendChild(thead);
        table.appendChild(tbody);

        return table;
    }

    /////////////////////////////
    // returns table for mobile
    /////////////////////////////
    function buildHTMLmobile(weekli_days, weekli_hours){
        //CREATE table and tbody
        var table   = document.createElement('table');
        var tbody   = document.createElement('tbody');
        var td;
        var tr;
        var th;
        var day_attr;
        var hour_attr;

        table.className = 'weekli weekli_mobile';

        //ADD day rows
        for(var i = 0; i < weekli_days.length; i++) {
            //CREATE day attribute using first 3 chars of day name
            day_attr = weekli_days[i].substr(0, 3).toUpperCase();

            //start day header row
            tr = document.createElement('tr');
            th = document.createElement('th');
            th.setAttribute('data-wk-day-col', day_attr);
            th.className = 'wk-day wk-header';
            th.colSpan = 2;
            th.innerHTML = weekli_days[i];
            tr.appendChild(th);
            //end day header row

            //attach day header row to body
            tbody.appendChild(tr);


            //ADD hour rows
            for (var k = 0; k < weekli_hours.length - 1; k++) {
                //CREATE the hour attribute using the current time and next time
                hour_attr = weekli_hours[k] + '-' + weekli_hours[k+1];
                //start time cell
                tr = document.createElement('tr');
                td = document.createElement('td');
                td.className = 'wk-time wk-header';
                td.innerHTML = hour_attr;
                //end time cell

                //attach time cell to row
                tr.appendChild(td);

                //start table cell
                td = document.createElement('td');
                td.setAttribute('data-wk-hr',  hour_attr);
                td.setAttribute('data-wk-day', day_attr);
                td.className = 'wk-cell';
                //end table cell

                //attach cell to row
                tr.appendChild(td);

                //attach row to tbody
                tbody.appendChild(tr);
            }
        }

        //PUT thead in table
        table.appendChild(tbody);

        return table;
    }

    /////////////////////////////
    // returns an array of days
    // based of week type option
    /////////////////////////////
    function get_days_array(week_type, custom_days){
        var weekli_days = [];
        switch(week_type){
            case 'workweek':
                weekli_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
                break;

            case 'weekend':
                weekli_days = ['Saturday', 'Sunday'];
                break;

            case 'custom':
                weekli_days = custom_days;
                break;

            default:
                weekli_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        }
        return weekli_days;
    }

    /////////////////////////////
    // returns an array of hours
    // based off time range,
    // intervals, and format
    /////////////////////////////
    function get_hour_array(time_range, minute_interval, time_format){
        var weekli_hours = [];

        //CALCULATE the interval between times when creating array
        var hour_interval       = Math.floor(minute_interval / 60);
        var minutes_interval    = minute_interval - hour_interval * 60;

        //CALCULATE and push times into weekli_hours array
        var start_stop   = time_range.split(',');
        var start_time   = parseFloat(start_stop[0]);
        var stop_time    = parseFloat(start_stop[1]);
        var current_time = start_time;
        var current_hour    = Math.floor(current_time);
        var current_minute  = Math.floor((current_time % 1) * 100);
        var print_hour;
        var print_minute;

        //KEEP adding times into array and incrementing by intervals
        while(current_time < stop_time){

            //IF minute is less than 10, put a 0 in front
            if(current_minute < 10){
                print_minute = '0' + current_minute;
            } else{
                print_minute = current_minute;
            }

            //IF 12 hour format, put hours in that format
            if(time_format === '12hour' && current_hour > 12){
                print_hour = current_hour - 12;
            } else{
                print_hour = current_hour;
            }

            //PUSH the pretty print version of the calculated time
            weekli_hours.push(print_hour + ':' + print_minute);

            //ADD the minutes interval
            current_minute += minutes_interval;

            //IF this new time is more then an hour, increase hour
            //and decrease minutes by 60
            if(current_minute >= 60){
                current_minute -= 60;
                current_hour += 1;
            }

            //ADD the hour interval
            current_hour += hour_interval;

            //CALCULATE the new current time
            current_time = current_hour + (current_minute / 100);

        } //end while


        //ADD the stop time to the end of the array
            current_minute = Math.ceil((stop_time % 1) * 100);
            if(current_minute < 10){
                print_minute = '0' + current_minute;
            } else{
                print_minute = current_minute;
            }

            current_hour = Math.floor(stop_time);
            if(time_format === '12hour' && current_hour > 12){
                print_hour = current_hour - 12;
            } else{
                print_hour = current_hour;
            }
            weekli_hours.push(print_hour + ':' + print_minute);
        //end add stop time

        return weekli_hours;
    }

    /////////////////////////////
    // takes JSON object and
    // updates table accordingly
    /////////////////////////////
    function loadData(data, weekli){

        //CLEAR table
        changeAll('unavailable', weekli);

        //GET the div
        var wk_id = weekli.options.wk_id;
        
        // loop over each object
        for(var i = 0; i < data.available.length; i++) {
            var obj = data.available[i];
            //extract time and day data attribute
            var time_attr = obj.time;
            var day_attr  = obj.day;

            //find all cells that match those attributes in the div
            var cell_match = document.getElementById(wk_id).querySelectorAll("[data-wk-hr= '" + time_attr + "'][data-wk-day= '" + day_attr + "']");

            //change those states to available
            for (var j = 0; j < cell_match.length; j++) {
                change_state(cell_match[j], 'available');
            }

        }
    }

    /////////////////////////////
    // change all cells to certain
    // value
    /////////////////////////////
    function changeAll(newvalue,weekli){
        //GET the div
        var wk_id = weekli.options.wk_id;

        //find all cells that match those attributes in the div
        var cell_match = document.getElementById(wk_id).getElementsByClassName('wk-cell');

        //change those states to available
        for (var j = 0; j < cell_match.length; j++) {
            change_state(cell_match[j], newvalue);
        }
    }

}());