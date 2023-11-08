<script>
    import { onMount } from "svelte";

    let answer = "";
    let feedback = "";
    let logoUrl = "";
    let correctAnswer = "";

    async function fetchRandomLogo() {
        const response = await fetch("http://localhost:3000/api/logos/random");
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            logoUrl = data.url;
            correctAnswer = data.id;
        } else {
            console.log("Error fetching logo");
        }
    }

    function checkAnswer() {
        if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
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

    onMount(() => {
        fetchRandomLogo();
    });
</script>

<main>
    {#if logoUrl}
        <div class="logo-container">
            <img src={logoUrl} alt="Logo" />
        </div>
    {/if}

    <div>
        <input type="text" bind:value={answer} placeholder="Enter Logo Name" />
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
    :root {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2% 5%;
        max-width: 650px;
        margin: 0 auto;
        background-color: #222;
        color: #fff;
        font-family: Arial, Helvetica, sans-serif;
    }

    .logo-container {
        width: 80%;
        max-width: 300px;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .logo-container img {
        max-width: 80%;
        height: auto;
    }

    div {
        margin: 10px;
    }

    input[type="text"] {
        padding: 0 10px;
        margin: 0;
        font-size: 16px;
        height: 40px;
    }

    button {
        padding: 10px 20px;
        background-color: #0078d4;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        height: 40px;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    p {
        font-size: 14px;
        margin: 5px 0;
        text-align: center;
    }
</style>
