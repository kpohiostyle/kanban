<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6">
        <form @submit.prevent="createBoard" class="form-inline">
          <div class="form-group">
            <label for="title"></label>
            <input type="text"
                   class="form-control"
                   name="title"
                   id="title"
                   aria-describedby="helpId"
                   placeholder="Add New Board......"
                   v-model="state.newBoard.title"
                   required
            />
          </div>
          <button class="btn bg-blueish mt-2" type="submit">
            <i class="fas fa-plus fa-2x"></i>
          </button>
        </form>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 mt-5">
        <div v-for="board in state.boards" :key="board.id" :board="board">
          <router-link :to="{name:'BoardsDetail', params:{id: board.id}}">
            <h4>
              <span class="board">
                {{ board.title }}
              </span>
            </h4>
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
<style>
.board{
  border-bottom: 1px solid #390164;
  }
a{
  color: #8bd1d3;

}
a:hover {
    color: #1f7cac;
    text-decoration: none;
}
</style>
