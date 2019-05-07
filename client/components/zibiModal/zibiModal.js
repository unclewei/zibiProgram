
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    backdrop: {
      type: Boolean,
      value: false
    },
    animated: {
      type: Boolean,
      value: true
    },
  },

  ready() {
    this.baseModal = this.selectComponent('#baseModal');
    if (this.data.showModalOnReady) {
      this.baseModal.showModal();
      this.setData({
        showModalOnReady: false
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModalOnReady: false,
    zibiTime:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showModal: function() {
      if (this.baseModal) {
        this.baseModal.showModal();
      } else {
        this.setData({
          showModalOnReady: true
        })
      }
    },

    hideModal: function() {
      this.baseModal.hideModal();
    },

  }
})