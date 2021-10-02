const imageDisplayer = document.querySelector("display-wrapper > img");
let clickedImageNumber, viewedImageNumber, sampleClickedImageUrl, originalClickedImageUrl;
let displayerScale = 1;

window.onclick = e => {
    let target = e.target;
    if (target.tagName === "IMG") {

        if (target.hasAttribute("original") === true && target.tagName === "IMG") {
            imageDisplayer.style.transform = "translate3d(0px,0px,0px)";

            yOffset = 0;
            xOffset = 0;
            displayerScale = 1;
            console.log("klikniety obrazek");

            originalClickedImageUrl = target.getAttribute("original");
            sampleClickedImageUrl = target.getAttribute("sample");
            clickedImageNumber = target.getAttribute("number");
            console.log(originalClickedImageUrl);
            imageDisplayer.src = "";
            viewedImageNumber = target.getAttribute("number");

            if (target.getAttribute("sampleBoolean") === "1") {
                imageDisplayer.src = sampleClickedImageUrl;
            } else {
                console.log("nie ma sampla");
                imageDisplayer.src = originalClickedImageUrl;
            }

            loadDetails();

            imageDisplayer.style.backgroundImage = `url("${target.getAttribute("src")}")`;
            imageBlur();

            viewedImage = document.querySelector(`article img[number='${viewedImageNumber}'`);

            document.querySelector("display-wrapper").classList.add("open");
        }
    }

    if (target.tagName === "DISPLAY-WRAPPER") {
        document.querySelector("display-wrapper").classList.remove("open");
    }
};

// thx mdn
function zoom(event) {
    event.preventDefault();
    yOffset = 0;
    xOffset = 0;

    displayerScale += event.deltaY * -0.001;
    
    // Restrict scale
    displayerScale = Math.min(Math.max(.125, displayerScale), 4);
    imageDisplayer.style.transition = "transform .1s, top .2s";
    // Apply scale transform
    imageDisplayer.style.transform = `scale(${displayerScale})`;
    // imageDisplayer.style.transform = `scale(${displayerScale})` + "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
imageDisplayer.onwheel = zoom;

function imageBlur() {
    if (imageDisplayer.src.includes(".gif") === false) {
        imageDisplayer.style.filter = "blur(4px)";
        imageDisplayer.addEventListener("load", popupLoad);
    }
}

function popupLoad() {
    imageDisplayer.style.filter = "blur(0)";
}