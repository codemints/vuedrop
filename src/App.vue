<template>
  <Header />
  <main>
    <article class="[ dropzone ]">
      <div class="[ zone__title ]">
        <h4>Requested</h4>
      </div>
      
      <div class="[ zone__target ]">
        <Card />
      </div>
    </article>
    <article class="[ dropzone ]">
      <div class="[ zone__title ]">
        <h4>In Progress</h4>
      </div>
      
      <div class="[ zone__target ]">

      </div>
    </article>
    <article class="[ dropzone ]">
      <div class="[ zone__title ]">
        <h4>Completed</h4>
      </div>
      
      <div class="[ zone__target ]">

      </div>
    </article>
  </main>
</template>

<script setup>
  import Header from '@comps/Header.vue'
  import Card from '@comps/Card.vue'
</script>

<style lang="scss" scoped>

</style>