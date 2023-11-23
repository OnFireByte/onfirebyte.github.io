<script lang="ts">
    export let href: string;
</script>

<a
    {href}
    class="h-ful flex w-fit cursor-pointer items-center bg-mainlight bg-transparent px-4 font-bold text-maindark decoration-wavy underline-offset-4 transition-all ease-in-out hover:underline"
>
    <slot />
</a>
