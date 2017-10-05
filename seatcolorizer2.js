/**
 * A simple seat colorizer.
 *
 * @param elm The {embed,object,iframe} element that points to a compatible svg (map) graphic
 * @param callback The js object that allows reporting seats
 */
var mapsvgdoc = null;
//var seatNumber = null;
//var updateSeatColor = colorSeat(seatNumber);

window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);

function SeatColorizer(elm) {

    init(elm);

    function init(elm) {

        //var mapsvgdoc = null;
        try {
          mapsvgdoc = elm.contentDocument;
        }
        catch(e) {
          mapsvgdoc = elm.getSVGDocument();
        }

        mapurl = elm.src || elm.data;


        mapsvgdoc.documentElement.setAttributeNS(null, 'focusHighlight', 'none'); // prevents showing a focusrect in Opera 9.5

        FastClick.attach(mapsvgdoc.documentElement);

        mapsvgdoc.documentElement.addEventListener('click', seatClick, false);
    }

    function seatClick(evt) {

        var element = evt.target
        var parent = element.parentNode
        var grandParent = parent.parentNode

        if (element.nodeName == 'text') {
            parent = element.parentNode.parentNode;
            grandParent = parent.parentNode
        }

        if (grandParent && grandParent.getAttribute('id') == 'seats') {

            var parentClass = parent.getAttribute('class')

            var messageToPost = {
                 'Id': parent.getAttribute('id')
            };

            if (parentClass) {
                parent.removeAttribute('class')
                window.webkit.messageHandlers.iosListener.postMessage(messageToPost);
            }
            else {
                parent.setAttribute('class', 'order')
                messageToPost['Class'] = 'order'
                window.webkit.messageHandlers.iosListener.postMessage(messageToPost);
            }
        }
    }
}

function colorSeat(seatIds) 
{
    for (var i = 0; i < seatIds.length; i++) 
    {
        var seatId = seatIds[i]
        var element = mapsvgdoc.getElementById(seatId);
        var parent = element.parentNode

        if (parent.getAttribute('id') == 'seats') {

            var parentClass = element.getAttribute('class')

            var messageToPost = {
                    'id': element.getAttribute('id')
            };

            if (parentClass) {
                element.removeAttribute('class')
            }
            else {
                element.setAttribute('class', 'order')
            }
        }

    }
}

function imageIsLoaded() 
{
    var messageToPost = {
        'id': 'ready'
    };
    window.webkit.messageHandlers.iosListener.postMessage(messageToPost);
}
