<template lang="">
  <div class="col-sm-12 shadow my-1 bg-grey">
    <div class="d-flex flex-direction justify-content-between inline">
      <h5 class="task py-3">
        {{ task.title }}
      </h5>
      <button type="button" class="btn btn-danger" @click="deleteTask">
        Delete
      </button>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <form @submit.prevent="createComment">
          <div class="form-group">
            <label for="title">Comment Title</label>
            <input type="text"
                   class="form-control"
                   name="title"
                   id="title"
                   aria-describedby="helpId"
                   placeholder="Add New Comment......"
                   v-model="state.newComment.title"
            />
          </div>
          <button class="btn btn-success" type="submit">
            Add Comment
          </button>
        </form>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
          >
            <i class="fas fa-ellipsis-v"></i>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <!-- <a class="dropdown-item" href="#">Action</a> -->
            <a @click="editList(list.id)" class="dropdown-item text-dark" v-for="list in state.lists" :key="list.id">
              {{ list.title }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
      </div>
    </div>

    <div class="row">
      <div class="col">
        <!-- CommentComponent -->
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import { reactive, computed, onMounted } from 'vue'
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'
export default {
  name: 'TaskComponent',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      newComment: {},
      comments: computed(() => AppState.comments),
      lists: computed(() => AppState.lists)

    })
    onMounted(async() => {
      // try {
      //   await tasksService.getComments(route.params.id)
      // } catch (error) {
      //   Notification.toast('Error: ' + error, 'error')
      // }
    })
    return {
      route,
      state,
      async deleteTask() {
        try {
          await tasksService.deleteTask(props.task.listId, props.task.id)
          Notification.toast('Successfully Deleted', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async createComment() {
        try {
          state.newComment.taskId = props.task.id
          await commentsService.createTask(state.newComment)
          state.newComment = {}
          Notification.toast('Added Comment', 'success')
        } catch (error) {
          Notification.toast('Error:' + error, 'error')
        }
      },
      async editList(id) {
        try {
          await tasksService.editTask(id, props.task)
          Notification.toast('Task Moved', 'success')
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
    background-color: rgb(167, 166, 166);
}
.task{

  color: rgb(57, 175, 169)
}
</style>
