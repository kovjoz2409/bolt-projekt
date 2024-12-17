<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <BNavbar v-b-color-mode="'dark'" toggleable="lg" variant="primary">
    <BNavbarBrand>Bolt</BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav>
        <BNavItem to="/">Termékek</BNavItem>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>

  <RouterView />
</template>
