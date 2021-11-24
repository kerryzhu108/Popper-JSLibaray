'use strict'

popifyElement('#hover').createPopUp({
    type:'image',
    content:'https://media.nature.com/w700/magazine-assets/d41586-019-03614-0/d41586-019-03614-0_17409632.jpg',
    height: 80, 
    width: 100,
    persist: false,
    draggable: false,
    resizable: false
})
const persisterElement = popifyElement('#persist')
const persisterPopup = persisterElement.createPopUp({
    type:'image',
    content:'https://media.newyorker.com/photos/60902b9e71ad4471831f0e24/16:9/w_1280,c_limit/Rosner-Mushrooms-blewit.jpg',
    height: 80, 
    width: 130,
    persist: true,
    draggable: false,
    resizable: false,
    shift: {x: 35, y: -110}
})
popifyElement('#persistDrag').createPopUp({
    type:'image',
    content:'https://healing-mushrooms.net/wp-content/uploads/2020/06/Psilocybe-Semilanceata.jpg',
    height: 100,
    width: 100,
    persist: true, 
    draggable: true,
    shift: {x: -90, y: 10},
})
const otherPopup = popifyElement('#persistDrag2').createPopUp({
    type:'image',
    content: 'https://www.mushroomexpert.com/images/kuo6/panaeolus_foenisecii_01.jpg',
    height: 100,
    width: 100,
    persist: true, 
    draggable: true,
    shift: {x: -60, y: 0},
})
popifyElement('#topleft').createPopUp({
    type:'image',
    content: 'https://ychef.files.bbci.co.uk/976x549/p073k7lz.jpg',
    height: 35,
    width: 45,
    persist: true, 
    draggable: true,
    shift: {x: -350, y: -300},
    resizable: true
})
const images = ['https://www.mushroomexpert.com/images/kuo6/panaeolus_foenisecii_01.jpg',
                'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/278858_2200-732x549.jpg',
                'https://www.wpr.org/sites/default/files/styles/resp_orig_custom_user_narrow_1x/public/morel_mushroom.jpg?itok=Kz8cQzXX&timestamp=1558375495',]
for (let i=0; i<3; i++) {
    popifyElement('#multiple').createPopUp({
        type:'image',
        content: images[i],
        height: 150,
        width: 160,
        persist: false, 
        draggable: false,
        shift: {x: 150 * (i+1) + 20 * (i+1), y: -25},
        resizable: true
    })

}
popifyElement('#multiple').createPopUp({
    type:'image',
    content: 'https://www.eatright.org/-/media/eatrightimages/food/planningandprep/cookingtipsandtrends/mushrooms-1049990874.jpg',
    height: 150,
    width: 150,
    persist: false, 
    draggable: false,
    shift: {x: 0, y: -195},
    resizable: true
})
popifyElement('#textBackground').createPopUp({
    type:'image',
    content: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Psilocybe_azurescens_123020.jpg',
    height: 80,
    width: 60,
    persist: false, 
    draggable: false,
    shift: {x: 0, y: 0},
    resizable: true
})
popifyElement('#textBackground').createPopUp({
    type:'text',
    content:'P. azurescens is an espcially unique species of psilocybe. It is among the most potent of the tryptamine-bearing mushrooms.',
    height: 60,
    width: 170,
    persist: false, 
    draggable: false,
    resizable: false,
    backgroundColor: '#6f0000',
    fontFamily: 'Garamond',
    fontSize: 11, 
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
    backgroundColor: '#6f0000',
    fontFamily: 'Garamond',
    fontSize: 20,
    shift: {x: -140, y: 0},
})

popifyElement('#expand').createPopUp({
    type:'text',
    content:'P. azurescens is an espcially unique species of psilocybe. It is among the most potent of the tryptamine-bearing mushrooms.',
    height: 50,
    width: 70,
    persist: true, 
    draggable: false,
    resizable: false,
    backgroundColor: '#6f0000',
    fontSize: 13,
    shift: {x: -140, y: -120},
    expand: {newHeight: 50, newWidth: 280},
})

popifyElement('#samePopup').revealPopup(otherPopup)

document.querySelector('#changeOther').addEventListener('click', function() {
    persisterElement.setAbilities(persisterPopup, {persist: true, draggable: true})
})