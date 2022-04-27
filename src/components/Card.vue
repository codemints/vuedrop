<template>
  <div
    @dragstart="onDrag($event, dataID, thisElement.id)"
    draggable="true"
    ref="thisElement"
    :id="`card__${dataID}`"
    class="[ card__wrapper ][ cursor-pointer ]"
    :class="[className || initialClass]">
    <div class="[ card__drag ][ cursor-move ]">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
    </div>
    <div class="card__content">
      <div class="[ card__label ][ cursor-pointer ]"></div>
      <div class="[ card__body ][ cursor-pointer ]">
        <h3 class="[ card__title ][ cursor-pointer ]">{{ title }}</h3>
        
        <div
          class="[ timeline ]">
          <div class="[ icon__wrapper ]">
            <transition name="show">
              <ToolTip
                v-if="isHovered.icon === 'due'" text="Due date"
              />
            </transition>
            <svg
              @mouseenter="setHover('due')"
              @mouseleave="isHovered = {}"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h5 class="request__requested">
            {{ requestDate }}
          </h5>
        </div>
        
        <div
          v-if="item?.startDate"
          class="[ timeline ]">
          <div class="[ icon__wrapper ]">
            <transition name="show">
              <ToolTip
                v-if="isHovered.icon === 'started'" text="Date started"
              />
            </transition>
            <svg
              @mouseenter="setHover('started')"
              @mouseleave="isHovered = {}"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
            </svg>
          </div>
          <h5 class="[ request__inprogress ]">
            {{ item.startDate }}
          </h5>
        </div>
        
        <div
          v-if="item?.completeDate"
          class="[ timeline ]">
          <div class="[ icon__wrapper ]">
            <transition name="show">
              <ToolTip
                v-if="isHovered.icon === 'completed'" text="Date completed"
              />
            </transition>
            <svg
              @mouseenter="setHover('completed')"
              @mouseleave="isHovered = {}"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6" fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <h5 class="request__completed">
            {{ item.completeDate }}
          </h5>
        </div>
        
      </div>
      
      <div
        @mouseenter="setHover('delete')"
        @mouseleave="isHovered = {}"
        @click="handleDelete($event, dataID, dataObj)"
        class="[ card__delete ]">

        <transition name="show">
          <ToolTip
            v-if="isHovered.icon === 'delete'" text="Delete this request"
          />
        </transition>
        
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import ToolTip from '@comps/ToolTip.vue'
  import { onDrag, handleDelete } from '@/src/composables/helpers'

  const props = defineProps([
    'item',
    'card',
    'requestDate',
    'title',
    'dataID',
    'dropZone',
    'dataObj',
    'initialClass',
  ])
  
  const isHovered = ref({})
  const thisElement = ref(null)
  const className = ref(null)

  const setHover = (icon) => {
    isHovered.value.icon = icon
  }

  watch(() => props.dropZone, () => className.value = props.dropZone.dataset.owner)

</script>

<style lang="scss" scoped>
  @use '@scss/main.scss' as *;

  $radius: 0.5rem;
  .card__wrapper {
    display: flex;

    &:not(:first-of-type) {
      margin-top: 0.75rem;
    }

    &:hover .card__drag {
      max-width: 2.4rem;
    }
    
    .card__drag {
      display: flex;
      align-items: center;

      max-width: 0;
      overflow: hidden;

      transition: $bounce;

      svg:first-of-type {
        margin-right: -0.75rem;
      }
    }

    .card__content {
      display: flex;
      width: 100%;

      background-color: white;
      border-radius: $radius;

      box-shadow: 0.2rem 0.2rem 0.1rem rgba($vueBlue, 0.2);
    }

    &.requested .card__label {
      background-color: $vueGreen;
    }

    &.progress .card__label {
      background-color: $yellow;
    }

    &.completed {
      .card__label {
        background-color: $warning;
      }

      h3, h5 {
        color: darken($gray200, 15%);
      }

      svg {
        stroke: darken($gray200, 15%);
      }
    }

    .card__label {
      width: 1.25rem;
      border-end-start-radius: $radius;
      border-start-start-radius: $radius;
    }

    .timeline {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .icon__wrapper {
      position: relative;
    }
    
    .card__body {
      padding-inline: 1rem;
      padding-block: 0.5rem;
    }

    .card__delete {
      position: relative;
      display: flex;
      justify-content: center;
      
      margin-right: 1rem;
      margin-block: auto;
      margin-left: auto;

      svg {
        stroke: $warning;
      }
    }

    h3 {
      color: $vueBlue;
      font-size: 1.6rem;
      text-transform: uppercase;
    }

    h5 {
      color: $gray600;
      font-size: 1.25rem;
      font-weight: 400;
    }

    svg {
      stroke: $gray600;
    }
  }

  .show-enter-from,
  .show-leave-to {
    top: -5rem;
  }

  .show-enter-active {
    transition: $bounce;
  }

  .show-leave-active {
    transition: all 0.3s ease;
  }
</style>