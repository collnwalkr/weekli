/**
 * Created by Collin Walker
 */
//var weekli = new Weekli();

var weekli_id = new Weekli({
    wk_id: 'id',
    week: 'custom',
    week_days: ['Saturday', 'Tuesday', 'Friday'],
    time_interval: 20,
    time_range: '10.30,13.10'
});

var weekli_work = new Weekli({
    wk_id: 'work',
    week: 'workweek'
});

var dummydata = {"available":[{"day":"SAT","time":"10:50-11:10"},{"day":"FRI","time":"10:50-11:10"},{"day":"SAT","time":"11:50-12:10"},{"day":"FRI","time":"11:50-12:10"},{"day":"SAT","time":"12:10-12:30"},{"day":"TUE","time":"12:10-12:30"},{"day":"FRI","time":"12:10-12:30"}],"unavailable":[{"day":"SAT","time":"10:30-10:50"},{"day":"TUE","time":"10:30-10:50"},{"day":"FRI","time":"10:30-10:50"},{"day":"TUE","time":"10:50-11:10"},{"day":"SAT","time":"11:10-11:30"},{"day":"TUE","time":"11:10-11:30"},{"day":"FRI","time":"11:10-11:30"},{"day":"SAT","time":"11:30-11:50"},{"day":"TUE","time":"11:30-11:50"},{"day":"FRI","time":"11:30-11:50"},{"day":"TUE","time":"11:50-12:10"},{"day":"SAT","time":"12:30-12:50"},{"day":"TUE","time":"12:30-12:50"},{"day":"FRI","time":"12:30-12:50"},{"day":"SAT","time":"12:50-1:10"},{"day":"TUE","time":"12:50-1:10"},{"day":"FRI","time":"12:50-1:10"}]};

weekli_id.build();

var load_data = function(){
    weekli_id.load_data(dummydata);
};

//weekli.build();
//weekli_work.build();