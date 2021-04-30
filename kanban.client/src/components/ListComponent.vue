<template lang="">
  <div class="card-custom col-md-3 shadow">
    <div class="border-custom d-flex flex-direction justify-content-between inline">
      <h5 class="py-3 pl-2">
        {{ list.title }}
      </h5>
      <button type="button" class="btn btn-small btn-outline-danger" @click="deleteList">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
    <div class="row">
      <div class="col-md-12">
        <form @submit.prevent="createTask" class="d-flex flex-direction justify-content-between form-inline">
          <div class="form-group">
            <label for="title"></label>
            <input type="text"
                   class="form-control"
                   name="title"
                   id="title"
                   aria-describedby="helpId"
                   placeholder="Add New Task......"
                   v-model="state.newTask.title"
                   required
            />
          </div>
          <button class="btn bg-blueish mt-2 " type="submit">
            <i class="fas fa-plus"> Task</i>
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
      </div>
    </div>

    <div class="row justify-content-center">
      <TaskComponent v-for="task in state.tasks" :key="task.id" :task="task" />
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
      tasks: computed(() => AppState.tasks[props.list.id])

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
button{
  border: none;
}
.border-custom{
  border-bottom: 2px solid #390164;
}
.card-custom{
  background-color: #ebf3ee
}
</style>
