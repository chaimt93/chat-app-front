<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="file-card row justify-center items-center">
      <q-input class="col-7" @update:model-value="val =>file = val[0]" type="file" accept=".jpg, .png"/>
      <q-btn  class="col-6" color="primary" @click="onOKClick"> choose </q-btn>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: ['status'],
  emits: ['ok', 'hide'], // REQUIRED
  data(){
    return{
      file:null
    }
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },

    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {

      this.$emit('hide')
    },

    onOKClick () {
      this.$emit('ok',this.file)
      this.hide()
    },

    onCancelClick () {
      this.hide()
    }
  }
}
</script>

<style scoped lang="scss">
.file-card {
  width: 500px;
  height :300px;
}

</style>
