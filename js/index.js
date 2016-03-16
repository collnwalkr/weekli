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
    time_range: '7:15,13:00'
});

var dummydata = {"available":[{"day":"WED","time":"7:00 am -8:00 am"},{"day":"THU","time":"7:00 am -8:00 am"},{"day":"FRI","time":"7:00 am -8:00 am"},{"day":"WED","time":"8:00 am -9:00 am"},{"day":"THU","time":"8:00 am -9:00 am"},{"day":"FRI","time":"8:00 am -9:00 am"},{"day":"WED","time":"9:00 am -10:00 am"},{"day":"THU","time":"9:00 am -10:00 am"},{"day":"FRI","time":"9:00 am -10:00 am"},{"day":"THU","time":"10:00 am -11:00 am"},{"day":"FRI","time":"10:00 am -11:00 am"},{"day":"THU","time":"11:00 am -12:00 pm"},{"day":"FRI","time":"11:00 am -12:00 pm"},{"day":"THU","time":"12:00 pm -1:00 pm"},{"day":"FRI","time":"12:00 pm -1:00 pm"}],"unavailable":[{"day":"MON","time":"7:00 am -8:00 am"},{"day":"TUE","time":"7:00 am -8:00 am"},{"day":"MON","time":"8:00 am -9:00 am"},{"day":"TUE","time":"8:00 am -9:00 am"},{"day":"MON","time":"9:00 am -10:00 am"},{"day":"TUE","time":"9:00 am -10:00 am"},{"day":"MON","time":"10:00 am -11:00 am"},{"day":"TUE","time":"10:00 am -11:00 am"},{"day":"WED","time":"10:00 am -11:00 am"},{"day":"MON","time":"11:00 am -12:00 pm"},{"day":"TUE","time":"11:00 am -12:00 pm"},{"day":"WED","time":"11:00 am -12:00 pm"},{"day":"MON","time":"12:00 pm -1:00 pm"},{"day":"TUE","time":"12:00 pm -1:00 pm"},{"day":"WED","time":"12:00 pm -1:00 pm"}]};

weekli_id.build();

var load_data = function(){
    weekli_id.load_data(dummydata);
};

load_data();