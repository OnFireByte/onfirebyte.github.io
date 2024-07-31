<script lang="ts">
    export let href: string;
</script>

<a
    {href}
    class="h-ful
    group/button xl:hover:bg-select flex w-fit
    cursor-pointer items-center bg-mainlight bg-transparent font-bold
    text-maindark decoration-wavy underline-offset-4 transition-all
    ease-in-out hover:underline xl:w-auto xl:rounded-md xl:p-2 xl:pl-0
    xl:pr-3 xl:hover:font-bold xl:hover:tracking-wide
    "
>
    <slot />
</a>
