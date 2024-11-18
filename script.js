document.addEventListener('DOMContentLoaded', function () {

    const apiUrl = "https://buildboard-backend.vercel.app/api/ps/problems";
    let ideas = []; // This will be populated with data from the API

    const generateBtn = document.getElementById('generateBtn');
    const ps = document.getElementById('problem-statement');
    const Desc = document.getElementById('ps-description');
    const categoryDropdown = document.getElementById('category');
    const difficultyDropdown = document.getElementById('difficulty');

    // Function to fetch problem statements from the API
    async function fetchIdeas() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch problem statements");
            }
            ideas = await response.json();

            // Display the first idea on page load
            if (ideas.length > 0) {
                const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
                ps.innerHTML = randomIdea.title || "No title available";
                Desc.innerHTML = randomIdea.description || "No description available";
            } else {
                ps.innerHTML = "No problem statements available.";  
            }
        } catch (error) {
            console.error("Error fetching problem statements:", error);
            ps.innerHTML = "Failed to load problem statements.";
        }
    }

    // Function to generate a new problem statement based on filters
    function ideaGenerator() {
        const selectedCategory = categoryDropdown.value;
        const selectedDifficulty = difficultyDropdown.value;

        // Filter ideas based on the selected category and difficulty
        const filteredIdeas = ideas.filter(idea =>
            (selectedCategory === 'all' || idea.category === selectedCategory) &&
            (selectedDifficulty === 'all' || idea.difficulty === selectedDifficulty)
        );

        // Select a random idea from the filtered list
        const randomIdea = filteredIdeas[Math.floor(Math.random() * filteredIdeas.length)];

        // Display the idea text if any idea is found, otherwise show a message
        ps.innerHTML = randomIdea ? randomIdea.title : "No ideas match the selected criteria.";
        Desc.innerHTML = randomIdea ? randomIdea.description : "";

    }

    // Event listener for the generate button
    generateBtn.addEventListener('click', ideaGenerator);

    // Fetch ideas when the extension is loaded
    fetchIdeas();
});
