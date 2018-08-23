import MathCanvas from './MathCanvas/MathCanvas.js';

document.addEventListener("DOMContentLoaded", function() {
    var container = document.querySelector(".mathCanvasContainer");
    
    var options = {
        template: {
            name: "Math Canvas"
        }
    };

    window.app = new MathCanvas(container, options);
    
});
