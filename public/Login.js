

async function Login()
{
    const userID = document.getElementById('LoginID').value;
    const pass = document.getElementById('Password').value;

    const datasent = {userID, pass};
    const options = {
        method: 'POST',headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(datasent)
    }

    const responsesent = await fetch('/LoginVal', options);
    const return_data = await responsesent.json();
    console.log("returned", return_data);

    if(return_data.status=='error')
    {
        window.alert("Invalid Credential.\nCheck your credentials and try again.");
        return false;
    }
    if(return_data.status=='success')
    {
        window.location.href = "http://localhost:8081/Home.html";
        return true;
    }
}