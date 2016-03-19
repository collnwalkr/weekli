/**
 * Created by Collin Walker
 */


//var weekli = new Weekli();
//weekli.build();
var clipboard = new Clipboard('.copy');

clipboard.on('success', function(e) {

    var copy_spans = document.getElementsByClassName('copy');
    for(var n = 0; n < copy_spans.length; n++){
        copy_spans[n].classList.remove('copied');
        copy_spans[n].innerHTML = "copy";
    }

    e.trigger.classList.add('copied');
    e.trigger.innerHTML = 'copied';

});

var weekli = new Weekli({});

var weekli_custom = new Weekli({
    wk_id: 'weekli_custom'
});

var dummydata = {"available":[{"day":"WED","time":"7:00 am-8:00 am"},{"day":"THU","time":"7:00 am-8:00 am"},{"day":"FRI","time":"7:00 am-8:00 am"},{"day":"WED","time":"8:00 am-9:00 am"},{"day":"THU","time":"8:00 am-9:00 am"},{"day":"FRI","time":"8:00 am-9:00 am"},{"day":"WED","time":"9:00 am-10:00 am"},{"day":"THU","time":"9:00 am-10:00 am"},{"day":"FRI","time":"9:00 am-10:00 am"},{"day":"THU","time":"10:00 am-11:00 am"},{"day":"FRI","time":"10:00 am-11:00 am"},{"day":"THU","time":"11:00 am-12:00 pm"},{"day":"FRI","time":"11:00 am-12:00 pm"}],"unavailable":[{"day":"MON","time":"7:00 am-8:00 am"},{"day":"TUE","time":"7:00 am-8:00 am"},{"day":"MON","time":"8:00 am-9:00 am"},{"day":"TUE","time":"8:00 am-9:00 am"},{"day":"MON","time":"9:00 am-10:00 am"},{"day":"TUE","time":"9:00 am-10:00 am"},{"day":"MON","time":"10:00 am-11:00 am"},{"day":"TUE","time":"10:00 am-11:00 am"},{"day":"WED","time":"10:00 am-11:00 am"},{"day":"MON","time":"11:00 am-12:00 pm"},{"day":"TUE","time":"11:00 am-12:00 pm"},{"day":"WED","time":"11:00 am-12:00 pm"}]};

weekli_custom.build();
weekli.build();

var load_data = function(){
    weekli_custom.load_data(dummydata);
};