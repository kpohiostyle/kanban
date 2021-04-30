<template lang="">
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-6 shadow py-3" v-if="state.activeBoard">
        <div class="d-flex flex-direction inline justify-content-between">
          <h2>{{ state.activeBoard.title }}</h2>
          <button type="button" class="btn btn-small btn-outline-danger" @click="deleteBoard">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 ml-2">
        <form @submit.prevent="createList" class="form-inline ">
          <div class="form-group">
            <label for="title"></label>
            <input type="text"
                   class="form-control"
                   name="title"
                   id="title"
                   aria-describedby="helpId"
                   placeholder="Add New List......"
                   v-model="state.newList.title"
            />
          </div>
          <button class="btn bg-blueish mt-2 " type="submit">
            <i class="fas fa-plus"> List</i>
          </button>
        </form>
      </div>
    </div>
    <div class="row" v-if="state.lists">
      <ListComponent v-for="list in state.lists" :key="list.id" :list="list" />
    </div>
  </div>
</template>
<script>
import Notification from '../utils/Notification'
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { reactive, computed, onMounted } from 'vue'
import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'
export default {
  name: 'BoardsDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      newList: {},
      activeBoard: computed(() => AppState.activeBoard),
      lists: computed(() => AppState.lists)
    })
    onMounted(async() => {
      try {
        await boardsService.getActiveBoard(route.params.id)
        await listsService.getLists(route.params.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      route,
      state,
      async deleteBoard() {
        try {
          await boardsService.deleteBoard(state.activeBoard.id)
          AppState.activeBoard = {}
          router.push({ name: 'BoardsPage' })
          Notification.toast('Successfully Deleted', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async createList() {
        try {
          state.newList.boardId = route.params.id
          await listsService.createList(state.newList)
          state.newList = {}
          Notification.toast('Added List', 'success')
        } catch (error) {
          Notification.toast('Error:' + error, 'error')
        }
      }

    }
  },
  components: {}
}
</script>
<style scoped>
button{
  border: none;
}
</style>
