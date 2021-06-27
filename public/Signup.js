

async function SignUp()
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

    const responsesent = await fetch('/Signup', options);
    const return_data = await responsesent.json();
    console.log(return_data);

    const sign = document.getElementById('Signed');
    sign.style.display = flex;
}