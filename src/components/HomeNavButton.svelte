<script lang="ts">
    export let href: string;
    export let isFixedWidth: boolean | undefined = false;
    export let target: string | undefined = undefined;
</script>

<a
    {href}
    data-astro-prefetch
    class={`group/button
     cursor-pointer
    bg-mainlight bg-transparent text-maindark decoration-wavy
    underline-offset-4 transition-all ease-in-out hover:font-bold
    hover:tracking-wide hover:underline xl:w-36 xl:rounded-md xl:p-2
    xl:pl-0 xl:pr-3 xl:hover:bg-select
    ${isFixedWidth ? "w-36 rounded-md p-2 pl-0 pr-3 hover:bg-select" : "w-fit"}
    ${$$props.class}
    flex
    grow
    justify-center
    sm:justify-start
    sm:text-lg`}
    {target}
>
    <slot />
</a>
