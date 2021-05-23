<script>
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'

    let score = atob($page.query.get('score'))
    if (!score) goto('/')
    export let subPath
</script>
<style>

</style>
<main class='px-4 flex flex-col items-center'>
    <h1 class='text-center my-4'>Game Over</h1>
    <div class="flex flex-col items-center p-2 outline">
        <span class='font-semibold'>Score</span>
        <span class='text-4xl p-2 bg-gray-light px-8 rounded'>{score}</span>
    </div>
    <button class='reg self-stretch mt-8' on:click={()=> goto('/game')}>New Game</button>
</main>