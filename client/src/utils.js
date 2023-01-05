import { saveTrack } from "./spotify";

// Refresh the page
export const refresh = () => {
    window.location.reload();
    return false;
}

// Allows the user to add a song from recommendations page
export const likeTrack = async (id, num) => {
    await saveTrack(id);
    const clickedButton = document.getElementById(id);
    const tableData = document.getElementById(num);
    const addedText = document.createElement("p");
    const node = document.createTextNode("Added!");
    addedText.appendChild(node);
    tableData.appendChild(addedText);
    clickedButton.remove();
}

// Find the least popular song in the top 20 (the users "deepest cut")
export const deepCut = (tracks) => {
    let minPopularity = 100;
    let minTrack;
    for (let i = 0; i < tracks.items.length; i++) {
        if (tracks.items[i].popularity < minPopularity) {
            minPopularity = tracks.items[i].popularity;
            minTrack = tracks.items[i];
        }
    }
    return minTrack;
}