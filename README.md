# js-library-zhujia50

# Landing Page
https://popperjs.herokuapp.com/
# Getting started

Scripts for using the library and importing the library itself:
```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script defer src="popper.js"></script>
```
Please include any scripts that use popper.js after

The library is oriented around the DOM elements that we want to trigger popups with. To prepare a word to trigger a popup, we can wrap it in a span and give it an id <span id=triggerElement>trigger</span> like so.
Then in our Javascript file, we can instantiate our library and create a popup:
```
const pop = popifyElement('#triggerElement')

pop.createPopUp({
    type:'image',
    content:'https://ychef.files.bbci.co.uk/976x549/p073k7lz.jpg',
    height: 200, 
    width: 240,
    persist: false,
    draggable: false,
    resizable: false
})
```

This will translate to an image that appears when we hover over the word "trigger".
![demoImg](https://i.ibb.co/Lrcmh7h/sampleforreadme.jpg)

# API Docs
Please refer to https://popperjs.herokuapp.com/documentation