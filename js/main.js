document.addEventListener("mousemove", function(e) {
    document.body.style.backgroundPosition = 
        e.pageX / 100 + "px " + e.pageY / 100 + "px";
});