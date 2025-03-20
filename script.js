// script.js file

function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {

    // If found you qr code
    function onScanSuccess(decodeText, decodeResult) {
        parsed_url = new URL(decodeText);
        query_params = Object.fromEntries(new URLSearchParams(parsed_url.search));
        mc_value = query_params.mc || null;
        alert("MCC is : " + mc_value);

        //alert("You Qr is : " + decodeText, decodeResult);

    }

    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbos: 250,rememberLastUsedCamera: true,showTorchButtonIfSupported: true }
    );
    htmlscanner.render(onScanSuccess);
});
