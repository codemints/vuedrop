<template>
  <Header />
  <main>
    <article class="[ dropzone ]">
      <div class="[ zone__title ]">
        <h4>Requested</h4>
      </div>
      
      <div
        ref="zoneA"
        id="A"
        data-type="droppable"
        data-progress="requested"
        class="zone">

        <Card
          @emitGrab="startDrag($event)"
          v-for="card in getCards(data, 'A')"
          :key="card.id"
          :card="card"
          owner="requested"
        />

      </div>
    </article>
    <article class="[ dropzone ]">
      <div class="[ zone__title ]">
        <h4>In Progress</h4>
      </div>
      
      <div
        ref="zoneB"
        id="B"
        data-type="droppable"
        data-progress="inprogress"
        class="zone">

        <Card
          @emitGrab="startDrag($event)"
          v-for="card in getCards(data, 'B')"
          :key="card.id"
          :card="card"
          owner="inprogress"
        />
        
      </div>

    </article>
    <article class="[ dropzone ]">
      <div class="[ zone__title ]">
        <h4>Completed</h4>
      </div>
      
      <div
        ref="zoneC"
        id="C"
        data-type="droppable"
        data-progress="completed"
        class="zone">
        
        <Card
          @emitGrab="startDrag($event)"
          v-for="card in getCards(data, 'C')"
          :key="card.id"
          :card="card"
          owner="completed"
        />
        
      </div>
    </article>
  </main>
</template>

<script setup>
  import Header from '@comps/Header.vue'
  import Card from '@comps/Card.vue'

  import { ref } from 'vue'
  import { data } from '@scripts/data'
  import { getCards } from '@scripts/helpers'
  import { startDrag } from '@scripts/dragCard'

  const zoneA = ref(null)
  const zoneB = ref(null)
  const zoneC = ref(null)

</script>

<style lang="scss" scoped>

</style>