/**
 * A simple seat colorizer.
 *
 * @param elm The {embed,object,iframe} element that points to a compatible svg (map) graphic
 * @param callback The js object that allows reporting seats
 */
function SeatColorizer(elm) {

    init(elm);

    function init(elm) {

        var mapsvgdoc = null;
        try {
          mapsvgdoc = elm.contentDocument;
        }
        catch(e) {
          mapsvgdoc = elm.getSVGDocument();
        }

        mapurl = elm.src || elm.data;


        mapsvgdoc.documentElement.setAttributeNS(null, "focusHighlight", "none"); // prevents showing a focusrect in Opera 9.5

        mapsvgdoc.documentElement.addEventListener("click", seatClick, false);
   
/*
        mapsvgdoc.documentElement.addEventListener('click', function(){ window.webkit.messageHandlers.iosListener.postMessage('click clack!'); });
       */ 
    }

    function seatClick(evt) {

        var element = evt.target
        var parent = element.parentNode
        var grandParent = parent.parentNode


        if (grandParent && grandParent.getAttribute("id") == "seats") {

            var parentClass = parent.getAttribute("class")

            if (parentClass) {
                parent.removeAttribute("class")
                //window.webkit.messageHandlers.iosListener.postMessage('click clack!');
                /*callback.selectionChanged(parent.getAttribute("id"), false)*/ 
            }
            else {
                parent.setAttribute("class", "order")
                //window.webkit.messageHandlers.iosListener.postMessage('click clack!');
                /*callback.selectionChanged(parent.getAttribute("id"), true)*/ 
            }
        }

    }

}