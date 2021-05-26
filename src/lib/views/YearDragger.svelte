<script>
    export let guess, min, max
    let cl
    export { cl as class }
    let dragHandle, sliderBar, helpText
    let isDragging

    function handleDragEnter(e) {
        isDragging = true
        helpText.style.visibility = 'hidden'
        e.preventDefault()
    }

    function handleMouseMove(e) {
        if (isDragging) {
            if (e.type === 'touchmove') {
                e.stopPropagation()
                e.preventDefault()
            }
            const cursorX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX
            const sliderBounds = sliderBar.getBoundingClientRect()
            const unboundedPercent = (cursorX - sliderBounds.left) / (sliderBar.offsetWidth - 8)
            const boundedPercent = Math.min(Math.max(unboundedPercent, 0), 1)
            guess = min + Math.round((max - min) * boundedPercent)
        }
    }

    $: {
        if (dragHandle && guess >= min && guess <= max) {
            const percent = (guess - min) / (max - min)
            dragHandle.style.left = `calc(${100 * percent}% - ${32}px)`
        }
    }

    function slideBarClick(e) {
        isDragging = true
        e.preventDefault()
        const cursorX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX
        const sliderBounds = sliderBar.getBoundingClientRect()
        const unboundedPercent = (cursorX - sliderBounds.left) / (sliderBar.offsetWidth - 8)
        const boundedPercent = Math.min(Math.max(unboundedPercent, 0), 1)
        guess = min + Math.round((max - min) * boundedPercent)
    }

    function handleDragExit() {
        isDragging = false
        helpText.style.visibility = 'visible'
    }

</script>
<svelte:body on:mouseleave={handleDragExit} on:mousemove={handleMouseMove} on:mouseup={handleDragExit}
             on:touchend={handleDragExit}
             on:touchmove={handleMouseMove}/>
<div class="{cl} flex flex-col flex-grow mx-4 ">

    <div class="relative">
        <span class='absolute -left-2 font-semibold text-sm'>{min}</span>
        <span class='absolute -right-2 font-semibold text-sm'>{max}</span>
    </div>
    <div class="relative mt-8 h-12 select-none cursor-pointer" on:mousedown={slideBarClick}
         on:touchstart={slideBarClick}>
        <div class="bg-black w-2 h-2 rounded-full absolute" style='top:-3px'></div>
        <div class="bg-black w-2 h-2 rounded-full absolute right-0" style='top:-3px'></div>
        <div class="relative mx-1">
            <div bind:this={sliderBar} class='absolute w-full py-2 -top-2'
                 id='slider-base'
            >
                <div class="border-b-2 border-black"></div>
            </div>
            <img alt='drag-handle' bind:this={dragHandle} class='drag absolute op-1.5 p-4 pt-2 select-none' draggable=false
                 id='drag-handle' src='/dragHandle.svg'
                 width='64px'

            />
        </div>
    </div>

    <span bind:this={helpText} class='text-xs self-center  text-gray italic select-none'>Drag slider or type
        answer</span>
</div>