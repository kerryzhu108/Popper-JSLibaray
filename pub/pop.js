"use strict"

let dragging = false
let resizing = false
let selectedElement = null
let elementButtons = {}
let id = 0

function popifyElement(selector) {
    const _self = {}
	_self.element = document.querySelector(selector)

    _self.createPopUp = function(params) {
        /**
         * params: {
         *  type: 'image' or 'text',
         *  content: image link or text body
         *  height: int
         *  width: int
         *  persist: boolean
         *  draggable: boolean
         *  resizable: boolean
         *  fontFamily: valid font family (optional)
         *  fontSize: int (optional)
         *  backgroundColor: color, default: white (optional) 
         *  expand: {newHeight: int, newWidth: int} (optional)
         *  shift: {x: int y: int} (optional)
         * }
         */
        const type = params.type == 'image' ? 'img' : 'div'
        const popup = document.createElement(type)
        popup.setAttribute('popid', id) // unique identifier for each popup
        id += 1
        _self.element.appendChild(popup)
        elementButtons[popup.getAttribute('popid')] = []
        // { [popid: [['closeBtn', element], [resizeBtn, element]] ], [popid2: [[],[]] ], [popid3: [[],[]] ] }

        setAttributes(popup, params)
        positionPopup(_self.element, popup, params)
        _self.setAbilities(popup, params)

        // hides the element initially
        popup.style.display = 'none'
        return popup
    }

    _self.revealPopup = function(popup) {
        /* Reveals the popup element */
        _self.element.addEventListener('click', function() {
            const popupElements = elementButtons[popup.getAttribute('popid')]
            for (let i=0; i<popupElements.length; i++) {
                popupElements[i][1].style.display = ''
            }
            popup.style.display = ''
        })
    }

    _self.setAbilities = function(popup, params) {
        /*Allows developer to reset a popup's attributes.
        params: {
            persist: boolean
            draggable: boolean (optional)
            resizable: boolean (optional)
            expand: {newHeight: int, newWidth: int} (optional)
        } */
        params.persist? handlePersist(_self.element, popup) : handleTemporary(_self.element, popup)
        params.draggable? toggleDrag(popup) : false
        params.resizable? handleResize(_self.element, popup) : false
        params.expand? handleExpand(popup, params.expand, params.height, params.width) : false
    }

    return _self
}

function handlePersist(element, popupElement) {
    // private function to hide popup
    const xBtn = document.createElement('img')
    element.appendChild(xBtn)
    elementButtons[popupElement.getAttribute('popid')].push(['closeBtn', xBtn])
    xBtn.setAttribute('src', 'https://www.freeiconspng.com/uploads/blue-close-button-png-7.png')
    xBtn.style.height = '20px'
    xBtn.style.width = '20px'
    xBtn.style.marginTop = popupElement.style.marginTop
    xBtn.style.position = 'absolute'
    xBtn.style.zIndex = '11'
    xBtn.style.left = parseInt(popupElement.style.left) + parseInt(popupElement.style.width) - 10 + 'px'
    xBtn.style.top = parseInt(popupElement.style.top) - 10 + 'px'
    xBtn.addEventListener('click', function(e) {
        popupElement.style.display = 'none'
        const popupBtns = elementButtons[popupElement.getAttribute('popid')]
        // hides all associated buttons
        for (let i=0; i<popupBtns.length; i++) {
            popupBtns[i][1].style.display = 'none'
        }
    })

    element.addEventListener('click', function(e) {
        // shows popup and related buttons on click
        if (e.currentTarget !== e.target) return // makes sure clicking close btn doesn't trigger this
        popupElement.style.display = ''
        const popupBtns = elementButtons[popupElement.getAttribute('popid')]
        for (let i=0; i<popupBtns.length; i++) {
            popupBtns[i][1].style.display = ''
        }
    })
    // hides close-button initially
    xBtn.style.display = 'none'
}

function handleTemporary(element, popup) {
    element.addEventListener('mouseover', function() {
        popup.style.display = ''
    })
    element.addEventListener('mouseout', function() {
        popup.style.display = 'none'
    })
}

function toggleDrag(popup) {
    popup.addEventListener('mousedown', function(e) {
        if (e.currentTarget !== e.target) return
        dragging? dragging = false : dragging = true
        selectedElement = popup
    })
    document.addEventListener('mousemove', function(e) {
        if (dragging && selectedElement) {
            selectedElement.style.left = e.pageX + - 30 + 'px'
            selectedElement.style.top = e.pageY + - 40 + 'px'
            moveButtons()
        }
    })
}

