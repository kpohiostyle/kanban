<template lang="">
  <div class="container-fluid">
    <div class="row">
      <div class="col shadow" v-if="state.activeBoard">
        <div class="d-flex flex-direction inline justify-content-between">
          <h5>{{ state.activeBoard.title }}</h5>
          <button type="button" class="btn btn-danger" @click="deleteBoard">
            Delete
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <form @submit.prevent="createList">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text"
                   class="form-control"
                   name="title"
                   id="title"
                   aria-describedby="helpId"
                   placeholder="Add New List......"
                   v-model="state.newList.title"
            />
          </div>
          <button class="btn btn-success" type="submit">
            Add List
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
<style lang="">

</style>
