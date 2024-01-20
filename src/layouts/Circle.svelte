<script lang="ts">
    export let size: number;
    export let top: number | null = null;
    export let right: number | null = null;
    export let bottom: number | null = null;
    export let left: number | null = null;

    $: style = `
        width: ${size}px;
        height: ${size}px;
        top: ${top ? `calc(${top} - ${size / 2}px)` : "auto"};
        right: ${right ? `calc(${right} - ${size / 2}px)` : "auto"};
        bottom: ${bottom ? `calc(${bottom} - ${size / 2}px)` : "auto"};
        left: ${left ? `calc(${left} - ${size / 2}px)` : "auto"};
    `;
</script>

<div class={`${$$props.class} absolute -z-10 mix-blend-multiply`} {style}></div>
