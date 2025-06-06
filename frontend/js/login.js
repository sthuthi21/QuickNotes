const formMsg = document.getElementById("formMsg");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    formMsg.textContent = "";
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        const res = await fetch("http://localhost:5000/api/auth/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email,password}),
        });

        const data = await res.json();
        console.log("Server Response:", data);

        if(res.ok){
            formMsg.textContent = "Login Successful";
            //saving token in localstorage
            localStorage.setItem("token", data.token);
            //redirecting to notes
            setTimeout(() => {
                window.location.href = "notes.html";
            }, 1000);
        }else{
            formMsg.textContent = data.message || "LOGIN FAILED ! TRY AGAIN.";
        }
    }catch (err){
        console.error("Error:",err);
        formMsg.textContent = "Something went wrong . Please try again.";
    }
})