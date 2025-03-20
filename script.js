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

 // Function to fetch and parse the JSON file
    function fetchMccData() {
        return fetch('mcc.json')
            .then(response => response.json())
            .then(data => {
                return data.data;
            })
            .catch(error => {
                console.error('Error fetching MCC data:', error);
            });
    }

    // If found you qr code
    function onScanSuccess(decodeText, decodeResult) {
        parsed_url = new URL(decodeText);
        query_params = Object.fromEntries(new URLSearchParams(parsed_url.search));
        mc_value = query_params.mc || null;




        //alert("You Qr is : " + decodeText, decodeResult);
        if(mc_value){
        alert("MCC Code is : " + mc_value);
        // Fetch MCC data and use it
        fetchMccData().then(mccData => {
            if (mccData) {
                const mccEntry = mccData.find(entry => entry['MCC Code'] == mc_value);
                if (mccEntry) {
                    alert("MCC Classification is : " + mccEntry.Classification);
                    if(confirm("Launch UPI App?")) 
                      {
                      document.location = 'upi://pay?pa=UPIID@oksbi&amp;pn=FNAME SNAME K&amp;cu=INR';
                      }
                } else {
                    alert("MCC Classification not found");
                }
            }
        });
        }
        else{
        alert("MCC Code not found in the QR code.");
        }
        //htmlscanner.clear();
        htmlscanner.render();
        }

    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbos: 250,rememberLastUsedCamera: true,showTorchButtonIfSupported: true }
    );
    htmlscanner.render(onScanSuccess);
});
