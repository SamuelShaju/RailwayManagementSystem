getID();



var ID = sessionStorage.getItem("ID");
console.log(ID,typeof(ID));
var Train;
var Stops;

//Display Train ID
var head_p = document.getElementById('head_p').innerHTML = "Train ID  :" + ID;

async function getID()
{
    //Get Schedule
    const reponse = await fetch('/Sched');
    const data = await reponse.json();

    if(ID != undefined)
    {
        //Get Train from ID
        for(item of data)
        {
            if(item.ID == ID)
            {
                Train = item;
                break;
            }
        }


        //Get Stops from server database
        const response_stops = await fetch('/SendStops');
        const data_stops = await response_stops.json();

        for(item of data_stops)
        {
            if(Train.ID == item.ID)
            {
                Stops = item.Stats;
                Stops = Stops.split("\\");
            }
        }


        document.getElementById('Stop').innerHTML = ""


        var data_Start = "";
        for(item of Stops)
        {
            data_Start = data_Start + "<option value=" + item + ">";
        }

        document.getElementById('Start').innerHTML = data_Start;

        var data_stop = "";
        for(item of Stops)
        {
            data_stop = data_stop + "<option value=" + item + ">";
        }

        document.getElementById('Stop').innerHTML = data_stop;

    }
    else if(ID==undefined || ID==null)
    {
        document.getElementById('Train').innerHTML = 'Please Choose Train From Schedule';
    }



    

}//End of getID()