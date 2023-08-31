<script lang="ts">
    export let href: string;
</script>

<a
    {href}
    class="bg-transparent w-fit h-ful font-bold bg-mainlight px-4 hover:underline decoration-wavy underline-offset-4 flex items-center cursor-pointer transition-all ease-in-out"
>
    <slot />
</a>
