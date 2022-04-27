<template>
  <div class="tooltip">
    <p>{{ text }}</p>
  </div>
</template>

<script setup>
  const props = defineProps(['text'])

</script>

<style lang="scss" scoped>
  @use '@scss/main.scss' as *;

  $radius: 0.5rem;

  .tooltip {
    position: absolute;
    top: -200%;
    left: 50%;
    transform: translateX(-50%);
    
    color: white;
    font-size: 1.05rem;
    font-family: $fontBody;
    white-space: nowrap;
    
    background-color: $vueBlue;
    border-radius: $radius;
    
    padding-inline: 1rem;
    padding-block: 0.25rem;


    &:after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 0.5rem;
      border-style: solid;
      border-color: $vueBlue transparent transparent transparent;
    }
  }
</style>