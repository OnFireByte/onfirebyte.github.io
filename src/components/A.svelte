<script lang="ts">
    export let href: string;
    export let newtab: boolean = false;
</script>

<a
    {href}
    target={newtab ? "_blank" : ""}
    class={`px-1 pb-2 underline decoration-wavy underline-offset-4 hover:bg-maindark hover:text-mainlight ${$$props.class}`}
>
    <slot />
</a>
