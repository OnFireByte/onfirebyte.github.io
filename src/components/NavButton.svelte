<script lang="ts">
    export let href: string;
</script>

<a
    {href}
    class="bg-transparent w-fit h-full bg-mainlight hover:bg-maindark hover:text-mainlight px-4 hover:underline underline-offset-4 flex items-center cursor-pointer"
>
    <slot />
</a>
