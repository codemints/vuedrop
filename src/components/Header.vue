<template>
  <header>
    <transition name="show">
      <div
      v-if="showToast === true"
      class="toast">
        <h2>{{ error }}</h2>
      </div>
    </transition>
    <div class="[ container px-20 py-8 mx-auto ]">
      <h1 class="[ text-center leading-none ]">Vue<span class="[ alt__title ]">Drop</span></h1>
      <p class="[ text-center uppercase text-2xl mt-8 ][ gray ]"><span class="[ font-bold underline ][ blue ]">HTML drag & drop API</span> implemented in <span class="[ font-bold underline ][ green ]">Vue3</span></p>
    </div>
    <div class="[ form__container ] [ px-20 py-4 ]">
      <div class="[ mx-auto ] [ container__md ]">
        <form>
          <div class="[ input__wrapper ]">
            <div class="[ input__group ]">
              <label for="">Feature request title</label>
              <input
                v-model="formData.title"
                id="title"
                type="text"
                placeholder="enter a feature title...">
            </div>
            <div class="[ input__group ]">
              <label for="">Feature request due date</label>
              <input
                v-model="formData.date"
                id="date"
                type="datetime-local">
            </div>
          </div>
          <button @click.prevent="handleSubmit">Add Feature Request</button>
        </form>
      </div>
    </div>
  </header>
  <div class="flex flex-col items-center text-2xl">
    <h2 >form data object</h2>
    <pre >{{ formData }}</pre>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { handleError, createUUID, formatDate } from '@/src/composables/helpers.js'
  import { data, setData } from '@/src/composables/data-state'
  const formData = ref({})
  const error = ref('')
  const showToast = ref(false)

  const handleSubmit = () => {
    const err = handleError(formData.value)
    if ( err ) {
      error.value = err
      showToast.value = true
      return setTimeout(() => showToast.value = false, 3000)
    }
    formData.value.id = createUUID()
    formData.value.time = formatDate(formData.value.date)
    formData.value.list = 'A'
    setData(formData.value)
  }
</script>

<style lang="scss" scoped>
  .show-enter-active {
    animation: wobble 0.5s ease-in-out;
  }
  .show-leave-to {
    transform: translateY(-6rem);
    opacity: 0;
  }
  .show-leave-active {
    transition: all 0.3s ease-in-out;
  }

  @keyframes wobble {
    0% { transform: translateY(-6rem); opacity: 0 }
    50% { transform: translateY(0); }
    60% { transform: translateX(1rem); }
    65% { transform: translateX(-1rem); }
    70% { transform: translateX(0.8rem); }
    75% { transform: translateX(-0.8rem); }
    80% { transform: translateX(0.6rem); }
    85% { transform: translateX(-0.6rem); }
    90% { transform: translateX(0.4rem); }
    95% { transform: translateX(-0.4rem); }
    100% { transform: translateX(0); }
  }
</style>