function handleResize(element, popupElement) {
    // private function to hide popup
    const resizeBtn = document.createElement('img')
    elementButtons[popupElement.getAttribute('popid')].push(['resizeBtn', resizeBtn])
    element.appendChild(resizeBtn)
    resizeBtn.setAttribute('src', 'https://cdn.iconscout.com/icon/free/png-256/resize-minimum-arrow-small-6-16389.png')
    resizeBtn.style.height = '17px'
    resizeBtn.style.width = '17px'
    resizeBtn.style.marginTop = popupElement.style.marginTop
    resizeBtn.style.position = 'absolute'
    resizeBtn.style.zIndex = '11'
    resizeBtn.style.left = parseInt(popupElement.style.left) + parseInt(popupElement.style.width) - 8 + 'px'
    resizeBtn.style.top = parseInt(popupElement.style.top) + parseInt(popupElement.style.height) - 8 + 'px'
    resizeBtn.addEventListener('click', function() {
        selectedElement = popupElement
        resizing ? resizing = false : resizing = true
    })
    document.addEventListener('click', function(e) {
        // if we click away and still resizing, stop resizing
        if (e.currentTarget == resizeBtn && resizing) resizing = false
    })
    document.addEventListener('mousemove', function(e) {
        if (resizing && selectedElement) {
            selectedElement.style.height = e.pageY - parseInt(selectedElement.style.top) - 25 + 'px'
            selectedElement.style.width = e.pageX - parseInt(selectedElement.style.left) + 'px'
            moveButtons()
        }  
    })
    // hides resize-button initially
    resizeBtn.style.display = 'none'
}

function moveButtons() {
    // moves the buttons of a selected popup when resizing / dragging
    const popupBtns = elementButtons[selectedElement.getAttribute('popid')]
    if (!popupBtns) return
    for (let i=0; i<popupBtns.length; i++) {
        const newXPosition = parseInt(selectedElement.style.left) + parseInt(selectedElement.style.width) - 10 + 'px'
        const newYPosition = parseInt(selectedElement.style.top) - 10 + 'px'
        if (popupBtns[i][0] == 'closeBtn') {
            popupBtns[i][1].style.left = newXPosition
            popupBtns[i][1].style.top = newYPosition
        } else if (popupBtns[i][0] == 'resizeBtn') {
            popupBtns[i][1].style.left = newXPosition
            popupBtns[i][1].style.top = parseInt(newYPosition) + parseInt(selectedElement.style.height) + 'px'
        }
    }
}

function handleExpand(popup, newSize, ogHeight, ogWidth) {
    const popupBtns = elementButtons[popup.getAttribute('popid')]
    let closeBtn = null
    let closeBtnOgPos = null
    let resizeBtn = null
    let resizeBtnOgPos = null

    popup.addEventListener('mouseenter', function() {
        popup.style.width = newSize.newWidth + 'px'
        popup.style.height = newSize.newHeight + 'px'
        for (let i=0; i<popupBtns.length; i++) {
            if (popupBtns[i][0] == 'closeBtn') {
                closeBtn = popupBtns[i][1]
                closeBtnOgPos = [popupBtns[i][1].style.left, popupBtns[i][1].style.top]
                popupBtns[i][1].style.left = parseInt(popupBtns[i][1].style.left) + newSize.newWidth - ogWidth + 'px'
            } else if (popupBtns[i][0] == 'resizeBtn') {
                resizeBtn = popupBtns[i][1]
                resizeBtnOgPos = [popupBtns[i][1].style.left, popupBtns[i][1].style.top]
                popupBtns[i][1].style.left = parseInt(popupBtns[i][1].style.left) + newSize.newWidth - ogWidth + 'px'
                popupBtns[i][1].style.top = parseInt(popupBtns[i][1].style.top) + newSize.newHeight - ogHeight + 'px'
            }
        }
    })
    popup.addEventListener('mouseleave', function() {
        if (dragging) return
        popup.style.height = ogHeight + 'px'
        popup.style.width = ogWidth + 'px'
        if (resizeBtn) { resizeBtn.style.left = resizeBtnOgPos[0]; resizeBtn.style.top = resizeBtnOgPos[1] }
        closeBtn.style.left = closeBtnOgPos[0]
        closeBtn.style.top = closeBtnOgPos[1]
        moveButtons()
    })
}

function positionPopup(element, popup, params) {
    // sets initial popup position
    popup.style.height = params.height + 'px'
    popup.style.width = params.width + 'px'
    popup.style.position = 'absolute'
    popup.style.zIndex = '10'
    popup.style.marginTop = '25px'
    let shiftx = 0; let shifty = 0
    if (params.shift) { shiftx = params.shift.x, shifty=params.shift.y }
    popup.style.left = element.offsetLeft + shiftx + 'px'
    popup.style.top = element.offsetTop + shifty + 'px'
}

function setAttributes(popup, params) {
    // sets correct attribute depending on image or text popup
    if (params.type == 'image') popup.setAttribute('src', params.content)
    if (params.type == 'text') {
        popup.style.padding = '6px'
        popup.innerText = params.content
        params.backgroundColor ? popup.style.background = params.backgroundColor : popup.style.background = 'white'
        popup.style.overflow = 'hidden'
        if (params.fontFamily) popup.style.fontFamily = params.fontFamily
        if (params.fontSize) popup.style.fontSize = params.fontSize + 'px'   
    }
}