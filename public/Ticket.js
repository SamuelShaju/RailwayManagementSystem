async function makeTicket()
{
    console.log(Train);
    console.log(Stops);

    const name = document.getElementById('name_input').value;
    const num = document.getElementById('number_input').value;
    const start_stat = document.getElementById('Start_input').value;
    const stop_stat = document.getElementById('Stop_input').value;
    const privilege = document.getElementById('Privilage_input').value;
    const classinp = document.getElementById('Class_input').value;

    const response = await fetch('/SendStats');
    const data = await response.json();

    var start_dist;
    var stop_dist;
    for(item of data)
    {
        if(start_stat == item.Name)
        {
            start_dist = item.Dist;
        }
        if(stop_stat == item.Name)
        {
            stop_dist = item.Dist;
        }
    }

    const dist = stop_dist - start_dist;
    console.log(dist);


    const datasent = {ID, name, num, start_stat, stop_stat, privilege, classinp};
    const options = {
        method: 'POST',headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(datasent)
    }

    const responsesent = await fetch('/TicketData', options);
    const return_data = await responsesent.json();
    console.log(return_data);



    const datasent2 = {ID, classinp};
    const options2 = {
        method: 'POST',headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(datasent2)
    }



    var ticket = "<table id=\"TicketTable\">    <tr><td colspan=3>Name: " + name + "</td></tr>    <tr><td colspan=2>From: " + start_stat + "</td><td>To: " + stop_stat + "</td></tr>    <tr><td>Number of Passengers: " + num + "</td><td>Privilage: " + privilege + "</td><td>Class: " + classinp + "</td></tr><tr><td colspan=3>PNR : " + return_data._id + "</td></tr></table>";
    var Ticket_div = document.getElementById("Ticket").innerHTML = ticket;

}

