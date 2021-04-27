<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6">
        <form @submit.prevent="createBoard">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text"
                   class="form-control"
                   name="title"
                   id="title"
                   aria-describedby="helpId"
                   placeholder="Add New Board......"
                   v-model="state.newBoard.title"
            />
          </div>
          <button class="btn btn-success" type="submit">
            Add Board
          </button>
        </form>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-4 mt-5">
        <div v-for="board in state.boards" :key="board.id" :board="board">
          <router-link :to="{name:'BoardsDetail', params:{id: board.id}}">
            <p>
              {{ board.title }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { boardsService } from '../services/BoardsService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
export default {
  name: 'BoardsPage',
  setup() {
    const state = reactive({
      newBoard: {},
      boards: computed(() => AppState.boards),
      activeBoard: computed(() => AppState.activeBoard),

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
      async createBoard() {
        try {
          await boardsService.createBoard(state.newBoard)
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
