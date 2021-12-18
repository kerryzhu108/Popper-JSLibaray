'use strict';

const triggerElement = popifyElement('#hover')
triggerElement.createPopUp({
    type:'image',
    content:'https://farm6.staticflickr.com/5656/21875611686_3c915d1bf8_z.jpg',
    height: 200, 
    width: 240,
    persist: false,
    draggable: false,
    resizable: false
})
triggerElement.createPopUp({
    type:'image',
    content:'https://i.ibb.co/ThVVPSj/basic.jpg',
    height: 200, 
    width: 540,
    persist: false,
    draggable: false,
    resizable: false,
    shift: {x: 220, y: 0}
})

popifyElement('#persistDrag1').createPopUp({
    type:'image',
    content:'https://media.newyorker.com/photos/60902b9e71ad4471831f0e24/16:9/w_1280,c_limit/Rosner-Mushrooms-blewit.jpg',
    height: 80, 
    width: 130,
    persist: true,
    draggable: true,
    resizable: false,
    shift: {x: 35, y: -110}
})
popifyElement('#persistDrag2').createPopUp({
    type:'image',
    content:'https://healing-mushrooms.net/wp-content/uploads/2020/06/Psilocybe-Semilanceata.jpg',
    height: 100,
    width: 100,
    persist: true, 
    draggable: true,
    shift: {x: -90, y: -130},
})
popifyElement('#persistDrag3').createPopUp({
    type:'image',
    content: 'https://www.mushroomexpert.com/images/kuo6/panaeolus_foenisecii_01.jpg',
    height: 100,
    width: 100,
    persist: true, 
    draggable: true,
    shift: {x: -60, y: -130},
})

popifyElement('#persistCode').createPopUp({
    type:'image',
    content: 'https://gcdn.pbrd.co/images/60AuDVJQ1XOT.jpg?o=1',
    height: 326,
    width: 759,
    persist: true, 
    draggable: true,
    shift: {x: -180, y: 0},
    resizable: false,
})

popifyElement('#shiftCode').createPopUp({
    type:'image',
    content: 'https://i.ibb.co/58Kz7bK/shifter.jpg',
    height: 130,
    width: 408,
    persist: false, 
    draggable: false,
    resizable: true,
    shift: {x: -50, y: -160},
})


const popupWillAnimate = popifyElement('#topleft')
const popup3 = popupWillAnimate.createPopUp({
    type:'image',
    content: 'https://ychef.files.bbci.co.uk/976x549/p073k7lz.jpg',
    height: 70,
    width: 90,
    persist: true,
    draggable: true,
    shift: {x: -200, y: -400},
    resizable: true,
})
popupWillAnimate.animate(popup3, {
    float: {speed: 2000, range: '15'},
    fade: true,
})

popifyElement('#animateCode').createPopUp({
    type:'image',
    content: 'https://i.ibb.co/7RVCyFj/animate.jpg',
    height: 300,
    width: 500,
    persist: false, 
    draggable: false,
    shift: {x: -100, y: 0},
})

const images = ['https://www.mushroomexpert.com/images/kuo6/panaeolus_foenisecii_01.jpg',
                'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/278858_2200-732x549.jpg',
                'https://www.wpr.org/sites/default/files/styles/resp_orig_custom_user_narrow_1x/public/morel_mushroom.jpg?itok=Kz8cQzXX&timestamp=1558375495']
for (let i=0; i<images.length; i++) {
    const stew = popifyElement('#multiple')
    const ingrdient = stew.createPopUp({
        type:'image',
        content: images[i],
        height: 150,
        width: 160,
        persist: false, 
        draggable: false,
        shift: {x: 150 * (i+1) + 20 * (i+1), y: -19},
        resizable: true,
    })
    stew.animate(ingrdient, {float: {speed: 2000, range: '20'}})

}
const stew = popifyElement('#multiple')
const finalIngredient = stew.createPopUp({
    type:'image',
    content: 'https://www.eatright.org/-/media/eatrightimages/food/planningandprep/cookingtipsandtrends/mushrooms-1049990874.jpg',
    height: 150,
    width: 150,
    persist: false, 
    draggable: false,
    shift: {x: 0, y: -195},
    resizable: true
})
stew.animate(finalIngredient, {float: {speed: 2000, range: '20'}})

popifyElement('#multiCode').createPopUp({
    type:'image',
    content: 'https://i.ibb.co/qsW3jHw/multi.jpg',
    height: 250,
    width: 500,
    persist: true, 
    draggable: false,
    shift: {x: 0, y: 0},
    resizable: true
})
const otherPopup1 = popifyElement('#textBackground').createPopUp({
    type:'image',
    content: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Psilocybe_azurescens_123020.jpg',
    height: 80,
    width: 60,
    persist: false, 
    draggable: false,
    shift: {x: 0, y: 0},
    resizable: false
})
const otherPopup2 = popifyElement('#textBackground').createPopUp({
    type:'text',
    content:'P. azurescens is an espcially unique species of psilocybe. It is among the most potent of the tryptamine-bearing mushrooms.',
    height: 60,
    width: 170,
    persist: false, 
    draggable: false,
    resizable: false,
    textOptions: {backgroundColor: '#6f0000', fontFamily: 'Garamond', fontSize: 11},
    shift: {x: 60, y: 0},
})
popifyElement('#resizeText').createPopUp({
    type:'text',
    content:'P. azurescens is an espcially unique species of psilocybe. It is among the most potent of the tryptamine-bearing mushrooms.',
    height: 60,
    width: 70,
    persist: true, 
    draggable: false,
    resizable: true,
    textOptions: {backgroundColor: '#6f0000', fontFamily: 'Garamond', fontSize: 20},
    shift: {x: -140, y: 0},
})

