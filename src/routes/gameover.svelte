<script context="module">
    export const prerender = true;
</script>
<script>
    import { goto } from '$app/navigation'
    import { page } from '$app/stores'

    let score = atob($page.query.get('score'))
    if (!score) goto('/')
    export let subPath
    const ranks = [
        { grade: 'So bad, it\'s good', atLeast: 0, description: 'It\'s hard to get a score this low on purpose.' },
        { grade: 'Absolutely Terrible', atLeast: 2, description: 'You should be embarrassed.' },
        { grade: 'Very Bad', atLeast: 4, description: 'It\'s very bad.' },
        { grade: 'Bad', atLeast: 5, description: 'It\'s very bad.' },
        { grade: 'Decent', atLeast: 7, description: 'It\'s an ok score.' },
        { grade: 'Not Bad', atLeast: 9, description: 'Not bad, but you can do better.' },
        { grade: 'Average', atLeast: 10, description: 'You should feel satisfied with this score.' },
        { grade: 'Above Average', atLeast: 11, description: 'This was my personal high score.' },
        { grade: 'Good', atLeast: 12, description: 'Quite good. You can close the tab now.' },
        { grade: 'Great', atLeast: 15, description: 'This is very impressive.' },
        { grade: 'Excellent', atLeast: 20, description: 'Well done! This is the third highest grade.' },
        { grade: 'Superb', atLeast: 25, description: 'Well done! This is the second highest grade.' },
        { grade: 'Perfect', atLeast: 30, description: 'This is the highest grade. You probably cheated.' },
    ]

    function getRank(s) {
        if (s < ranks[0].atLeast) {
            return ranks[0]
        }
        for (let i = 0; i < ranks.length; i++) {
            if (i === ranks.length - 1) {
                return ranks[i]
            }
            if (s >= ranks[i].atLeast && s < ranks[i + 1].atLeast) {
                return ranks[i]
            }
        }
    }
    const rank = getRank(score)
</script>
<style>

</style>
<main class='px-4 flex flex-col items-center'>
    <h1 class='text-center my-4'>Game Over</h1>
    <div class="flex flex-col items-center p-2 outline">
        <span class='font-semibold'>Score</span>
        <span class='text-4xl p-2 bg-gray-light px-8 rounded'>{score}</span>
    </div>
    <span class='text-xl text-center mt-8 '>Grade:
        <span class='font-semibold bg-secondary py-2 px-4 rounded'>{rank.grade}</span></span>
    <p class='text-center mt-2'>{rank.description}</p>
    <button class='reg self-stretch mt-8' on:click={()=> goto('/game')}>New Game</button>
</main>