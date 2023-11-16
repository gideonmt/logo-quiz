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