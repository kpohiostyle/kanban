<template lang="">
  <div class=" bg-white col-md-10 p-0 border border-dark my-1">
    <div class="task d-flex flex-direction justify-content-between inline">
      <h5 class=" py-3">
        {{ task.title }}
      </h5>
      <button type="button" class="btn btn-small btn-outline-danger" @click="deleteTask">
        <i class="fas fa-trash-alt"></i>
      </button>
      <div class="dropdown">
        <button class="btn dropdown-toggle"
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
    <div class="row">
      <div class="col-md-12">
        <form @submit.prevent="createComment" class="form-inline">
          <div class="form-group">
            <label for="body"></label>
            <input type="text"
                   class="form-control"
                   name="body"
                   id="body"
                   aria-describedby="helpId"
                   placeholder="Add New Comment......"
                   v-model="state.newComment.body"
                   required
            />
          </div>
          <button class="btn bg-blueish mt-2 " type="submit">
            <i class="fas fa-plus"> Comment</i>
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
        <CommentComponent v-for="comment in state.comments" :key="comment.id" :comment="comment" />
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
      comments: computed(() => AppState.comments[props.task.id]),
      lists: computed(() => AppState.lists)

    })
    onMounted(async() => {
      try {
        await commentsService.getComments(props.task.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
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
      async createTask() {
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
      },
      async createComment() {
        try {
          state.newComment.taskId = props.task.id
          await commentsService.createComment(state.newComment)
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
.bg-grey{
    background-color: rgb(167, 166, 166);
}
.task{
  background-color: #ebf3ee;
}
button{
  border: none
}
a:hover{
cursor: pointer;
}
</style>
