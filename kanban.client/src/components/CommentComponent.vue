<template lang="">
  <div class="col-md-12 shadow my-1 bg-light">
    <div class="d-flex flex-direction justify-content-between inline">
      <ul class="comment py-1">
        <!-- {{ comment.body }} -->
        <p>{{ comment.body }} <small>{{ state.user.name }}</small></p>
      </ul>
      <button type="button" class="btn btn-small btn-outline-danger" @click="deleteComment">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import { reactive, computed, onMounted } from 'vue'
import { commentsService } from '../services/CommentsService'
export default {
  name: 'CommentComponent',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      newComment: {},
      comments: computed(() => AppState.comments),
      tasks: computed(() => AppState.tasks),
      user: computed(() => AppState.user)

    })
    onMounted(async() => {
    })
    return {
      route,
      state,
      async deleteComment() {
        try {
          await commentsService.deleteComment(props.comment.taskId, props.comment.id)
          Notification.toast('Successfully Deleted', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
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
