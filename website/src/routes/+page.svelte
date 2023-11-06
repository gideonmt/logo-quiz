<script>
    let answer = "";
    let logoUrl = "";
    let feedback = "";
    let correctAnswer = "";

    fetchRandomLogo();

    async function fetchRandomLogo() {
        const response = await fetch("http://localhost:3000/api/logos/random");
        if (response.ok) {
            const data = await response.json();
            logoUrl = data.url;
            correctAnswer = data.id;
        } else {
            logoUrl = "";
            correctAnswer = "";
        }
    }

    function checkAnswer() {
        if (answer === correctAnswer) {
            feedback = "Correct!";
        } else {
            feedback = "Wrong";
        }
    }

    function nextLogo() {
        answer = "";
        feedback = "";
        correctAnswer = "";
        fetchRandomLogo();
    }
</script>

<main>
    {#if logoUrl}
        <div class="logo-container">
            <img src={logoUrl} alt="Logo" />
        </div>
    {/if}

    <div>
        <input type="text" bind:value={answer} placeholder="Enter Logo ID" />
        <button on:click={checkAnswer}>Check</button>
    </div>

    {#if feedback}
        <p>{feedback}</p>
        {#if feedback === "Wrong"}
            <p>The correct answer is {correctAnswer}</p>
        {/if}
        <button on:click={nextLogo}>Next</button>
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 50px;
    }

    .logo-container {
        width: 300px;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #000;
        border-radius: 5px;
    }

    .logo-container img {
        width: 80%;
        height: auto;
    }

    div {
        margin: 10px;
    }

    input[type="text"] {
        padding: 5px;
        font-size: 16px;
    }

    button {
        padding: 10px 20px;
        background-color: #0078d4;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    p {
        font-size: 18px;
        font-weight: bold;
        margin: 10px 0;
    }
</style>
