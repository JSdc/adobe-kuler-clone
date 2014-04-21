 // by Pixy Cakes (www.pixycakes.com)
 
 
  var pixyColorThemeDesigner = function (  ) {

    if (window.addEventListener) {

        window.addEventListener('load', function () {

            //hue Wheel variables that control the size and position of the wheel

            var cWidth = 360;
            var cHeight = 360; // size of circle drag ui

            var ctrX = cWidth / 2; // center
            var ctrY = cHeight / 2;

            var hueSelect = false;
            var drawTriangle = true;

            var hueOffset = 360 / 6; // spin the color wheel by this much to rotate the color pattern

            var cR = 22; //radius of touch circles (yes this is touch-enabled)

            var maxRadius = (cWidth / 2) - (cR / 2) - 40; // restrict draggable circles to this shape
                                                        // -40 is to include the grey area outside the hue wheel.. 
            var minDistance = Math.PI / 12;

            //draggable circle variables
            
            var borderColor = "rgba(180, 180, 180, 1)"; // non-active circle borders
            var focused_circle = 0;
            var last_focused = 0;

            var dc = []; // circle deltas

            // each circle defaults
            
            var c = [ 
                {
                    id: 0, // ID #
                    h: 0, // hue
                    s: 0.8, // saturation - determines how far towards the outer edge of the color wheel
                    l: 1, // lightness
                    r: cR, // radius of the physical circle, too small means touch devices have a hard time
                    c: 0, 
                    t: "rgba(255, 255, 255, 1)" // border color (selected circle is white)
                },
                {
                    id: 1,
                    h: 0 + (Math.PI / 8), 
                    s: 0.8,
                    l: 1,
                    r: cR,
                    c: 0,
                    t: borderColor // for non-selected circles
                },
                {
                    id: 2,
                    h: 0 - (Math.PI / 8),
                    s: 0.8,
                    l: 1,
                    r: cR,
                    c: 0,
                    t: borderColor
                }, 
                {
                    id: 3,
                    h: 0 + (Math.PI / 4),
                    s: 0.8,
                    l: 1,
                    r: cR,
                    c: 0,
                    t: borderColor
                },
                {
                    id: 4,
                    h: 0 - (Math.PI / 4),
                    s: 0.8,
                    l: 1,
                    r: cR,
                    c: 0,
                    t: borderColor
                }
            ]; // color wheel circles

            var c2 = [{ // saturation-lightness square circle
                id: 0,
                h: 0,
                s: 0.8,
                l: 1,
                r: cR,
                c: 0,
                t: borderColor
            }]; // circle for the saturation lightness square

            var shadesH;

            var palettes = [ // 
                {
                    name: 'Springtime',
                    data: '3,1,1,1,1,1,0,1,1,2,1,1,4,1,1',
                    t: '7'
                },
                {
                    name: 'Bright Greens',
                    data: '3,1,1,1,1,1,0,1,1,2,1,1,4,1,1',
                    t: '1'
                },
                {
                    name: 'Red Reds',
                    data: '3,1,1,1,1,1,0,1,1,2,1,1,4,1,1',
                    t: '4'
                }
            ]; // pre-set palettes

            // RYB Hue Wheel -- TO DO  -- artists and bakers do not use the RGB hue wheel.
            // RGB are the 3 colors of light that make computer monitors work.
            // However, in art, and at Pixy Cakes, you use Red-Yellow-Blue - like you were taught in school.

            // food dye works on the RYB concept. Therefore, we are creating an RYB color wheel - something
            // you don't really see online ever. Even Adobe is using RGB only in Kuler.                                    
            // TO-DO

            var RYBwheel = new Array(360, 100, 100, 342, 100, 89, 326, 100, 80, 300, 100, 65, 279, 95, 67, 266, 91, 68, 254, 89, 69, 240, 85, 70, 222, 89, 67, 206, 93, 64, 180, 100, 60, 154, 100, 69, 120, 100, 80, 93, 100, 89, 80, 100, 93, 70, 100, 96, 60, 100, 100, 55, 100, 100, 50, 100, 100, 45, 100, 100, 40, 100, 100, 34, 100, 100, 27, 100, 100, 17, 100, 100, 0, 100, 100);

            var colorRules = [

            // id, name, # of circles, delta, initial hue, initial saturation, hue restriction
            // description not implemented yet // TO-DO

                {
                    n: 0,
                    m: 'Analogous 5',
                    nc: 5,
                    dr: 0,
                    tri: 1,
                    description: 'A traditional color theme where colors are next to each other on the color wheel. You see this commonly in nature, such as with fall colors.',
                    c0: 0,
                    c0s: 0.8,
                    c1: +Math.PI / 8,
                    c1s: 0.8,
                    c1restraint: 2 * Math.PI / 8,
                    c2: -Math.PI / 8,
                    c2s: 0.8,
                    c2restraint: 2 * Math.PI / 8,
                    c3: +Math.PI / 4,
                    c3s: 0.8,
                    c3restraint: 2 * Math.PI / 4,
                    c4: -Math.PI / 4,
                    c4s: 0.8,
                    c4restraint: 2 * Math.PI / 4,
                },

                {
                    n: 1,
                    m: 'Analogous 3',
                    nc: 3,
                    dr: 0,
                    tri: 1,
                    description: 'A traditional color theme where colors are next to each other on the color wheel. You see this commonly in nature, such as with fall colors.',
                    c0: 0,
                    c0s: 0.8,
                    c1: +Math.PI / 8,
                    c1s: 0.8,
                    c1restraint: 2 * Math.PI / 8,
                    c2: -Math.PI / 8,
                    c2s: 0.8,
                    c2restraint: 2 * Math.PI / 8,

                },

                {
                    n: 2,
                    m: 'Split',
                    nc: 4,
                    dr: 0,
                    tri: 0,
                    description: '',
                    c0: 0,
                    c0s: 0.8,
                    c1: +2 * Math.PI / 12,
                    c1s: 0.8,
                    c2: -2 * Math.PI / 12,
                    c2s: 0.8,
                    c3: Math.PI,
                    c3s: 0.8,
                },

                {
                    n: 3,
                    m: 'Complementary',
                    nc: 2,
                    dr: 0,
                    tri: 0,
                    description: '',
                    c0: 0,
                    c0s: 0.8,
                    c1: Math.PI,
                    c1s: 0.8,
                 },

                {
                    n: 4,
                    m: 'Triadic',
                    nc: 3,
                    dr: 0,
                    tri: 0,
                    description: '',
                    c0: 0,
                    c0s: 0.8,
                    c1: 2 * Math.PI / 3,
                    c1s: 0.8,
                    c2: -2 * Math.PI / 3,
                    c2s: 0.8,
                },

                {
                    n: 5,
                    m: 'Rectangle',
                    nc: 4,
                    dr: 0,
                    tri: 0,
                    description: '',
                    c0: 4 * Math.PI / 12,
                    c0s: 0.8,
                    c1: -4 * Math.PI / 12,
                    c1s: 0.8,
                    c2: 8 * Math.PI / 12,
                    c2s: 0.8,
                    c3: -8 * Math.PI / 12,
                    c3s: 0.8,
                },

                {
                    n: 6,
                    m: 'Monochromatic',
                    nc: 5,
                    dr: 0,
                    tri: 0, // special case - will have its own wheel
                    description: '',
                    c3: -4 * Math.PI / 5 + (0 * Math.PI / 6),
                    c4s: 1,
                    c1: -4 * Math.PI / 5 + (2 * Math.PI / 6),
                    c3s: 1,
                    c0: -4 * Math.PI / 5 + (4 * Math.PI / 6),
                    c2s: 1,
                    c2: -4 * Math.PI / 5 + (6 * Math.PI / 6),
                    c1s: 1,
                    c4: -4 * Math.PI / 5 + (8 * Math.PI / 6),
                    c0s: 1,
                },

                {
                    n: 7,
                    m: 'Custom',
                    nc: 5,
                    dr: 0,
                    tri: 0, // even if other options are added, always leave 'Custom' as last choice; dependencies
                    description: '',
                    c0: 0,
                    c0s: 0.8,
                    c1: +2 * Math.PI / 5,
                    c1s: 0.8,
                    c2: -2 * Math.PI / 5,
                    c2s: 0.8,
                    c3: +4 * Math.PI / 5,
                    c3s: 0.8,
                    c4: -4 * Math.PI / 5,
                    c4s: 0.8
                }

            ];

            //color theme drop down variables
            var previouscolorRuleValue = '';
            var lastTheme = colorRules.length;

            ///// variable for camera loader
            // camera functionality (creating a palette from a photo taken with a device) currently removed - TO-DO
            /////

            // some final set up 
            var colorRuleID = 0;
            var lastX, lastY;
            var shadesWheelDirty = false;
            var ctx1, ctx2, ctx3;

            var uiMode = 'hueWheel';

            var hueWheel = $('#hueWheel')[0];
            var slLayer = $('#slLayer')[0];
            var uiLayer = $('#uiLayer')[0];

            var wheelMode = 'RGB';
            var lastWheelMode = 'RGB';


            ////////////////////////////////     INIT FUNCTIONS     ///////////////////////////////////////


            function init() {

                //address canvasses
                ctx1 = hueWheel.getContext('2d');
                ctx2 = uiLayer.getContext('2d');
                ctx3 = slLayer.getContext('2d');

                //draw color circle
                drawRGBHueWheel(ctx1);
                drawSLsquare(ctx3);

                //build UI
                setupcolorRulePage(colorRules);
                inituiLayer();
                attachBindingsToSwatches(); 
                setupColorPaletteListPage(); 
                updateuiLayer();

                //leave here
                drawRGBHueWheelFlipper(ctx3, 31, 328);
                drawSLsquareFlipper(ctx1);


            }

            function attachBindingsToSwatches() {          
                                                                
                for (var i = 0; i < 4; i++) {

                    $('#swatch' + i).addClass('whiteBorder');

                    //attach bindings to swap borders (mouse)
                    $('#swatch' + i).mousedown(function () {

                        for (var j = 0; j < 4; j++) {
                            $('#swatch' + j).removeClass('grayBorder');
                            $('#swatch' + j).addClass('whiteBorder');
                        }

                        $(this).removeClass('whiteBorder');
                        $(this).addClass('grayBorder');

                        swatchClicked(this);
                    });

                    //attach bindings to swap borders (touch)
                    $('#swatch' + i).touchstart(function () {

                        for (var j = 0; j < 4; j++) {

                            $('#swatch' + j).removeClass('grayBorder');
                            $('#swatch' + j).addClass('whiteBorder');

                        }

                        $(this).removeClass('whiteBorder');
                        $(this).addClass('grayBorder');

                        swatchClicked(this);

                    });

                }
            }

            function setupColorPaletteListPage() {                  

                // like Adobe Kuler --- a list of pre-set color themes (up to 5 colors each) that look good together.
                // each one can have a name. this could be pulled from a database.
                // current implementation is hard-coded

                // Set up the HTML

                var str, name, hsl, h, s, l;
                var html, clicked;

                html = "<ul data-role='listview' id='swatchItem'>";
                html += "<li data-role='list-divider'>Preset Themes (Click to load into color wheel):</li>";

                for (var i = 0; i < palettes.length; i++) {

                    str = palettes[i].data,
                    delimiter = ',',
                    colors = str.split(delimiter);

                    name = palettes[i].name;
                    html += "<li data-role='list-divider'><a href='#home'></a>" + name + "</li>"; //list item header

                    html += "<li><a href='#'>"; //begin list item content
                    html += "<span>";
                    for (var j = 0; j < 5; j++) {

                        h = (colors[3 * j] * (180 / Math.PI)).toFixed(0);
                        s = (colors[3 * j + 1] * 100).toFixed(0);
                        l = (colors[3 * j + 2] * 100).toFixed(0);

                        hsl = 'hsl(' + h + ', ' + s + '%, ' + l / 2 + '%)';

                        var t = tinycolor(hsl);
                        var hex = t.toHex();

                        html += "<div class='miniswatch' style ='background-color: #" + hex + "'>" + "</div>";

                    }

                    html += "</span>";
                    html += "</a></li>"; //end list item content

                }

                html += "</ul>";
                
                $("#swatchList").append(html);

                // ATTACH BINDINGS

                $('#swatchItem li').click(function () {

                    clicked = $(this).index() / 2 - 1; /// note this depends on how many text rows there are (li items) above the first real one

                    colorRuleID = palettes[clicked].t;

                    clearSwatches();

                    for (var i = 0; i < 5; i++) {

                        var rgb = $('.swatch:eq(' + i + ')', $(this)).css("background-color");
                        var t = tinycolor(rgb);
                        var hsl = t.toHsl();
                        c[i].h = hsl.h * (Math.PI / 180) - Math.PI / 3;
                        c[i].s = hsl.s;
                        c[i].l = hsl.l * 2;
                        var hex = t.toHex();
                    }

                    drawTriangle = colorRules[colorRuleID].tri;

                    updateuiLayer();

                });


            } 



            function setupcolorRulePage() {


                var html = '';
                var div = $('#colorRulesList');

            
                // ATTACH BINDINGS

                $('#colorRulesList li').click(function () {

                    colorRuleID = $(this).index() - 1;

                    clearSwatches();

                    var i = colorRuleID;

                    //init Color Theme
                    resetSaturation();

                    c[0].h = colorRules[i].c0;
                    c[0].s = colorRules[i].c0s;

                    c[1].h = colorRules[i].c1;
                    c[1].s = colorRules[i].c1s;

                    c[2].h = colorRules[i].c2;
                    c[2].s = colorRules[i].c2s;

                    c[3].h = colorRules[i].c3;
                    c[3].s = colorRules[i].c3s;

                    c[4].h = colorRules[i].c4;
                    c[4].s = colorRules[i].c4s;

                    drawTriangle = colorRules[i].tri;

                    resetLightness(); // done only on Theme change


                    // do we need to activate the monochromatic shades wheel?
                    if (i == 6) {
                        wheelMode = 'Shades';
                        drawShadesColorWheel(ctx1, c[0].h);
                        drawRGBHueWheelFlipper(ctx1, 183, 310);

                        resetHue();


                    } else {

                        wheelMode = lastWheelMode;
                        if (wheelMode == 'Traditional') {
                            drawRYBHueWheel(ctx1);
                        }
                        if (wheelMode == 'RGB') {
                            drawRGBHueWheel(ctx1);
                        }

                    }

                    updateuiLayer();

                });

                $('#colorRulesList').trigger('create');

            }



            function inituiLayer() {


                //event bindings
                uiLayer.addEventListener('mousedown', mouseDown, false);
                uiLayer.addEventListener('touchstart', touchDown, false);
                document.body.addEventListener('touchcancel', touchUp, false);
                //document.getElementById('files').addEventListener('change', loadImageFromDeviceCamera, false);

            }


            ////////////////////////////////     UPDATE FUNCTIONS     ///////////////////////////////////////


            function determineCircle(n, circle) {
                // function runs on each circle on mousedown, to figure out if this is the one the user selected

                if (focused_circle) {
                    return false;
                }

                var y = ctrY - Math.cos(circle.h) * circle.s * maxRadius;
                var x = ctrX - Math.sin(circle.h) * circle.s * maxRadius;

                var dx = lastX - x,
                    dy = lastY - y;

                //check if this is the circle user clicked
                if ((dx * dx) + (dy * dy) < (circle.r * circle.r)) {

                    focused_circle = n;
                    resetColor();
                    c[focused_circle].t = "rgba(255, 255, 255, 1)"; // make the selected circle border white
                    $('#preview' + focused_circle).trigger('mousedown');

                    return false; // in jquery each, this is like break; stops checking future c
                }
            }


            function updateFocusedCircle(position) {


                if (uiMode == 'hueWheel') {

                    if (typeof focused_circle !== "undefined") {

                        var rads = Math.atan2(position.x - cWidth / 2, position.y - cHeight / 2) + Math.PI;

                        if (wheelMode == 'Shades') {

                            // hueWheel is active but we are using a Shades wheel
                            constrainDragOnShadesWheel();

                            var position = (c[focused_circle].h - Math.PI / 6 - Math.PI + 10 * Math.PI) % (2 * Math.PI);
                            var maxposition = (2 * Math.PI) - (2 * Math.PI / 6);
                            var lightness = 100 - (position / maxposition * 100);

                            c[focused_circle].l = lightness;

                        } else

                        { // standard hue wheel

                            // normally at this point we'd be done, but at the top of the circle (0) 
                            // must fix glitches in Analogous constraints  --= TO-DO: check if they are still present

                            if (colorRuleID == 0 || colorRuleID == 1) { // Analogous 5 or 3 

                                if (rads - c[0].h > Math.PI) {

                                    rads = rads - 2 * Math.PI;

                                }
                            }

                        }

                        c[focused_circle].h = rads;

                    }

                }


                if (uiMode == 'slSquare') {
                   // console.log(position);
                    if ((position.x > 90) && (position.x < 270) && (position.y > 90) && (position.y < 270)) {
                        c2[0].s = ((position.x - 90) / 180);
                        c2[0].l = 1 - ((position.y - 90) / 180);
                    }

                }

            }

            function updateFollowers() {

                if (typeof focused_circle !== "undefined") {

                    //update followers	

                    if (colorRuleID === 0) { // Analogous 5

                        if (focused_circle === 0) {

                            c[1].h = c[0].h + dc[1];
                            c[2].h = c[0].h + dc[2];
                            c[3].h = c[0].h + dc[3];
                            c[4].h = c[0].h + dc[4];

                            c[1].s = c[0].s;
                            c[2].s = c[0].s;
                            c[3].s = c[0].s;
                            c[4].s = c[0].s;
                        }

                        if (focused_circle == 1) {

                            c[2].h = c[0].h - (c[1].h - c[0].h);
                            c[3].h = c[0].h + 2 * ((c[1].h - c[0].h));
                            c[4].h = c[0].h - 2 * ((c[1].h - c[0].h));

                            c[0].s = c[1].s;
                            c[2].s = c[1].s;
                            c[3].s = c[1].s;
                            c[4].s = c[1].s;
                        }

                        if (focused_circle == 2) {

                            c[1].h = c[0].h + (c[0].h - c[2].h);
                            c[3].h = c[0].h + 2 * ((c[0].h - c[2].h));
                            c[4].h = c[0].h - 2 * ((c[0].h - c[2].h));

                            dc[1] = c[1].h - c[0].h;

                            c[0].s = c[2].s;
                            c[1].s = c[2].s;
                            c[3].s = c[2].s;
                            c[4].s = c[2].s;
                        }

                        if (focused_circle == 3) {
                            dc[1] = c[1].h - c[0].h;

                            c[0].s = c[3].s;
                            c[1].s = c[3].s;
                            c[2].s = c[3].s;
                            c[4].s = c[3].s;
                        }


                        if (focused_circle == 4) {
                            dc[1] = c[1].h - c[0].h;

                            c[0].s = c[4].s;
                            c[1].s = c[4].s;
                            c[2].s = c[4].s;
                            c[3].s = c[4].s;
                        }

                        //constrain Analogous circle gaps to rules

                        var c0 = c[0].h;
                        var c1 = c[1].h;

                        // note: you only need to check 1, and all the rest can be slaved
                        // check for minimum hue difference

                        if (c1 - c0 < minDistance) {

                            c[1].h = c[0].h + minDistance;
                            c[2].h = c[0].h - minDistance;
                            c[3].h = c[0].h + minDistance * 2;
                            c[4].h = c[0].h - minDistance * 2;

                        } else {

                            if ((c1 - c0) > colorRules[colorRuleID].c1restraint) { // C1 IS OUT OF BOUNDS
                                c[1].h = c[0].h + colorRules[colorRuleID].c1restraint;
                                c[2].h = c[0].h - colorRules[colorRuleID].c2restraint;
                                c[3].h = c[0].h + colorRules[colorRuleID].c3restraint;
                                c[4].h = c[0].h - colorRules[colorRuleID].c4restraint;
                            }
                        }

                    } // end Analogous 5


                    if (colorRuleID == 1) { // Analogous 3

                        if (focused_circle === 0) {

                            c[1].h = c[0].h + dc[1];
                            c[2].h = c[0].h + dc[2];

                            c[1].s = c[0].s;
                            c[2].s = c[0].s;
                        }

                        if (focused_circle == 1) {

                            c[2].h = c[0].h - (c[1].h - c[0].h);

                            c[0].s = c[1].s;
                            c[2].s = c[1].s;
                        }

                        if (focused_circle == 2) {

                            c[1].h = c[0].h + (c[0].h - c[2].h);

                            dc[1] = c[1].h - c[0].h;

                            c[0].s = c[2].s;
                            c[1].s = c[2].s;

                        }


                        //constrain Analogous circle gaps to rules

                        var c0 = c[0].h;
                        var c1 = c[1].h;


                        // note: you only need to check 1, and all the rest can be slaved
                        // check for minimum hue difference

                        if (c1 - c0 < minDistance) {

                            c[1].h = c[0].h + minDistance;
                            c[2].h = c[0].h - minDistance;


                        } else {

                            if ((c1 - c0) > colorRules[colorRuleID].c1restraint) { // C1 IS OUT OF BOUNDS
                                c[1].h = c[0].h + colorRules[colorRuleID].c1restraint;
                                c[2].h = c[0].h - colorRules[colorRuleID].c2restraint;

                            }
                        }

                    } // end Analogous 3    

                    if (colorRuleID == 2) { // Split Complementary

                        if (focused_circle == 0) {

                            c[1].h = c[0].h + colorRules[colorRuleID].c1;
                            c[2].h = c[0].h + colorRules[colorRuleID].c2;
                            c[3].h = c[0].h + colorRules[colorRuleID].c3;

                            c[1].s = c[0].s;
                            c[2].s = c[0].s;
                            c[3].s = c[0].s;
                        }

                        if (focused_circle == 1) {

                            c[0].h = c[1].h - colorRules[colorRuleID].c1;
                            c[2].h = c[0].h + colorRules[colorRuleID].c2;
                            c[3].h = c[0].h + colorRules[colorRuleID].c3;

                            c[0].s = c[1].s;
                            c[2].s = c[1].s;
                            c[3].s = c[1].s;
                        }

                        if (focused_circle == 2) {

                            c[0].h = c[2].h - colorRules[colorRuleID].c2;
                            c[1].h = c[0].h + colorRules[colorRuleID].c1;
                            c[3].h = c[0].h + colorRules[colorRuleID].c3;

                            c[0].s = c[2].s;
                            c[1].s = c[2].s;
                            c[3].s = c[2].s;
                        }

                        if (focused_circle == 3) {

                            c[0].h = c[3].h + colorRules[colorRuleID].c3;
                            c[1].h = c[0].h + colorRules[colorRuleID].c1;
                            c[2].h = c[0].h + colorRules[colorRuleID].c2;

                            c[0].s = c[3].s;
                            c[1].s = c[3].s;
                            c[2].s = c[3].s;
                        }

                    } // end Split Complementary

                    if (colorRuleID == 3) { // Complementary

                        if (focused_circle == 0) {
                            //handle rotation
                            c[1].h = c[0].h + dc[1];
                            c[1].s = c[0].s;
                        }

                        if (focused_circle == 1) {
                            c[0].h = c[1].h + dc[1];
                            c[0].s = c[1].s;

                        }

                    } // end Complementary

                    if (colorRuleID == 4) { // Triadic

                        if (focused_circle == 0) {
                            //handle rotation
                            c[1].h = c[0].h + 2 * Math.PI / 3;
                            c[1].s = c[0].s;
                            c[2].h = c[0].h - 2 * Math.PI / 3;
                            c[2].s = c[0].s;
                        }

                        if (focused_circle == 1) {
                            c[0].h = c[1].h - 2 * Math.PI / 3;
                            c[0].s = c[1].s;
                            c[2].h = c[1].h + 2 * Math.PI / 3;
                            c[2].s = c[1].s;

                        }

                        if (focused_circle == 2) {
                            c[0].h = c[2].h + 2 * Math.PI / 3;
                            c[0].s = c[2].s;
                            c[1].h = c[2].h - 2 * Math.PI / 3;
                            c[1].s = c[2].s;

                        }

                    }

                    if (colorRuleID == 5) { // Rectangle

                        if (focused_circle == 0) {

                            c[1].h = c[0].h + dc[1];
                            c[2].h = c[0].h + dc[2];
                            c[3].h = c[0].h + dc[3];

                            c[1].s = c[0].s;
                            c[2].s = c[0].s;
                            c[3].s = c[0].s;
                        }

                        if (focused_circle == 1) {

                            c[0].h = c[1].h - dc[1];
                            c[2].h = c[0].h + dc[2];
                            c[3].h = c[0].h + dc[3];

                            c[0].s = c[1].s;
                            c[2].s = c[1].s;
                            c[3].s = c[1].s;
                        }

                        if (focused_circle == 2) {

                            c[0].h = c[2].h - dc[2];
                            c[1].h = c[0].h + dc[1];
                            c[3].h = c[0].h + dc[3];

                            c[0].s = c[2].s;
                            c[1].s = c[2].s;
                            c[3].s = c[2].s;
                        }

                        if (focused_circle == 3) {

                            c[0].h = c[3].h - dc[3];
                            c[1].h = c[0].h + dc[1];
                            c[2].h = c[0].h + dc[2];

                            c[0].s = c[3].s;
                            c[1].s = c[3].s;
                            c[2].s = c[3].s;
                        }

                    } // end Rectangle

                    if (colorRuleID == 6) { // Monochromatic

                        $.each(c, function (i) {

                            if (i !== focused_circle) {

                                c[i].s = c[focused_circle].s;

                            }

                        });

                    }

                }

            }

            function constrainDragOnShadesWheel(mousePos) {

                if (typeof focused_circle !== "undefined") { // user is dragging circle

                    //force math to positive numbers
                    var c0h = (c[focused_circle].h + (10 * Math.PI)) % (2 * Math.PI);

                    //if drag is within wedge
                    if (c0h > 5 * Math.PI / 6) {
                        if (c0h < 7 * Math.PI / 6) {
                            // if it's on the right half, push right 
                            if (c0h > 6 * Math.PI / 6) {
                                c[focused_circle].h = 7 * Math.PI / 6;
                            } else {
                                //if it's on the left half, push left
                                c[focused_circle].h = 5 * Math.PI / 6;
                            }
                        }
                    }

                } else

                { // user is dragging HUE changer icon

                    var rads = Math.atan2(mousePos.x - ctrX, mousePos.y - ctrY) + Math.PI;

                    rads = (rads + 10 * Math.PI) % (2 * Math.PI);

                    shadesH = rads;

                    drawShadesColorWheel(ctx1, shadesH);

                    drawRGBHueWheelFlipper(ctx1, 183, 310);

                }

            }

            ///////////////////////////////   EVENT HANDLERS   /////////////////////////////////

            function swatchClicked(e) {
                n = $(e).attr('id').split(/w/)[1];

                last_focused = n;
                focused_circle = n;
                resetColor();
                c[focused_circle].t = "rgba(255, 255, 255, 1)"; // make the selected circle border white
                updateuiLayer();
            }

            function touchDown(e) {

                //paletteSplash.hide();

                if (!e)
                    var e = event;
                lastX = e.targetTouches[0].pageX - $(this).offset().left;
                lastY = e.targetTouches[0].pageY - $(this).offset().top;


                if (wheelMode == 'Shades' && lastX > 150 && lastX < 210 && lastY > 280) {

                    hueSelect = true;

                }

                //user pressed ui switch change of ui mode

                if (lastX < 60 && lastY > 300) {

                    if (uiMode == 'hueWheel') {

                        uiMode = 'slSquare';
                        $('#hueWheel').removeClass('visible').addClass('hidden');
                        $('#slLayer').removeClass('hidden').addClass('visible');
                        drawSLsquare(ctx3);
                        drawRGBHueWheelFlipper(ctx3, 31, 328);

                        c2[0].h = c[last_focused].h;
                        c2[0].s = c[last_focused].s;
                        c2[0].l = c[last_focused].l;

                        updateuiLayer();


                    } else {

                        uiMode = 'hueWheel';
                        $('#hueWheel').removeClass('hidden').addClass('visible');
                        $('#slLayer').removeClass('visible').addClass('hidden');

                        // get relative circle positions to the clicked circle once on mousedown

                        //save color
                        c[last_focused].l = c2[0].l;
                        //c[last_focused].s = c2[0].s;                    

                        dc[1] = c[1].h - c[0].h;
                        dc[2] = c[2].h - c[0].h;
                        dc[3] = c[3].h - c[0].h;
                        dc[4] = c[4].h - c[0].h;

                        updateFollowers();
                        updateuiLayer();
                    }

                } else {

                    if (uiMode == 'hueWheel') {

                        $.each(c, determineCircle);

                        // get relative circle positions to the clicked circle once on mousedown

                        dc[1] = c[1].h - c[0].h;
                        dc[2] = c[2].h - c[0].h;
                        dc[3] = c[3].h - c[0].h;
                        dc[4] = c[4].h - c[0].h;

                    }

                    if (uiMode == 'slSquare') {


                    }

                }


                uiLayer.addEventListener('touchmove', touchMove, true);
                uiLayer.addEventListener('touchend', touchUp, false);

            }

            function mouseDown(e) {

                if (typeof window.orientation === 'undefined') {


                    if (!e)
                        var e = event;

                    lastX = e.pageX - $(this).offset().left;
                    lastY = e.pageY - $(this).offset().top;


                    if (wheelMode == 'Shades' && lastX > 150 && lastX < 210 && lastY > 280) {

                        hueSelect = true;

                    }

                    //user pressed ui switch change of ui mode
                    if (lastX < 60 && lastY > 300) {

                        if (uiMode == 'hueWheel') {

                            uiMode = 'slSquare';
                            $('#hueWheel').removeClass('visible').addClass('hidden');
                            $('#slLayer').removeClass('hidden').addClass('visible');
                            drawSLsquare(ctx3);
                            drawRGBHueWheelFlipper(ctx3, 31, 328);

                            c2[0].h = c[last_focused].h;
                            c2[0].s = c[last_focused].s;
                            c2[0].l = c[last_focused].l;

                            updateuiLayer();


                        } else {

                            uiMode = 'hueWheel';
                            $('#hueWheel').removeClass('hidden').addClass('visible');
                            $('#slLayer').removeClass('visible').addClass('hidden');

                            // get relative circle positions to the clicked circle once on mousedown

                            //save color
                            c[last_focused].l = c2[0].l;

                            dc[1] = c[1].h - c[0].h;
                            dc[2] = c[2].h - c[0].h;
                            dc[3] = c[3].h - c[0].h;
                            dc[4] = c[4].h - c[0].h;

                            updateFollowers();
                            updateuiLayer();
                        }

                    } else {

                        if (uiMode == 'hueWheel') {

                            $.each(c, determineCircle);

                            // get relative circle positions to the clicked circle once on mousedown

                            dc[1] = c[1].h - c[0].h;
                            dc[2] = c[2].h - c[0].h;
                            dc[3] = c[3].h - c[0].h;
                            dc[4] = c[4].h - c[0].h;

                        }

                        if (uiMode == 'slSquare') {


                        }

                    }


                    uiLayer.addEventListener('mousemove', mouseMove, false);
                    document.body.addEventListener('mouseup', mouseUp, false);
                }
            }

            function checkPositionBoundaries(position) {

                if (uiMode == 'hueWheel') {

                    if (typeof focused_circle !== "undefined") {

                        //determine current distance from center of circle (ie: Saturation)
                        var d = Math.sqrt(Math.pow(position.x - 170, 2) + Math.pow(position.y - 170, 2)) / maxRadius;

                        (d < 1) ? c[focused_circle].s = d : c[focused_circle].s = 1; //prohibit saturation from exceeding 1      
                    }

                } else {

                    if (uiMode == 'slSquare') {

                        if (c2[0].s > 1) {
                            c2[0].s = 1;
                        }
                        if (c2[0].l > 1) {
                            c2[0].l = 1;
                        }
                        if (c2[0].s < 0) {
                            c2[0].s = 0;
                        }
                        if (c2[0].l < 0) {
                            c2[0].l = 0;
                        }
                    }
                }
            }

            function mouseMove(e) {

                if (typeof window.orientation === 'undefined') {

                    var mousePos = (getMousePos(uiLayer, e));

                    if (hueSelect) {

                        //user clicked hueChanger

                        constrainDragOnShadesWheel(mousePos);

                    } else {



                        if (lastX < 300 || lastY < 300) {

                            updateFocusedCircle(mousePos);

                            checkPositionBoundaries(mousePos);

                            if (wheelMode == 'Shades') {

                                constrainDragOnShadesWheel(mousePos);

                            }

                            if (uiMode == 'hueWheel') {

                                updateFollowers();

                            }

                        }

                    }

                    updateuiLayer();

                }
            }

            function touchMove(e) {

                var touchPos = (getTouchPos(uiLayer, e));

                if (hueSelect) {

                    //user clicked hueChanger

                    constrainDragOnShadesWheel(touchPos);

                } else {

                    if (lastX < 300 || lastY < 300) {

                        updateFocusedCircle(touchPos);

                        checkPositionBoundaries(touchPos);

                        if (uiMode == 'hueWheel') {

                            updateFollowers();

                        }

                    }

                }

                updateuiLayer();

            }

            function getMousePos(canvas, e) {

                if (!e)

                    var e = event;

                var position = canvas.getBoundingClientRect();

                return {

                    x: e.clientX - position.left,
                    y: e.clientY - position.top

                };
            }


            function getTouchPos(canvas, e) {

                if (!e)

                    var e = event;

                e.preventDefault(); // stop ios screen from scrolling

                var position = canvas.getBoundingClientRect();

                return {

                    x: e.targetTouches[0].clientX - position.left,
                    y: e.targetTouches[0].clientY - position.top

                };

            }


            function touchUp() {

                releaseCircles();

                hueSelect = false;

                uiLayer.removeEventListener('touchmove', touchMove);
                uiLayer.removeEventListener('touchend', touchUp);

                // do some stuff once that was disabled in the 'active drag' move if you're on a mobile device


                if (wheelMode !== 'Shades') {

                    drawSLsquareFlipper(ctx1);

                }

            }


            function mouseUp() {

                releaseCircles();

                hueSelect = false;

                uiLayer.removeEventListener('mousemove', mouseMove);

                document.body.removeEventListener('mouseup', mouseUp);

                // do some stuff once that was disabled in the 'active drag' move if you're on a mobile device


                if (wheelMode !== 'Shades') {

                    drawSLsquareFlipper(ctx1);

                }

            }

            function releaseCircles() {


                if (focused_circle !== undefined) {
                    last_focused = focused_circle;
                }

                focused_circle = undefined;

            }


            function resetColor() {

                $.each(c, function (i) {

                    c[i].t = borderColor;

                });
            }

            function resetSaturation() {

                $.each(c, function (i) {

                    c[i].s = 0.8;

                });
            }

            function resetLightness() {

                $.each(c, function (i) {

                    c[i].l = 1;

                });
            }

            function resetHue() { // called when switching to uiMode: monochromatic shades

                shadesH = c[0].h;

                $.each(c, function (i) {

                    c[i].l = 1 - (c[i].h / (2 * Math.PI) * 100 * 2);

                });
            }


            //////////////////////////////       DRAWING FUNCTIONS          ////////////////////////////////////////

            function updateuiLayer() {

                ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);

                if (uiMode == 'hueWheel') {

                    if (colorRules[colorRuleID].nc > 4) {

                        if (wheelMode !== 'Shades') {

                            drawConnectors(c[4]);

                        }

                        drawCircle(c[4]);
                    }

                    if (colorRules[colorRuleID].nc > 3) {

                        if (wheelMode !== 'Shades') {

                            drawConnectors(c[3]);

                        }

                        drawCircle(c[3]);

                    }

                    if (colorRules[colorRuleID].nc > 2) {

                        if (wheelMode !== 'Shades') {

                            drawConnectors(c[2]);

                        }

                        drawCircle(c[2]);

                    }

                    // currently assumed always at least 2 colors:

                    if (wheelMode !== 'Shades') {

                        drawConnectors(c[1]);

                    }

                    drawCircle(c[1]);

                    if (wheelMode !== 'Shades') {

                        drawConnectors(c[0]);

                    }

                    drawCircle(c[0]);

                    if (typeof window.orientation === 'undefined') {

                        if (wheelMode !== 'Shades') {

                            drawSLsquareFlipper(ctx1);

                        }

                    }

                    if (drawTriangle) {

                        drawLittleTriangle(c[0]);

                    }

                }

                if (uiMode == 'slSquare') {

                    drawCircle(c2[0]);

                }

                if (typeof window.orientation === 'undefined') {


                }

            }

            // for artists or cake decorators

            function drawRYBHueWheel(ctx) {                  // TO-DO!

                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                var radius = 148,
                    thickness = 148,
                    p = {
                        x: 180,
                        y: 180
                    };
                var h, s, l, hsl, h2, s2, l2, h0, s0, l0;
                var steps = RYBwheel.length - 1; // 1 extra was added to complete the color wheel
                var inter = 2 * Math.PI / steps;
                var grad;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(Math.PI);

                for (var i = 0; i < steps; i++) { //pre-defined wedges


                    h = RYBwheel[i * 3];
                    s = RYBwheel[i * 3 + 1];
                    l = RYBwheel[i * 3 + 2] / 2;
                    h2 = RYBwheel[(i + 1) * 3];
                    s2 = RYBwheel[(i + 1) * 3 + 1];
                    l2 = RYBwheel[(i + 1) * 3 + 2] / 2;


                    for (var j = 0; j < 10; j++) { //interpolation

                        ctx.rotate(1.5 * Math.PI / 180);

                        //interpolate
                        h0 = h + (h2 - h) * .1 * j;
                        s0 = s + (s2 - s) * .1 * j;
                        l0 = l + (l2 - l) * .1 * j;

                        if (h0 > 0) {
                            grad = ctx.createLinearGradient(0, radius - thickness, 4, radius);
                            grad.addColorStop(0, 'white');

                            var hsl = 'hsl(' + h0 + ', ' + s0 + '%, ' + l0 + '%)';

                            grad.addColorStop(0.15, hsl);
                            grad.addColorStop(1, hsl);

                            ctx.fillStyle = grad;

                            ctx.fillRect(0, radius - thickness, 4, thickness);
                        }

                    }

                }

                ctx.restore();
            }

            // for computer screen use

            function drawRGBHueWheel(ctx) {

                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                var radius = 148,
                    thickness = 148,
                    p = {
                        x: 180,
                        y: 180
                    },
                    start = 0 - 2 * Math.PI / 3,
                    end = 2 * Math.PI - 2 * Math.PI / 3,
                    step = Math.PI / 90,
                    ang = 0,
                    grad,
                    r = 0,
                    g = 0,
                    b = 0,
                    pct = 0;

                ctx.save();

                ctx.translate(p.x, p.y);

                for (ang = start; ang < end; ang += step) {
                    ctx.save();
                    ctx.rotate(ang);

                    grad = ctx.createLinearGradient(0, radius - thickness, 0, radius);
                    grad.addColorStop(.15, 'white');
                    grad.addColorStop(.15, 'white');

                    h = 360 - (ang - start) / (end - start) * 360;
                    s = '100%';
                    l = '50%';

                    grad.addColorStop(1, 'hsl(' + [h, s, l].join() + ')');

                    ctx.fillStyle = grad;

                    ctx.fillRect(0, radius - thickness, 6, thickness);
                    ctx.restore();
                }

                ctx.restore();
            }

            function drawShadesColorWheel(ctx, h) {

                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                var radius = 148,
                    thickness = 148,
                    p = {
                        x: 180,
                        y: 180
                    },
                    start = 0 + (Math.PI / 6),
                    end = 2 * Math.PI - (Math.PI / 6),
                    step = Math.PI / 120,
                    ang = 0,
                    grad,
                    r = 0,
                    g = 0,
                    b = 0;

                var l = 0;

                h = h * (180 / Math.PI) + hueOffset;

                ctx.save();
                ctx.translate(p.x, p.y);

                for (ang = start; ang < end; ang += step) {

                    ctx.save();
                    ctx.rotate(ang);

                    grad = ctx.createLinearGradient(0, radius - thickness, 0, radius);

                    grad.addColorStop(.2, 'hsl(' + h + ', ' + 0 + '%, ' + l + '%)');
                    grad.addColorStop(.8, 'hsl(' + h + ', ' + 100 + '%, ' + l + '%)');

                    if (ang > Math.PI / 4) {
                        l += Math.PI / 6;
                    }


                    ctx.fillStyle = grad;

                    ctx.fillRect(0, radius - thickness, 6, thickness);
                    ctx.restore();
                }

                ctx.restore();
            }

            function drawRGBHueWheelFlipper(ctx, x, y) {

                var radius = 30,
                    thickness = 30,
                    start = 0 - 2 * Math.PI / 3,
                    end = 2 * Math.PI - 2 * Math.PI / 3,
                    step = Math.PI / 90,
                    ang = 0,
                    grad,
                    r = 0,
                    g = 0,
                    b = 0,
                    pct = 0;

                ctx.save();

                ctx.translate(x, y);

                for (ang = start; ang < end; ang += step) {
                    ctx.save();
                    ctx.rotate(ang);

                    grad = ctx.createLinearGradient(0, radius - thickness, 0, radius);
                    grad.addColorStop(.15, 'white');

                    h = 360 - (ang - start) / (end - start) * 360;
                    s = '100%';
                    l = '50%';

                    grad.addColorStop(1, 'hsl(' + [h, s, l].join() + ')');


                    ctx.fillStyle = grad;

                    ctx.fillRect(0, radius - thickness, 6, thickness);
                    ctx.restore();
                }
                ctx.restore();
            }

            function drawSLsquare(ctx) {

                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                var xOffSet = 90;
                var yOffSet = 90;
                var w = 180;
                var h = 180;
                var hue = (typeof last_focused == "undefined" ? 0 : c[last_focused].h);
                hue = hue * (180 / Math.PI) + hueOffset;
                var s1 = 0;
                var l1 = 100;
                var s2 = 100;
                var l2 = 0;
                var step = w / 100;
                var rectw = w / 100;
                var grad;

                ctx.save();
                for (var i = 0; i < 100; i++) {

                    grad = ctx.createLinearGradient(90, 90, 90, 270);

                    grad.addColorStop(0, 'hsl(' + hue + ', ' + s1 + '%, ' + l1 + '%)');
                    grad.addColorStop(1, 'hsl(' + hue + ', ' + s2 + '%, ' + l2 + '%)');

                    ctx.fillStyle = grad;
                    ctx.fillRect(xOffSet + (i * rectw), yOffSet, 5, h);

                    s1 += 1;
                    l1 -= .5;

                }
                ctx.restore();
            }

            function drawSLsquareFlipper(ctx) {

                var xOffSet = 0;
                var yOffSet = 298;
                var w = 60;
                var h = 60;
                var hue = (typeof last_focused == "undefined" ? 0 : c[last_focused].h);
                hue = hue * (180 / Math.PI) + hueOffset;
                var s1 = 0;
                var l1 = 100;
                var s2 = 100;
                var l2 = 0;
                var step = w / 100;
                var rectw = 1;
                var grad;

                ctx.save();

                for (var i = 0; i < w; i++) {

                    grad = ctx.createLinearGradient(0, 298, 0, 360);

                    grad.addColorStop(0, 'hsl(' + hue + ', ' + s1 + '%, ' + l1 + '%)');
                    grad.addColorStop(1, 'hsl(' + hue + ', ' + s2 + '%, ' + l2 + '%)');

                    ctx.fillStyle = grad;
                    ctx.fillRect(xOffSet + (i * rectw), yOffSet + 0, 3, h);

                    s1 += rectw;
                    l1 -= rectw;

                }
                ctx.restore();
            }


            function clearSwatches() {

                for (var i = 0; i < 5; i++) {

                    themeColors[i] = 'rgb(255, 255, 255)';

                }

            }


            function drawCircle(data) {

                var ctx;
                var h = data.h;
                var s = data.s;
                var l = data.l;
                var r = data.r;

                if (uiMode == 'hueWheel') {

                    var y = ctrY - Math.cos(h) * s * maxRadius;
                    var x = ctrX - Math.sin(h) * s * maxRadius;
                    ctx = ctx1;

                }

                if (uiMode == 'slSquare') {

                    var width = 180;
                    var height = 180;
                    var leftEdge = 90;
                    var topEdge = 90;

                    var x = leftEdge + (s * width);
                    var y = topEdge + height - (l * height);
                    ctx = ctx3;

                }

                ctx2.beginPath();
                ctx2.arc(x, y, r, 0, Math.PI * 2);
                ctx2.lineWidth = 6;
                ctx2.closePath();
                ctx2.strokeStyle = data.t;
                ctx2.stroke();

                if (wheelMode == 'RGB') {
                    // use HSL colors from existing hue data for each circle

                    h = h * (180 / Math.PI) + hueOffset;

                    //constrain h to positive #'s, and 0-360 (not necessary for canvas, but necessary for tinyColor

                    h = h + 36000; //make it positive, tiny color library can only handle 0-360;
                    h = h % 360;
                    s = s * 100;
                    l = (l * (100 - (s / 2)));
                }

                if (wheelMode == 'Traditional') {
                    //use custom data from RYBwheel array and extrapolate it              TO-DO !!






                }

                if (wheelMode == 'Shades') {
                    // use HSL colors from existing hue data for each circle

                    s = s * 100;

                    var position = (data.h - Math.PI / 6 - Math.PI + 10 * Math.PI) % (2 * Math.PI);

                    var maxposition = (2 * Math.PI) - (2 * Math.PI / 6);

                    var l = 100 - (position / maxposition * 100);

                    var h = (((shadesH + (10 * Math.PI)) % (2 * Math.PI)) * (180 / Math.PI) + hueOffset) % 360;

                }

                // color Circle
                var hsl = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';

                ctx2.fillStyle = hsl;
                ctx2.fill();

                //show circle number for troubleshooting

                /*ctx2.font = '20pt Calibri';
                ctx2.fillStyle='black';
                ctx2.fillText(data.id, x-8, y+7);*/


                // export colors 
                var t = tinycolor(hsl);
                themeColors[data.id] = t.toRgbString();
                var hex = t.toHex();
                // so user can see....   
                    
                $('#swatch' + data.id).css('background-color', themeColors[data.id]).text('#' + hex);   
                
                
                themeColorCount = colorRules[colorRuleID].nc;

            }

            function drawConnectors(data) {
                //these are the lines connecting the center point to the circle

                var r = data.r;
                var e = Math.PI - data.h + 12.2 * Math.PI / 10;
                var s = Math.PI - data.h - 2.2 * Math.PI / 10;
                var y = ctrY - Math.cos(data.h) * ((data.s * maxRadius));
                var x = ctrX - Math.sin(data.h) * ((data.s * maxRadius));

                //ctrX and ctrY already defined as center of color wheel
                ctx2.strokeStyle = "rgba(255, 255, 255, 0)";
                ctx2.fillStyle = "rgba(255, 255, 255, 0.5)";
                ctx2.beginPath();
                ctx2.arc(x, y, data.r, e, s, false);
                ctx2.lineTo(ctrX, ctrY);
                ctx2.closePath();
                ctx2.fill();
                ctx2.stroke();


            }

            function drawLittleTriangle(data) {

                //these are the lines connecting the center point to the circle
                var r = data.r;
                var e = Math.PI - data.h + 13 * Math.PI / 10;
                var s = Math.PI - data.h - 3 * Math.PI / 10;
                var y = ctrY - Math.cos(data.h) * ((data.s * maxRadius));
                var x = ctrX - Math.sin(data.h) * ((data.s * maxRadius));

                //ctrX and ctrY already defined as center of color wheel
                ctx2.strokeStyle = "rgba(255, 255, 255, 0)";
                ctx2.fillStyle = "rgba(255, 255, 255, 1)";
                ctx2.beginPath();
                ctx2.arc(x, y, data.r, e, s, false);
                ctx2.lineTo(x, y);
                ctx2.closePath();
                ctx2.fill();
                ctx2.stroke();
            }


            function getMousePos2(e) {

                return {
                    x: e.pageX,
                    y: e.pageY
                };
            }


            init();

        }, false);

    }
};
    
