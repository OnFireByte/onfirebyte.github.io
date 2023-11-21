<script lang="ts">
    export let href: string;
    export let newtab: boolean = false;
</script>

<a
    {href}
    target={newtab ? "_blank" : ""}
    class={`underline underline-offset-4 hover:text-mainlight hover:bg-maindark decoration-wavy pb-2 px-1 ${$$props.class}`}
>
    <slot />
</a>
