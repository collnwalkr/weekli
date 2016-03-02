/**
 * Created by Collin Walker
 */
var weekli = new Weekli();

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


weekli_id.build();
weekli.build();
//weekli_work.build();