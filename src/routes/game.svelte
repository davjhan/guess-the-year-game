<script lang="ts">
	import { goto } from '$app/navigation'
	import { shuffle } from '$lib/utils'
	import allQuestions from '$static/questions.json'
	import NumberTag from '$views/NumberTag.svelte'
	import YearDragger from '$views/YearDragger.svelte'
	import { onMount } from 'svelte'
	import { tweened } from 'svelte/motion'
	import { fly, scale } from 'svelte/transition'

	const initialState = {
		state: 'guess',
		round: 0,
		lives: 100,
		questions: shuffle(allQuestions)
	}
	let { round, lives, questions, state } = initialState
	let animatedLives = tweened(lives, {
		interpolate: (frm, to) => t => Math.floor(frm + ((to - frm) * t))
	})
	let livesLost = 0
	let guess = 1950
	$: question = questions[round]

	onMount(() => {
		enterState()
	})

	function correctGuess() {
		guess = Math.max(Math.min(2021, guess), 1900)
	}

	function next() {
		if (state === 'guess') {
			exitState()
			state = 'review'
			enterState()
			return
		} else if (state === 'review') {
			if (lives > 0) {
				exitState()
				state = 'guess'
				enterState()
			} else {
				goto(`/gameover?score=${ btoa((round).toString()) }`)
				return
			}
		}
	}

	function enterState() {
		switch (state) {
			case 'guess':
				break
			case'review':
				console.log(`year`, question)
				livesLost = Math.abs(question.Year - guess)
				lives = Math.max(0, lives - (livesLost))
				setTimeout(() => animatedLives.set(lives), 2500, {
					duration: livesLost * 50
				})
				break

		}
	}

	function exitState() {
		switch (state) {
			case 'guess':
				break
			case'review':
				round++
				break

		}
	}
</script>

<main class='px-4 flex flex-col w-full'>
    <div class="flex self-end">
        {#key round}
            <div in:scale={{start :1.2, opacity:1}}>
                <NumberTag label='Score' value={round} class='bg-gray-light'/>
            </div>
        {/key}
        {#key $animatedLives}
            <div in:scale={{start :1.2, opacity:1}}>
                <NumberTag label='Lives' value={$animatedLives} class='bg-secondary ml-2'/>
            </div>
        {/key}
    </div>
    <div class="py-8 question flex flex-col justify-center self-stretch" style='min-height: 14rem'>
        <h4 class='text-gray-dark text-center italic mb-2'>In what year did the following happen?:</h4>
        <h1 class='text-center'>{@html questions[round].question}</h1>
    </div>
    <div class="flex self-stretch justify-center">
        <div class="flex items-center ">
            <div class="flex flex-col rounded border-2 border-black p-2  items-center transition-transform disabled:font-black ">
                <label class='text-base' for='guess'>Guess</label>
                {#if state === 'guess'}
                    <input type="number" pattern="[0-9]*"
                           in:scale={{start :1.2, opacity:1}}
                           class='p-1 text-center w-20 appearance-none text-xl bg-gray-light'
                           disabled={state !== 'guess'}
                           on:blur={correctGuess}
                           id='guess'
                           bind:value={guess}
                           placeholder='Year'/>
                {:else}
                      <span class='p-1 text-center w-20 appearance-none text-xl bg-gray-light'>
                      {guess}
                      </span>
                {/if}
            </div>
            {#if state === 'review'}
                <div class="flex flex-col border-2  rounded border-green-700 p-2  items-center ml-2 "
                     in:fly={{delay:500}}>
                    <label for='guess' class='text-base text-green-700'>Answer</label>
                    <span class='p-1 text-center w-20 appearance-none text-xl bg-secondary'>
                      {question.Year}
                </span>
                </div>
            {/if}
        </div>
    </div>

    <div class="flex flex-col my-4 self-stretch h-24 justify-center">
        {#if state === 'guess'}
            <YearDragger bind:guess min={1900} max={2021}/>
        {:else}
            <div class="flex flex-col items-center">
                <span class='font-semibold text-xl' in:fly={{delay:1500}}>Margin of error:
                    <span class='bg-red-100 rounded px-2 py-1 font-bold tabular-nums'>{livesLost}</span>
                    years</span>
                <span class='font-semibold mt-4 text-sm' in:fly={{delay:2000}}>Lives remaining:
                    <span class='bg-secondary rounded px-2 py-1 font-bold text-black tabular-nums'>
                        {$animatedLives}
                    </span>
                </span>
            </div>
        {/if}
    </div>

    <button class='reg self-stretch mt-4' on:click={next}>
        {#if state === 'guess'}
            Confirm
        {:else if state === 'review'}
            Continue
        {/if}
    </button>
</main>