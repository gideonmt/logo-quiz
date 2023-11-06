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
        padding: 2% 5%;
        max-width: 650px;
        margin: 0 auto;
    }

    .logo-container {
        width: 80%;
        max-width: 300px;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #000;
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
        padding: 10px;
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
        font-size: 14px;
        margin: 5px 0;
        text-align: center;
    }
</style>
