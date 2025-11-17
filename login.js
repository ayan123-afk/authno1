console.log("JS Connected - Login Page Via Supabase!");


import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://eajvasggldirerrkhgpc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhanZhc2dnbGRpcmVycmtoZ3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNDcxOTAsImV4cCI6MjA3ODkyMzE5MH0.dxCwtSwEGyU6zDCI8tvDhD5e_AiqJwJ4f1pC7AGvy8A';
const supabase = createClient(supabaseUrl, supabaseKey);

async function userLogin(event) {
    event.preventDefault();
    var userEmail = document.getElementById("userEmail");
    var userPassword = document.getElementById("userPassword");
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(userEmail.value)) {
        alert("Please enter a valid email address!");
        return;
    }

    if (!userEmail.value || !userPassword.value) {
        alert("Please fill in all fields!");
        return;
    }
    const {data: loginData, error: loginError} = await supabase.auth.signInWithPassword({
        email: userEmail.value,
        password: userPassword.value
    });
    if(loginError){
        alert("Login Error: " + loginError.message);
    }else{
        const username = loginData.user.user_metadata.username;
        const userBio = loginData.user.user_metadata.bio;
        alert("Login Successful! Welcome back, " + username + "!\nYour Bio: " + (userBio || "No Bio Available"));
        window.location.href = "index.html";
    }
}

window.userLogin = userLogin;
