# ProcessNoticer

Displays message notices of pending processes (e.g. while sending ajax request).
Displays process pending loader. 

## Install

```
yarn add @arturdoruch/process-noticer
```

## Usage

```js
import ProcessNoticer from '@arturdoruch/process-noticer';
import '@arturdoruch/process-noticer/styles/process-notice.css';

const processNoticer = new ProcessNoticer();

// Example of usage.
let notice = processNoticer.add('Sending ajax request', true);
processNoticer.display();

setTimeout(function () {
    processNoticer.remove(notice);
}, 3000);
```

### Global options

Global options of process noticer HTML elements, used by every instance of the ProcessNoticer.
Set by calling function setOptions().

```js
import { setOptions as processNoticerSetOptions } from '@arturdoruch/process-noticer';

processNoticerSetOptions({
    // Options 
});
```

 * `elementsIdPrefix` string (default: `ad-process-notice`)
 
    Prefix of "id" attribute of the list and loader elements.
        
 * `listTag` string (default: `ul`)
 
    Tag name for list element.
 
 * `itemTag` string (default: `li`)
 
    Tag name for list item element.
 
 * `centerList` boolean (default: `false`)
 
    Whether to center displayed process notice list.
    
### Instance options    

Options of process noticer HTML elements applied for specific ProcessNoticer instance.

```js
import ProcessNoticer from '@arturdoruch/process-noticer';

const processNoticer = new ProcessNoticer({
    // options
});
```

 * `listClass` string (default: `null`) 
 
    The class name of the noticer list element.
    
 * `listItemClass` string (default: `null`)
 
    The class name of the noticer a list item element.
 
 * `loaderClass` string (default: `null`)
 
    The class name of the noticer loader element.
 
 * `centerList` boolean (default: `false`)
  
    Whether to center displayed process notice list.