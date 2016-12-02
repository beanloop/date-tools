# date-tools
[![Build Status](https://travis-ci.org/joonhocho/graphql-rule.svg?branch=master)](https://travis-ci.org/joonhocho/graphql-rule)
[![Coverage Status](https://coveralls.io/repos/github/joonhocho/graphql-rule/badge.svg?branch=master)](https://coveralls.io/github/joonhocho/graphql-rule?branch=master)
[![npm version](https://badge.fury.io/js/graphql-rule.svg)](https://badge.fury.io/js/graphql-rule)
[![Dependency Status](https://david-dm.org/joonhocho/graphql-rule.svg)](https://david-dm.org/joonhocho/graphql-rule)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

Functions for comparing and counting with dates. Includes Typescript tyipings.


### Install
```
yarn add date-tools
npm install --save date-tools
```

### Usage

#### add/subtract
```javascript
import {Duration, add, subtract} from 'date-tools';

add(Date(2000, 1, 1), Duration.Days(5)) === Date(2000, 1, 6)
subtract(Date(2000, 1, 6), Duration.Days(5)) === Date(2000, 1, 1)

add(Date(2000, 1, 1), Duration.Months(2)) === Date(2000, 3, 1)
subtract(Date(2000, 3, 1), Duration.Months(2)) === Date(2000, 1, 1)

// You can also use them as methods on the date
Date(2000, 1, 1).add(Duration.Days(5)) === Date(2000, 1, 6)
Date(2000, 1, 6).subtract(Duration.Days(5)) === Date(2000, 1, 1)
Date(2000, 1, 1).add(Duration.Months(2)) === Date(2000, 3, 1)
Date(2000, 3, 1).subtract(Duration.Months(2)) === Date(2000, 1, 1)
```

#### isEqual
```javascript
import {Precision, isEqual} from 'date-tools';

isEqual(Date(2000, 1, 1), Date(2000, 1, 2), {precision: Precision.Days}) === false
isEqual(Date(2000, 1, 1), Date(2000, 1, 2), {precision: Precision.Months}) === true
```

#### timeBetween
```javascript

import {Duration, timeBetween} from 'date-tools';
import {match} from 'rusted'

const compare = (start, end) => match(timeBetween(start, end), {
  Days: days => `There are ${days} days between the dates`,
  Months: months => `There are ${months} months between the dates`,
})

compare(Date(2000, 1, 1), Date(2000, 1, 3)) === 'There are 2 days between the dates'
compare(Date(2000, 1, 1), Date(2000, 3, 1)) === 'There are 2 months between the dates'
```

### More Usage
Take a look at the [test file](https://github.com/beanloop/date-tools/blob/master/src/index.test.ts).


### LICENSE
```
The MIT License (MIT)

Copyright (c) 2016 Beanloop AB

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
