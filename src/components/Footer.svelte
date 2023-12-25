<script>
    import A from "@/components/A.svelte";
</script>

<div
    class="flex w-full flex-col justify-around gap-8 bg-maindark p-8 text-mainlight print:hidden md:flex-row md:items-center"
>
    <div class="flex flex-col gap-4">
        <a href="/" class="text-3xl font-bold">pkpt.dev_</a>
        <p>All right reserved © by Pakin P.</p>
    </div>
    <div class="grid grid-cols-2 gap-4">
        <h2 class="col-span-2 text-xl font-bold">Contact</h2>
        <p>
            <A newtab href="https://www.linkedin.com/in/pakinput/">LinkedIn</A>
        </p>
        <p>
            <A newtab href="https://github.com/OnFireByte">Github</A>
        </p>
        <p class="col-span-2">
            <A newtab href="mailto: bright.pakin@hotmail.com"
                >bright.pakin@hotmail.com</A
            >
        </p>
    </div>
</div>
