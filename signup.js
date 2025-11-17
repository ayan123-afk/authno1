console.log("JS Connected - Signup Page Via Supabase!");

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://eajvasggldirerrkhgpc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhanZhc2dnbGRpcmVycmtoZ3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNDcxOTAsImV4cCI6MjA3ODkyMzE5MH0.dxCwtSwEGyU6zDCI8tvDhD5e_AiqJwJ4f1pC7AGvy8A';
const supabase = createClient(supabaseUrl, supabaseKey);

async function userSignup(event) {
    event.preventDefault();

    var userName = document.getElementById("userName").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userConfirmPassword = document.getElementById("userConfirmPassword").value;
    var userBio = document.getElementById("userBio").value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userName || !userEmail || !userPassword || !userConfirmPassword || !userBio) {
        alert("Please fill in all fields!");
        return;
    }
    if (!emailRegex.test(userEmail)) {
        alert("Please enter a valid email address!");
        return;
    }
    if (userPassword !== userConfirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword,
        options: {
            data: {
                username: userName,
                bio: userBio
            }
        }
    });
    if (signUpError) {
        console.log("Signup Error:", signUpError.message);
        alert("Error during signup: " + signUpError.message);
    } else {
        console.log("Signup Successful:", signUpData);
        alert("Signup successful! Please check your email to confirm your account.");
    }
};

window.userSignup = userSignup;
