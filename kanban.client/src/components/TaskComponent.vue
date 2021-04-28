<template lang="">
  <div class="col-sm-12 shadow my-1">
    <div class="bg-grey d-flex flex-direction justify-content-between inline">
      <h5 class="text-white py-3">
        {{ list.title }}
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
      comments: computed(() => AppState.comments)

    })
    onMounted(async() => {
      try {
        await tasksService.getComments(route.params.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      route,
      state,
      async deleteTask() {
        try {
          await tasksService.deleteTask(props.task.id)
          Notification.toast('Successfully Deleted', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async createComment() {
        try {
          state.newComment.taskId = route.params.id
          await commentsService.createTask(state.newComment)
          state.newComment = {}
          Notification.toast('Added Comment', 'success')
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

</style>
