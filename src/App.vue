<template>
  <Header />
  <main>
    <article class="[ dropzone ]">
      <div class="[ zone__title ]">
        <h4>Requested</h4>
      </div>
      
      <div
        @drop.prevent="onDrop($event, 'A', cardA.id)"
        @dragenter="prevent($event)"
        @dragover="prevent($event)"
        ref="cardA"
        id="dropzone__A"
        class="[ zone__target ]">
        <Card
          v-for="item in data"
          key="item.id"
          :card="item.card"
          :date="item.date"
          :title="item.title"
          :id="item.id"
        />
      </div>
    </article>
    <article class="[ dropzone ]">
      <div class="[ zone__title ]">
        <h4>In Progress</h4>
      </div>
      
      <div
        @drop.prevent="onDrop($event, 'B', cardB.id)"
        @dragenter="prevent($event)"
        @dragover="prevent($event)"
        ref="cardB"
        id="dropzone__B"
        class="[ zone__target ]">

      </div>
    </article>
    <article class="[ dropzone ]">
      <div class="[ zone__title ]">
        <h4>Completed</h4>
      </div>
      
      <div
        @drop.prevent="onDrop($event, 'C', cardC.id)"
        @dragenter="prevent($event)"
        @dragover="prevent($event)"
        ref="cardC"
        id="dropzone__C"
        class="[ zone__target ]">

      </div>
    </article>
  </main>
</template>

<script setup>
  import Header from '@comps/Header.vue'
  import Card from '@comps/Card.vue'

  import { ref } from 'vue'
  import { onDrop } from '@/src/composables/helpers'
  import { data } from '@/src/composables/mock-data'

  const cardA = ref(null)
  const cardB = ref(null)
  const cardC = ref(null)

  const prevent = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

</script>

<style lang="scss" scoped>

</style>