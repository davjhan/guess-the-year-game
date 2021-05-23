<script>
    export let label, value
    let cl
    export { cl as class }
</script>

<div class="flex items-center div rounded px-3 py-2 {cl}">
    <span class='font-semibold text-sm'>{label}</span>
    <span class='text-sm font-bold ml-2'>{value}</span>
</div>