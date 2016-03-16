# weekli.js 

**a pure javascript component that allows your users to effortlessly input their availability on a week calendar**

Version 0.2.5

[Demo and Examples](http://collnwalkr.github.io/weekli/) *in progress*
![weekli capture](https://cloud.githubusercontent.com/assets/7200683/13758674/cf55750c-e9e7-11e5-8bca-65265480f023.gif)
---
### Get your hands on it
**[Bower](http://bower.io)**
```bash
bower install weekli.js --save
```
```html
<link rel="stylesheet" type="text/css" href="bower_components/weekli.js/css/weekli.css"/>

<script type="text/javascript" src="bower_components/weekli.js/js/weekli.min.js"></script>
```
**[NPM](https://www.npmjs.com/)**
```bash
npm install weekli.js --save
```
```html
<link rel="stylesheet" type="text/css" href="node_modules/weekli.js/css/weekli.css"/>

<script type="text/javascript" src="node_modules/weekli.js/js/weekli.min.js"></script>
```

**[Github](https://github.com/)**
```bash
git clone https://github.com/collnwalkr/weekli.git
```
---
### Usage
#### Default Usage:
```html
<!--
    A weekli component needs an empty div tag with an id.
    By default, a new Weekli() object targets an id of 'weekli'
    The id allows multiple, non-competing weekli's on a 
    single page. Note the id used on this div and in the 
    new Weekli object must be the same... 
-->
<div id="weekli"></div>
```
```javascript
// creates new Weekli object and builds it with default options
var weekli = new Weekli();
weekli.build();
```
```javascript
// get the JSON output
var weekli_output = weekli.get_output();
//example output
{
  "available": [
        {
          "day": "WED",
          "time": "7:00 am -8:00 am"
        }
    ],
  "unavailable": [
        {
          "day": "WED",
          "time": "8:00 am -9:00 am"
        }
    ]
}
```
#### Custom Usage:
```javascript
// all customization properties in their default state
var weekli = new Weekli({
    wk_id: 'weekli',
    week: 'week',
    week_days: [],
    minute_interval: '60',
    time_range: '7:00,17:00',
    editable: true,
    time_format: '12hour'
});
```
| attribute |  accepted value and examples |
|:------------------------------|:-------------|
| **wk_id:** |  `string` specifies the div id weekli is in the DOM (example if `<div id = "weekli_custom"> </div>` then `wk_id: 'weekli_custom'` |
| **week:** | `week` , `workweek` ,  `weekend` , or `custom`. determins which days of the week should be shown in columns:  |
| **week_days:** | if week is `custom`, days of the week will be pulled from this array of strings (ex: `week_days: ['Sunday', 'Tuesday', 'Friday']`) |
| **minute_interval:** | `int` determines the time-span for each row (ex: `minute_interval: 60` = 7:00 - 8:00 , `minute_interval: 75` = 7:00 - 8:15) |  
|**time_range:** | `int,int` specifies the start and end times for the rows (ex: `time_range: 10:15,15:30` = 10:15 am - 3:30 pm) |  
| **editable:** | `true` or `false` determins if weekli component can be edited by user interaction |
| **time_format:** | `12hour` or `24hour` specifies if time should be shown in civilian or military format |

#### Custom Styling:
Weekli is styled with [less](http://lesscss.org/). All of the basic coloring, font sizes, and window-size breakpoints can be found in the `weekli.less` file. **However**, there are some conditionals in the less file that are noteworthy:

```less
// CONDITIONALS
@wk-border:               false;
@wk-day-abbreviated:      true;
@wk-hide-ampm:            true;
```
| conditional |  result explained |
|:------------------------------|:-------------------------------------|
| **@wk-border:** |  `true` border is shown while `false` hides the border |
| **@wk-day-abbreviated:** |  `true` when screeen is `@tablet` size, days of the week will be abbreviated (ex: 'Monday' becomes 'Mon'). `false` will not abbreviate days of the week |
| **@wk-hide-ampm:** |  `true` will hide 'A.M' or 'P.M' from being displayed in the time row. However, the get_output() JSON file will still have 'A.M' or 'P.M' still in the data structure. `false` will show the 'A.M' or 'P.M' in the time row |
