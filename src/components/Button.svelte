<script lang="ts">
    export let invert = false;

    export let ghost = false;

    let style = "rounded";

    if (ghost) {
        style +=
            " bg-transparent p-2 bg-mainlight hover:bg-maindark hover:text-mainlight";
    } else {
        style += " border-maindark border-2";
        if (invert) {
            style +=
                " bg-maindark text-mainlight hover:bg-mainlight hover:text-maindark";
        } else {
            style +=
                " bg-mainlight text-maindark hover:bg-maindark hover:text-mainlight";
        }
    }
</script>

<button class={`${style} ${$$restProps.class}`}>
    <slot />
</button>
