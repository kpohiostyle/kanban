<template>
  <div class="container-fluid">
    <form @submit.prevent="addBoard">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text"
               class="form-control"
               name="title"
               id="title"
               aria-describedby="helpId"
               placeholder="Title..."
               v-model="state.newBoard.title"
        >
      </div>
      <button class="btn btn-success" type="submit">
        Add Photo
      </button>
    </form>
  </div>

  <div class="row">
    <BoardComponent v-for="board in state.boards" :key="board.id" :board="board" />
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
// import { boardsService } from '../services/BoardsService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
export default {
  name: 'BoardsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      newBoard: {},
      board: computed(() => AppState.activeBoard),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await boardsService.getAll()
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      route,
      async addBoard() {
        try {
          await boardsService.addBoard(route.params.id, state.newBoard)
          state.newBoard = {}
          Notification.toast('Added Board', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async deleteBoard() {
        try {
          await boardsService.deleteBoard(state.board.id)
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>
<style lang="">

</style>
