<template lang="pug">
  div
    b-sidebar#sidebar-right(title="Sidebar" right shadow)
      div.px-3.py-2
        router-link(to='/workbooks-home')
          | Home
        router-link(to='/workbooks-home')
          | About
        router-link(to='/workbooks-home')
          | Home
</template>
