/**
 * Created by Collin Walker
 */


//var weekli = new Weekli();
//weekli.build();

var weekli_id = new Weekli({
    wk_id: 'id',
    week: 'workweek',
    week_days: ['Saturday', 'Tuesday', 'Friday'],
    minute_interval: 60,
    time_range: '7,13:00'
});

var dummydata = {"available":[{"day":"MON","time":"7:00-8:00"},{"day":"THU","time":"7:00-8:00"},{"day":"MON","time":"8:00-9:00"},{"day":"THU","time":"8:00-9:00"},{"day":"TUE","time":"10:00-11:00"},{"day":"WED","time":"10:00-11:00"},{"day":"FRI","time":"10:00-11:00"},{"day":"WED","time":"11:00-12:00"}],"unavailable":[{"day":"TUE","time":"7:00-8:00"},{"day":"WED","time":"7:00-8:00"},{"day":"FRI","time":"7:00-8:00"},{"day":"TUE","time":"8:00-9:00"},{"day":"WED","time":"8:00-9:00"},{"day":"FRI","time":"8:00-9:00"},{"day":"MON","time":"9:00-10:00"},{"day":"TUE","time":"9:00-10:00"},{"day":"WED","time":"9:00-10:00"},{"day":"THU","time":"9:00-10:00"},{"day":"FRI","time":"9:00-10:00"},{"day":"MON","time":"10:00-11:00"},{"day":"THU","time":"10:00-11:00"},{"day":"MON","time":"11:00-12:00"},{"day":"TUE","time":"11:00-12:00"},{"day":"THU","time":"11:00-12:00"},{"day":"FRI","time":"11:00-12:00"},{"day":"MON","time":"12:00-1:00"},{"day":"TUE","time":"12:00-1:00"},{"day":"WED","time":"12:00-1:00"},{"day":"THU","time":"12:00-1:00"},{"day":"FRI","time":"12:00-1:00"}]};

weekli_id.build();

var load_data = function(){
    weekli_id.load_data(dummydata);
};
