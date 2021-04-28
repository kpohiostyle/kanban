<template lang="">
  <div class="col-sm-4 shadow">
    <div class="bg-grey d-flex flex-direction justify-content-between inline">
      <h5 class="text-white py-3">
        {{ list.title }}
      </h5>
      <button type="button" class="btn btn-danger" @click="deleteList">
        Delete
      </button>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <form @submit.prevent="createTask">
          <div class="form-group">
            <label for="title">Task Title</label>
            <input type="text"
                   class="form-control"
                   name="title"
                   id="title"
                   aria-describedby="helpId"
                   placeholder="Add New Task......"
                   v-model="state.newTask.title"
            />
          </div>
          <button class="btn btn-success" type="submit">
            Add Task
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
      </div>
    </div>

    <div class="row">
    <!-- TaskComponent -->
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import { reactive, computed, onMounted } from 'vue'
import { tasksService } from '../services/TasksService'
import { listsService } from '../services/ListsService'
export default {
  name: 'ListComponent',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      newTask: {},
      tasks: computed(() => AppState.tasks[state.listId])

    })
    onMounted(async() => {
      try {
        await tasksService.getTasks(props.list.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      route,
      state,
      async deleteList() {
        try {
          await listsService.deleteList(props.list.id)
          Notification.toast('Successfully Deleted', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async createTask() {
        try {
          state.newTask.listId = props.list.id
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
<style scoped>
.bg-grey{
  background-color: rgb(70, 70, 70);
}
</style>
