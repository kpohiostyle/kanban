<template lang="">
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
                 placeholder="Add New Board......"
                 v-model="state.newList.title"
          />
        </div>
        <button class="btn btn-success" type="submit">
          Add Board
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="">

</style>