const expander = popifyElement('#expand')
const expanderPopup = expander.createPopUp({
    type:'text',
    content:`P. azurescens is an espcially unique species of psilocybe. It is among the most potent of the tryptamine-bearing mushrooms, often
    found fruiting on deciduous wood chips or in sandy coastal soils rich in ligneous material.`,
    height: 50,
    width: 70,
    persist: true,
    resizable: true,
    textOptions: {backgroundColor: '#6f0000', fontSize: 13},
    shift: {x: -110, y: -150},
    expand: {newHeight: 110, newWidth: 280},
})
expander.animate(expanderPopup, {expand: {newHeight: 90, newWidth: 280, speed: 500}})

popifyElement('#resizableCode').createPopUp({
    type:'image',
    content:'https://i.ibb.co/nnF5Dr4/expander.jpg',
    height: 50,
    width: 70,
    persist: true,
    resizable: true,
    draggable: true,
    shift: {x: -50, y: -100},
})

const persisterTrigger = popifyElement('#notDraggable')
const persisterPopup = persisterTrigger.createPopUp({
    type: 'image',
    content: 'https://inaturalist-open-data.s3.amazonaws.com/photos/105357446/medium.jpg',
    persist: true,
    draggable: false,
    width: 100,
    height: 100,
    shift: {x: -50, y: 30},
})

document.querySelector('#changeOther').addEventListener('click', function() {
    persisterTrigger.setAbilities(persisterPopup, {persist: true, draggable: true})
})

popifyElement('#setAbilCode').createPopUp({
    type: 'image',
    content: 'https://i.ibb.co/4WCHchB/seta.jpg',
    persist: true,
    resizable: true,
    draggable: true,
    width: 560,
    height: 60,
    shift: {x: -50, y: 0},
})

const selfMadeHTML = document.querySelector('#personalizedElement').cloneNode(true)
selfMadeHTML.setAttribute('id', 'customPopupHTML')

// Cloned elements needs new unique id
selfMadeHTML.querySelector('#info').setAttribute('id', 'info1')
selfMadeHTML.querySelector('#pict').setAttribute('id', 'pict1')
selfMadeHTML.querySelector('#sour').setAttribute('id', 'sour1')

popifyElement('#triggerText').createPopUp({
    type: 'custom',
    content: selfMadeHTML, // our custom popup element
    persist: true,
    draggable: false,
    resizable: false,
    width: 200,
    shift: {x: 50, y: -230},
})

// #id are the ids of the elements inside our selfMadeHTML
popifyElement('#info1').createPopUp({
    type:'text',
    content:`Psilocybe atlantis is a close relative of Psilocybe mexicana and has been recorded only from Georgia. It has a pleasant taste and smell. 
     While naturally rare it is often cultivated for its psychedelic properties.`,
    height: 150,
    width: 170,
    persist: false, 
    draggable: false,
    resizable: false,
    textOptions: {backgroundColor: 'rgb(131, 95, 30)', fontColor: 'rgb(83, 59, 14)', fontSize: 13},
    shift: {x: 215, y: -20},
})

popifyElement('#pict1').createPopUp({
    type:'image',
    content:'https://upload.wikimedia.org/wikipedia/commons/a/a4/Psilocybe.atlantis.one.jpg',
    height: 180,
    width: 170,
    persist: false, 
    draggable: false,
    resizable: false,
    shift: {x: 215, y: -20},
})

popifyElement('#pict1').createPopUp({
    type:'image',
    content:'https://upload.wikimedia.org/wikipedia/commons/7/75/Psilocybe.atlantis.six.jpg',
    height: 180,
    width: 170,
    persist: false, 
    draggable: false,
    resizable: false,
    shift: {x: 395, y: -20},
})

popifyElement('#sour1').createPopUp({
    type:'text',
    content:`"Psilocybe atlantis" - Wikipedia`,
    height: 16,
    width: 190,
    persist: false, 
    draggable: false,
    resizable: false,
    textOptions: { backgroundColor: 'rgb(131, 95, 30)', fontColor: 'rgb(83, 59, 14)', fontSize: 13 },
    shift: {x: 215, y: 113},
})

popifyElement('#customCode').createPopUp({
    type:'image',
    content:'https://i.ibb.co/44J1VGw/custom.jpg',
    height: 180,
    width: 230,
    persist: true, 
    draggable: true,
    resizable: true,
})
