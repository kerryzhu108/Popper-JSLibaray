'use strict';

(function(global, document, $) { 
    let dragging = false
    let resizing = false
    let selectedElement = null
    let elementButtons = {}
    let id = 0
    let log = console.log

    function popifyElement(selector) {
        const _self = {}
        _self.element = document.querySelector(selector)
        _self.persist = false

        _self.createPopUp = function(params) {
            /**
             * params: {
             *  type: 'image' or 'text' pr 'custom,
             *  content: image link or text body
             *  height: int
             *  width: int
             *  persist: boolean
             *  displayInitially: boolean (default false)
             *  draggable: boolean
             *  resizable: boolean
             *  fontFamily: valid font family (optional)
             *  fontSize: int (optional)
             *  padding: int (optional)
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

            _setAttributes(popup, params)
            _positionPopup(_self.element, popup, params)
            _self.setAbilities(popup, params)

            // hides the element initially unless displayInitially == true
            params.displayInitially ? _self.element.click() : popup.style.display = 'none'
            return popup
        }

        _self.setAbilities = function(popup, params) {
            /*Allows developer to reset a popup's attributes.
            params: {
                persist: boolean
                draggable: boolean (optional)
                resizable: boolean (optional)
                expand: {newHeight: int, newWidth: int} (optional)
            } */
            _self.persist = params.persist
            params.persist? _handlePersist(_self.element, popup) : _handleTemporary(_self.element, popup)
            params.draggable? _toggleDrag(popup) : false
            params.resizable? _handleResize(_self.element, popup) : false
            params.expand? _handleExpand(popup, params.expand, false) : false
        }

        _self.animate = function(popup, params) {
            /*Adds animations for popups
            params : {
                float: {speed: int, range: int} (optional)
                fadeIn: boolean (default false) (optional) 
                expand: {newHeight: int, newWidth: int} (optional)
            }
            */
            params.float? _handleFloat(popup, params.float) : false
            params.fade? _handleFade(_self.element, popup, _self.persist) : false
            params.expand? _handleExpand(popup, params.expand, true) : false

        }

        return _self
    }

    function _handlePersist(element, popupElement) {
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

    function _handleTemporary(element, popup) {
        element.addEventListener('mouseover', function() {
            popup.style.display = ''
        })
        element.addEventListener('mouseout', function() {
            popup.style.display = 'none'
        })
    }

    function _toggleDrag(popup) {
        popup.addEventListener('mousedown', function(e) {
            if (e.currentTarget !== e.target) return
            dragging? dragging = false : dragging = true
            selectedElement = popup
        })
        document.addEventListener('mousemove', function(e) {
            if (dragging && selectedElement) {
                selectedElement.style.left = e.pageX + - 30 + 'px'
                selectedElement.style.top = e.pageY + - 40 + 'px'
                _moveButtons()
            }
        })
    }

    function _handleResize(element, popupElement) {
        // private function to hide popup
        const resizeBtn = document.createElement('img')
        elementButtons[popupElement.getAttribute('popid')].push(['resizeBtn', resizeBtn])
        element.appendChild(resizeBtn)
        resizeBtn.setAttribute('src', 'https://cdn.iconscout.com/icon/free/png-256/resize-minimum-arrow-small-6-16389.png')
        resizeBtn.style.height = '23px'
        resizeBtn.style.width = '23px'
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
                _moveButtons()
            }  
        })
        // hides resize-button initially
        resizeBtn.style.display = 'none'
    }

    function _handleFloat(popup, floatSettings) {
        // animates the created popup to float up and down
        popup.animate([
            { transform: `translateY(${-floatSettings.range/2}px)` },
            { transform: `translateY(0px)` },
            { transform: `translateY(${-floatSettings.range/2}px)` }
        ], {
            duration: floatSettings.speed,
            iterations: Infinity
        })
        const popupBtns = elementButtons[popup.getAttribute('popid')]
        if (!popupBtns) return
        popupBtns.map(btn=>{
            btn[1].animate([
                { transform: `translateY(${-floatSettings.range/2}px)` },
                { transform: `translateY(0px)` },
                { transform: `translateY(${-floatSettings.range/2}px)` }
            ], {
                duration: floatSettings.speed,
                iterations: Infinity
            })
        })
    }

    function _handleFade(element, popup, persist) {
        // adds fade in and fade out animations
        const popupBtns = elementButtons[popup.getAttribute('popid')]
        if (persist) {
            element.addEventListener('click', function(e) {
                if (e.currentTarget !== e.target) return
                popup.animate([ {opacity: 0}, {opacity: 1} ], { duration: 3000, iterations: 1 })
                if (!popupBtns) return
                popupBtns.map(btn=>{ btn[1].animate([ {opacity: 0}, {opacity: 1} ], { duration: 2000, iterations: 1 })
                })
            })
            if (!popupBtns) return
            popupBtns.map(btn =>{
                if (btn[0]=='closeBtn'){
                    // changes the behaviour of the close button to fade everything out
                    btn[1].addEventListener('click', function(){
                        popup.style.display = ''
                        popup.animate([ {opacity: 1}, {opacity: 0} ], { duration: 2000, iterations: 1 })
                        setTimeout(()=>{popup.style.display = 'none'}, 2000)
                        popupBtns.map(btn => {
                            btn[1].style.display = ''
                            btn[1].animate([ {opacity: 1}, {opacity: 0} ], { duration: 2000, iterations: 1 })
                            setTimeout(()=>{btn[1].style.display = 'none'}, 2000)
                        })
                    })
                }
            })
        } else {
            element.addEventListener('mouseover', ()=>{
                popup.style.display = ''
                popup.animate([ {opacity: 0}, {opacity: 1} ], { duration: 2000, iterations: 1})
            })
            element.addEventListener('mouseout', ()=>{
                popup.style.display = ''
                popup.animate([ {opacity: 1}, {opacity: 0} ], {duration: 1000, iterations: 1 })
                setTimeout(()=>{popup.style.display = 'none'}, 1000)
            })
        }
    }

    function _moveButtons() {
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

    let prevHandleMouseEnter = null // to clear preveous event listener if a new one is added
    let prevHandleMouseLeave = null
    let expanded = []; let normal = []
    let elementsAnimating = []
    function _handleExpand(popup, newSizes, expand) {
        const popupBtns = elementButtons[popup.getAttribute('popid')] || {length: -1}
        let closeBtn = null
        let resizeBtn = null
        const ogHeight = parseInt(popup.style.height)
        const ogWidth = parseInt(popup.style.width)

        function _handleExpandMouseEnter(e) {
            // expand if element currently not expanded, remove from normal if present
            const posInNormal = normal.indexOf(e.target) 
            if(expanded.includes(e.target)) {
                return
            } else if (posInNormal) {
                normal.splice(posInNormal,1)
            }
            expanded.push(e.target)
            if (elementsAnimating.includes(e.target)) {return} // prevents too many animation events from being stacked
            else {elementsAnimating.push(e.target)}
            $(popup).animate({
                width: `+=${newSizes.newWidth - ogWidth}`,
                height: `+=${newSizes.newHeight - ogHeight}`
            }, expand ? newSizes.speed : 0, function() {
                elementsAnimating.splice(elementsAnimating.indexOf(e.target), 1)
            })
            for (let i=0; i<popupBtns.length; i++) {
                if (popupBtns[i][0] == 'closeBtn') {
                    closeBtn = popupBtns[i][1]
                    $(popupBtns[i][1]).animate({
                        left: `+=${newSizes.newWidth - ogWidth}`
                    }, expand ? newSizes.speed : 0)
                } else if (popupBtns[i][0] == 'resizeBtn') {
                    resizeBtn = popupBtns[i][1]
                    $(popupBtns[i][1]).animate({
                        left: `+=${newSizes.newWidth - ogWidth}`,
                        top: `+=${newSizes.newHeight - ogHeight}`
                    }, expand ? newSizes.speed : 0)
                }
            }
        }

        function _handleExpandMouseLeave(e) {
            // shrink if element currently expanded, remove from expanded if present
            const posInExpanded = expanded.indexOf(e.target) 
            if(normal.includes(e.target) || dragging || e.toElement instanceof HTMLImageElement) {
                return
            } else if (posInExpanded !== null) {
                expanded.splice(posInExpanded,1)
            } else if(!normal.includes(e.target)) {
                normal.push(e.target)
            }
            if (elementsAnimating.includes(e.target)) {return}
            else {elementsAnimating.push(e.target)}
            $(popup).animate({
                width: `-=${newSizes.newWidth - ogWidth}`,
                height: `-=${newSizes.newHeight - ogHeight}`
            }, expand ? newSizes.speed : 0, function() {
                elementsAnimating.splice(elementsAnimating.indexOf(e.target), 1)
            })
            $(closeBtn).animate({
                left: `-=${newSizes.newWidth - ogWidth}`
            }, expand ? newSizes.speed : 0, )
            if (resizeBtn) { $(resizeBtn).animate({
                    left: `-=${newSizes.newWidth - ogWidth}`,
                    top: `-=${newSizes.newHeight - ogHeight}`
                    }, expand ? newSizes.speed : 0) 
            }
        }
        popup.removeEventListener('mouseenter', prevHandleMouseEnter)
        popup.removeEventListener('mouseleave', prevHandleMouseLeave)
        popup.addEventListener('mouseenter', _handleExpandMouseEnter)
        popup.addEventListener('mouseleave', _handleExpandMouseLeave)
        prevHandleMouseEnter = _handleExpandMouseEnter
        prevHandleMouseLeave = _handleExpandMouseLeave
    }

    function _positionPopup(element, popup, params) {
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

    function _setAttributes(popup, params) {
        // sets correct attribute depending on image or text popup
        if (params.type == 'image') popup.setAttribute('src', params.content)
        if (params.type == 'text') {
            popup.style.padding = '6px'
            popup.innerText = params.content
            params.backgroundColor ? popup.style.background = params.backgroundColor : popup.style.background = 'white'
            popup.style.overflow = 'hidden'
            if (params.fontColor) popup.style.color = params.fontColor
            if (params.fontFamily) popup.style.fontFamily = params.fontFamily
            if (params.fontSize) popup.style.fontSize = params.fontSize + 'px'   
            if (params.padding) popup.style.padding = params.padding + 'px'
        }
        if(params.type=='custom') {
            popup.appendChild(params.content)
        }
    }

    global.popifyElement = global.popifyElement || popifyElement
})(window, window.document, $)
