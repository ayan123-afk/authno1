console.log("JS Connected - Profile + Image Upload!");

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://eajvasggldirerrkhgpc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhanZhc2dnbGRpcmVycmtoZ3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNDcxOTAsImV4cCI6MjA3ODkyMzE5MH0.dxCwtSwEGyU6zDCI8tvDhD5e_AiqJwJ4f1pC7AGvy8A';
const supabase = createClient(supabaseUrl, supabaseKey);


async function getUserProfile() {

    var userName = document.getElementById("userName");
    var userEmail = document.getElementById("userEmail");
    var userBio = document.getElementById("userBio");
    var profilePic = document.getElementById("profilePic");

    const { data: loginData, error } = await supabase.auth.getUser();

    if (error) {
        console.log(error);
        return;
    }

    const username = loginData.user.user_metadata.username;
    const email = loginData.user.email;
    const bio = loginData.user.user_metadata.bio;
    const imgUrl = loginData.user.user_metadata.profileImage;

    userName.textContent = username;
    userEmail.textContent = email;
    userBio.textContent = bio || "No bio available";

    if (imgUrl) {
        profilePic.src = imgUrl;
    }
}

getUserProfile();

async function uploadImage() {

    const fileInput = document.getElementById("userImage");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image!");
        return;
    }

    const filePath = "profilePics/" + Date.now() + "-" + file.name;

    const { data, error } = await supabase.storage
        .from("user_media")
        .upload(filePath, file);

    if (error) {
        alert("Upload error: " + error.message);
        return;
    }
    const { data: urlData } = supabase.storage
        .from("user_media")
        .getPublicUrl(filePath);

    const imageUrl = urlData.publicUrl;

    const { error: updateError } = await supabase.auth.updateUser({
        data: {
            profileImage: imageUrl
        }
    });

    if (updateError) {
        alert("Metadata update error: " + updateError.message);
        return;
    }

    alert("Image Uploaded!");
    document.getElementById("profilePic").src = imageUrl;
}

window.uploadImage = uploadImage;
