getSchedule();

var IDs = [];

async function getSchedule()
{
    const response = await fetch('/Sched');
    const data = await response.json();
    console.log(data);
    var table = "<table>";


    table += '<tr><td> ID	</td><td> Name</td><td>	Type</td><td>	ClassI Total</td><td>	ClassI Remaining</td><td>	ClassII Total</td><td>	ClassII Remaining</td><td>	ClassIII Total</td><td>	ClassIII Rem</td><td>	Start Day</td><td>	Start Time</td><td>	End Day</td><td>	End Time</td><td>	Starting Station</td><td>	Final Station</td></tr>'; 









    for(item of data)
    {

        table += '<tr>';

        table += '<td>' + item.ID + '</td>';
        table += '<td>' + item.Name + '</td>';
        table += '<td>' + item.Type + '</td>';
        table += '<td>' + item.ClassI_Tot + '</td>';
        table += '<td>' + item.ClassI_Rem + '</td>';
        table += '<td>' + item.ClassII_Tot + '</td>';
        table += '<td>' + item.ClassII_Rem + '</td>';
        table += '<td>' + item.ClassIII_Tot + '</td>';
        table += '<td>' + item.ClassIII_Rem + '</td>';
        table += '<td>' + item.StartDay + '</td>';
        table += '<td>' + item.StartTime + '</td>';
        table += '<td>' + item.EndDay + '</td>';
        table += '<td>' + item.EndTime + '</td>';
        table += '<td>' + item.Start_Station + '</td>';
        table += '<td>' + item.Dest_Station + '</td>';
        IDs.push(item.ID);
        table += '<td><a href="http://localhost:8081/BookingPage.html" onclick="return SendID(' + item.ID + ')" >Book</a></td>';
        
        
        table += '</tr>';
    }
    table += '</table>';

    document.getElementById('tb').innerHTML = table;
}



function SendID(ID)
{
    sessionStorage.setItem("ID", ID);
    return true;
}
