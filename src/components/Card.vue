<template>
  <div
    @dragstart="onDrag($event, data)"
    draggable="true"
    class="[ card__wrapper ][ cursor-pointer ]">
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
        <h3 class="[ card__title ][ cursor-pointer ]">{{ data.title }}</h3>
        <h5>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ data.time }}
        </h5>
      </div>
      <div
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        class="[ card__delete ]">

        <transition name="show">
          <ToolTip
            v-if="hovered" text="Delete this request"
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
  import { ref } from 'vue'
  import ToolTip from '@comps/ToolTip.vue'
  import { data } from '@/src/composables/data-state'
  import { onDrag } from '@/src/composables/helpers'

  const hovered = ref(false)

</script>

<style lang="scss" scoped>
  @use '@scss/main.scss' as *;

  $radius: 0.5rem;
  .card__wrapper {
    display: flex;

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

    .card__label {
      width: 1.25rem;
      background-color: $vueGreen;
      border-end-start-radius: $radius;
      border-start-start-radius: $radius;
    }
    
    .card__body {
      padding-inline: 1rem;
      padding-block: 0.5rem;
    }

    .card__delete {
      position: relative;
      display: flex;
      justify-content: center;
      
      padding-right: 1rem;
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
      display: flex;
      align-items: center;
      gap: 0.5rem;

      color: $gray600;
      font-size: 1.25rem;
      font-weight: 400;
    }
  }

  .show-enter-from,
  .show-leave-to {
    transform: translateY(-2rem);
  }

  .show-enter-active {
    transition: $bounce;
  }

  .show-leave-active {
    transition: all 0.3s ease;
  }
</style>