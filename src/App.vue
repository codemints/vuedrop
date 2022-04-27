<template>
  <Header />
  <main>
    <article class="[ dropzone ]">
      <div class="[ zone__title ]">
        <h4>Requested</h4>
      </div>
      
      <div
        @drop="onDrop($event, 'A')"
        @dragenter="prevent($event)"
        @dragover="prevent($event)"
        class="[ zone__target ]">
        <Card />
      </div>
    </article>
    <article class="[ dropzone ]">
      <div class="[ zone__title ]">
        <h4>In Progress</h4>
      </div>
      
      <div
        @drop="onDrop($event, 'B')"
        @dragenter="prevent($event)"
        @dragover="prevent($event)"
        class="[ zone__target ]">

      </div>
    </article>
    <article class="[ dropzone ]">
      <div class="[ zone__title ]">
        <h4>Completed</h4>
      </div>
      
      <div
        @drop="onDrop($event, 'C')"
        @dragenter="prevent($event)"
        @dragover="prevent($event)"
        class="[ zone__target ]">

      </div>
    </article>
  </main>
</template>

<script setup>
  import Header from '@comps/Header.vue'
  import Card from '@comps/Card.vue'
  import { onDrop } from '@/src/composables/helpers'
  // import { data } from '@/src/composables/data-state'

  const prevent = (e) => {
    e.preventDefault()
    
    e.dataTransfer.dropEffect = 'move'
  }

</script>

<style lang="scss" scoped>

</style>