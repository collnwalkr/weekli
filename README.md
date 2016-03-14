# weekli.js 

#### a pure javascript component that allows your users to easily input their availability on a week calendar effortlessly 
**Version 0.2.5**

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
#### Default usage:
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
