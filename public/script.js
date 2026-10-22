const mood = document.getElementById("mood");

const generateButton = document.getElementById("generateButton");

const result = document.getElementById("result");

generateButton.addEventListener("click", async () => {

    result.innerText = "Thinking...";

    const selectMood = mood.value;

    console.log(selectMood);

    const response = await fetch("/journal-prompt", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            mood: selectMood
        })
    });

    const data = await response.json();

    result.textContent = data.prompt;
});