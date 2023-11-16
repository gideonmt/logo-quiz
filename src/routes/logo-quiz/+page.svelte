<script>
    import { onMount } from "svelte";

    const logos = import.meta.glob("$lib/assets/logos/*.png");
    let answer = "";
    let feedback = "";
    let logoUrl = "";
    let correctAnswer = "";
    let logoIndex = 0;
    let end = false;
    let randomLogos = [];
    let correctCount = 0;
    let correctPercentage = 0;

    const logosArray = [];

    for (const key in logos) {
        if (logos.hasOwnProperty(key)) {
            const name = key
                .replace(/.*\//, "")
                .replace(".png", "");
            const url = key;
            logosArray.push({ name, url });
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    async function randomLogoList() {
        randomLogos = [...logosArray];
        shuffleArray(randomLogos);
    }

    const checkAnswer = () => {
        feedback =
            answer.toLowerCase() === correctAnswer.toLowerCase()
                ? "Correct"
                : "Wrong";
        if (feedback === "Correct") {
            correctCount++;
        }
    };

    const start = async () => {
        end = false;
        correctCount = 0;
        correctPercentage = 0;
        await randomLogoList();
        nextLogo();
    };

    const nextLogo = () => {
        answer = "";
        feedback = "";
        if (logoIndex < randomLogos.length) {
            logoUrl = randomLogos[logoIndex].url;
            correctAnswer = randomLogos[logoIndex].name;
            logoIndex++;
        } else {
            endGame();
        }
    };

    const endGame = () => {
        logoUrl = "";
        feedback = "";
        answer = "";
        logoIndex = 0;
        end = true;
        correctPercentage = Math.round(
            (correctCount / logosArray.length) * 100
        );
    };

    onMount(async () => {
        await start();
    });
</script>

<main>
    <h1>Logo Quiz</h1>
    {#if !end}
        {#if logoUrl}
            <div class="logo-container">
                <img src={logoUrl} alt="Logo" />
            </div>
        {/if}

        <div class="row">
            <input
                type="text"
                bind:value={answer}
                placeholder="Enter Logo Name"
                disabled={feedback}
            />
            <button on:click={checkAnswer} disabled={feedback}>Check</button>
        </div>

        {#if feedback}
            <p>
                {feedback}. {#if feedback === "Wrong"}The correct answer is {correctAnswer}.{/if}
            </p>
            <button on:click={nextLogo}>Next</button>
        {/if}
    {/if}

    {#if end}
        <h2>End of quiz</h2>
        <p>You got {correctPercentage}% correct.</p>
        <button on:click={start}>Restart</button>
    {/if}
</main>
