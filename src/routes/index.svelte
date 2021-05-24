<script>
    import { goto } from '$app/navigation'
</script>
<style>
</style>
<main class='p-4 flex flex-col '>
    <h1 class='text-3xl my-16 self-center'>Guess the year game</h1>
    <span class='font-semibold mb-2 self-center'>Instructions</span>
    <p class=''>
        Guess the year that the famous event happened. Answers range between 1900-2021.
    </p>

    <span class='font-semibold mt-8 mb-2 self-center'>Playing Time</span>
    <p class=''>1-2 minutes.</p>
    <button class='self-center reg mt-8' on:click={()=>goto('/game')}>Start game</button>
</main>