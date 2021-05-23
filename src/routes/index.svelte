<script>
    import { goto } from '$app/navigation'
</script>
<style>
</style>
<main class='p-4 flex flex-col items-center'>
    <h1 class='text-3xl mb-8'>Guess the year game.</h1>
    <img alt="" class='w-72 ' src="main.png">

    <span class='font-semibold'>Instructions</span>
    <p class='text-center'>Guess the year that the famous event happened.</p>
    <button class='self-center reg mt-8' on:click={()=>goto('/game')}>Okay, lets play</button>
</main>