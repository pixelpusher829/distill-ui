<!-- The menu is teleported to <body>, so a
     scoped rule never reaches it. -->
<SelectContent class="menu">...</SelectContent>

<!-- Workaround 1: an unscoped style block,
     which leaks to the whole app. -->
<style>
.menu {
	border-radius: 9999px;
}
</style>

<!-- Workaround 2: :deep() from a wrapper. It only
     reaches parts rendered inside the wrapper,
     so the teleported menu still misses out. -->
<style scoped>
.picker :deep(.menu) {
	border-radius: 9999px;
}
</style>
