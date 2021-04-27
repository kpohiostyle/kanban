<template>
  <div class="container-fluid">
    <!-- <div class="row">
      <router-link :to="{name:'BoardsDetail', params:{id: board.id}}">
        <p>{{ baord.title }}</p>
      </router-link>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'BoardComponent',
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="">

</style>
