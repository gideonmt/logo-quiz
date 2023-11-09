<script>
    import { onMount } from "svelte";

    const logos = import.meta.glob("$lib/assets/logos/*.png");
    let answer = "";
    let feedback = "";
    let logoUrl = "";
    let correctAnswer = "";
    let oldLogos = [];

    const logosArray = [];

    for (const key in logos) {
        if (logos.hasOwnProperty(key)) {
            const name = key
                .replace("/src/lib/assets/logos/", "")
                .replace(".png", "");
            const url = key;
            logosArray.push({ name, url });
        }
    }

    async function getRandomLogo() {
        const randomIndex = Math.floor(Math.random() * logosArray.length);
        const randomLogo = logosArray[randomIndex];
        logoUrl = randomLogo.url;
        correctAnswer = randomLogo.name;
    }

    const checkAnswer = () => {
        feedback =
            answer.toLowerCase() === correctAnswer.toLowerCase()
                ? "Correct"
                : "Wrong";
    };

    const nextLogo = () => {
        if (oldLogos.length === logosArray.length) {
            oldLogos = [];
        }

        if (logoUrl) {
            oldLogos.push(logoUrl);
        }

        getRandomLogo();

        while (oldLogos.includes(logoUrl)) {
            if (oldLogos.length === logosArray.length) {
                oldLogos = [];
            }
            getRandomLogo();
        }

        answer = "";
        feedback = "";
    };

    onMount(async () => {
        nextLogo();
    });
</script>

<main>
    <h1>Logo Quiz</h1>
    {#if logoUrl}
        <div class="logo-container">
            <img src={logoUrl} alt="Logo" />
        </div>
    {/if}

    <div class="row">
        <input type="text" bind:value={answer} placeholder="Enter Logo Name" />
        <button on:click={checkAnswer}>Check</button>
    </div>

    {#if feedback}
        <p>
            {feedback}. {#if feedback === "Wrong"}The correct answer is {correctAnswer}.{/if}
        </p>
        <button on:click={nextLogo}>Next</button>
    {/if}
</main>

<style>
    main {
        background-color: #121212;
        color: #fff;
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
        border-radius: 10px;
        max-width: 400px;
        margin: 0 auto;
    }

    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    .logo-container {
        max-width: 300px;
        width: 300px;
        height: 300px;
        border: 2px solid #fff;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        background-color: #eee;
    }

    div.row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #333;
        color: #fff;
        outline: 2px solid #555;
        border: none;
        border-radius: 10px;
        padding: 5px 10px;
        height: 50px;
        margin: 10px 0;
    }

    img {
        width: 200px;
    }

    input[type="text"] {
        padding: 0;
        font-size: 16px;
        border: 2px solid #ccc;
        border-radius: 5px;
        width: 70%;
    }

    button {
        padding: 10px 20px;
        background-color: #0063cd;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        height: 40px;
    }

    button:hover {
        background-color: #007bff;
    }

    p {
        font-size: 18px;
        margin: 10px 0;
    }

    :root {
        background-color: #121212;
        color: #fff;
    }

    input[type="text"] {
        background-color: #333;
        color: #fff;
        border: none;
        height: 20px;
    }

    input[type="text"],
    button {
        margin: 0;
    }

    :focus {
        outline: none;
    }
</style>
