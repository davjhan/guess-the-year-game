<script>
    export let label, value
    let cl
    export { cl as class }
</script>

<div class="flex flex-col items-center div rounded px-3 py-2 {cl}">
    <span class='font-semibold text-xs'>{label}</span>
    <span class='text-lg font-bold'>{value}</span>
</div>