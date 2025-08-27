const CLOUD_NAME = "ds9ccbdmt";
const UPLOAD_PRESET = "natureview_videos";

const uploadBtn = document.getElementById("uploadBtn");
const videoInput = document.getElementById("videoInput");
const uploadStatus = document.getElementById("uploadStatus");
const videoFeed = document.getElementById("videoFeed");

// Load video feed
function loadFeed() {
    const videos = JSON.parse(localStorage.getItem("videos") || "[]");
    videoFeed.innerHTML = "";
    videos.slice().reverse().forEach(video => {
        const card = document.createElement("div");
        card.classList.add("video-card");
        card.innerHTML = `
            <video controls>
                <source src="${video.url}" type="video/mp4"/>
            </video>
            <p>Uploaded by: ${video.name}</p>
            <button>Like</button> <button>Comment</button>
        `;
        videoFeed.appendChild(card);
    });
}

// Upload video
if (uploadBtn) {
    uploadBtn.addEventListener("click", async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please login to upload videos");
            window.location.href = "login.html";
            return;
        }

        const file = videoInput.files[0];
        if (!file) {
            uploadStatus.textContent = "Select a video";
            return;
        }

        uploadStatus.textContent = "Uploading...";
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.secure_url) {
                const videos = JSON.parse(localStorage.getItem("videos") || "[]");
                videos.push({ url: data.secure_url, name: user.name || user.email });
                localStorage.setItem("videos", JSON.stringify(videos));
                uploadStatus.textContent = "Upload successful!";
                loadFeed();
                // Hide upload section after upload
                document.getElementById("uploadSection").style.display = "none";
                videoInput.value = ""; // clear file input
            } else {
                uploadStatus.textContent = "Upload failed";
            }
        } catch (err) {
            console.error(err);
            uploadStatus.textContent = "Error uploading video";
        }
    });
}

// Load feed on page load
window.addEventListener("DOMContentLoaded", loadFeed);
