<script lang="ts">
    export let href: string;
    export let newtab: boolean = false;
</script>

<a
    {href}
    target={newtab ? "_blank" : ""}
    class={`px-1 pb-2 underline underline-offset-4 hover:bg-maindark hover:text-mainlight hover:decoration-wavy ${$$props.class}`}
>
    <slot />
</a>
