<template>
  <Header />
  <main>
    <article class="[ dropzone ]">
      <div class="[ zone__title ]">
        <h4>Requested</h4>
      </div>
      
      <div
        @drop.prevent="onDrop($event, 'A', zoneA.id, data)"
        @dragenter="prevent($event)"
        @dragover="prevent($event)"
        ref="zoneA"
        id="dropzone__A"
        data-owner="requested"
        class="[ zone__target ]">

        <Card
          v-for="item in getCardItems('A', data)"
          key="item.id"
          :item="item"
          :card="item.owner"
          :requestDate="item.requestDate"
          :title="item.title"
          :dataID="item.id"
          :dropZone="zoneA"
          :dataObj="data"
          initialClass="requested"
        />

      </div>
    </article>
    <article class="[ dropzone ]">
      <div class="[ zone__title ]">
        <h4>In Progress</h4>
      </div>
      
      <div
        @drop.prevent="onDrop($event, 'B', zoneB.id, data)"
        @dragenter="prevent($event)"
        @dragover="prevent($event)"
        ref="zoneB"
        id="dropzone__B"
        data-owner="progress"
        class="[ zone__target ]">

        <Card
          v-for="item in getCardItems('B', data)"
          key="item.id"
          :item="item"
          :card="item.owner"
          :requestDate="item.requestDate"
          :title="item.title"
          :dataID="item.id"
          :dropZone="zoneB"
          :dataObj="data"
          initialClass="progress"
        />

      </div>
    </article>
    <article class="[ dropzone ]">
      <div class="[ zone__title ]">
        <h4>Completed</h4>
      </div>
      
      <div
        @drop.prevent="onDrop($event, 'C', zoneC.id, data)"
        @dragenter="prevent($event)"
        @dragover="prevent($event)"
        ref="zoneC"
        id="dropzone__C"
        data-owner="completed"
        class="[ zone__target ]">

        <Card
          v-for="item in getCardItems('C', data)"
          key="item.id"
          :item="item"
          :card="item.owner"
          :requestDate="item.requestDate"
          :title="item.title"
          :dataID="item.id"
          :dropZone="zoneC"
          :dataObj="data"
          initialClass="completed"
        />

      </div>
    </article>
  </main>
</template>

<script setup>
  import Header from '@comps/Header.vue'
  import Card from '@comps/Card.vue'

  import { ref } from 'vue'
  import { onDrop, getCardItems } from '@/src/composables/helpers'
  import { data } from '@/src/composables/mock-data'

  const zoneA = ref(null)
  const zoneB = ref(null)
  const zoneC = ref(null)

  const prevent = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

</script>

<style lang="scss" scoped>

</style>