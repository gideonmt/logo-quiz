<script>
    export async function load({ params }) {
        const dynamicParam = params.yourDynamicParam;
        return { props: { dynamicParam } };
    }
</script>

<main>
    <h1>Logo Quiz</h1>

    <p>
        This is a simple logo quiz. You will be shown a logo and you have to
        guess the name of the company.
    </p>

    <a href="/logo-quiz">Logo quiz</a>
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
    }

    p {
        font-size: 14px;
        margin: 5px 0;
        text-align: center;
    }

    h1 {
        font-size: 24px;
        margin: 5px 0;
        text-align: center;
    }
</style>
