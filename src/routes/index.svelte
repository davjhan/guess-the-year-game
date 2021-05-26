<script context="module">
    export const prerender = true;
</script>
<script>
    import { goto } from '$app/navigation'

    const github = 'https://github.com/davjhan/guess-the-year-game'
</script>
<style>
</style>
<svelte:head>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
</svelte:head>
<main class='p-4 flex flex-col '>
    <div class="inline-flex items-start mt-2 self-end ">
        <a href={github} class='ml-1 mr-2 underline text-gray-dark text-sm'>Github</a>
        <!-- Place this tag where you want the button to render. -->
        <!-- Place this tag where you want the button to render. -->
        <a class="github-button" href={github}  data-show-count="true"
           aria-label="Star davjhan/guess-the-year-game on GitHub">Star</a>
    </div>
    <h1 class='text-3xl self-center my-16 '>Guess the year game</h1>

    <span class='font-semibold mb-2'>Instructions</span>
    <p class='ml-4'>
        Guess the year that the famous event happened. Answers range between 1900-2021.
    </p>

    <span class='font-semibold mt-8 mb-2 '>Playing Time</span>
    <p class='ml-4'>1-2 minutes.</p>
    <button class='self-center reg mt-8' on:click={()=>goto('/game')}>Start game</button>

</main>