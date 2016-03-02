/**
 * Created by Collin Walker
 */
var weekli = new Weekli();

var weekli_id = new Weekli({
    wk_id: 'id',
    week: 'workweek',
    time_interval: 5,
    time_range: '1,9'
});

var weekli_work = new Weekli({
    wk_id: 'work',
    week: 'workweek'
});


weekli_id.build();
weekli.build();
//weekli_work.build();