<template lang="">
  <div class=".col-sm-4">
    <h5>Title</h5>
    <div class="row">
      <div class="col-sm-12">
        <form @submit.prevent="createTask">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text"
                   class="form-control"
                   name="title"
                   id="title"
                   aria-describedby="helpId"
                   placeholder="Add New Board......"
                   v-model="state.newTask.title"
            />
          </div>
          <button class="btn btn-success" type="submit">
            Add Board
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <!-- TaskComponent -->
      </div>
    </div>
  </div>
</template>
<script>
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import { reactive, computed, onMounted } from 'vue'
import { tasksService } from '../services/TasksService'
import { listsService } from '../services/ListsService'
export default {
  name: 'ListComponent',
  setup() {
    const state = reactive({
      newTask: {},
      lists: computed(() => AppState.lists),
      tasks: computed(() => AppState.tasks)

    })
    onMounted(async() => {
      try {
        await listsService.getLists()
      } catch (error) {
        Notification.toast('Error' + error, 'error')
      }
    })
    return {
      state,
      async deleteList() {
        try {
          await listsService.deleteList(state.lists.id)
          Notification.toast('Successfully Deleted', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async createTask() {
        try {
          await tasksService.createTask(state.newTask)
          state.newTask = {}
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
