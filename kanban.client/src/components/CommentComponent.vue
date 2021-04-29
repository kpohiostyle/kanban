<template lang="">
  <div class="col-sm-12 shadow my-1 bg-grey">
    <div class="d-flex flex-direction justify-content-between inline">
      <ul class="comment py-3">
        {{ comment.body }}
      </ul>
      <button type="button" class="btn btn-danger" @click="deleteComment">
        Delete
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
      tasks: computed(() => AppState.tasks)

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
.bg-grey{
    background-color: rgb(255, 0, 0);
}
.comment{

  color: rgb(57, 175, 169)
}
</style>
