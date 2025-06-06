const formMsg = document.getElementById("formMsg");

registerForm.addEventListener("submit" , async (e) =>{
    e.preventDefault();

    //clear previous message
    formMsg.textContent = "";
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        const res = await fetch("http://localhost:5000/api/auth/register",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name,email,password}),
        });

        const data = await res.json();
        console.log("Server Response:" , data);

        if(res.ok){
            formMsg.textContent = "Registration successful!! Redirecting to login...";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        }else{
            formMsg.textContent = data.message;
        }
    } catch (err){
        console.error("Error:", err);
        formMsg.textContent = "Something went wrong. Please try again.";
    }
});

