

async function cancellation()
{
    var PNR_inp = document.getElementById("PNR_value").value;

    const datasent = {PNR_inp};
    const options = {
        method: 'POST',headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(datasent)
    }

    const responsesent = await fetch('/CancellationPNR', options);
    const return_data = await responsesent.json();
    console.log(return_data);


    document.getElementById("Cancelled").innerHTML = "PNR : " + PNR_inp + " is cancelled.";

}